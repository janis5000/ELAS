from flask import Blueprint, jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from orm_interface.base import Base, Session, engine
from orm_interface.entities.lecture import Lecture
from orm_interface.entities.student_connector_entity.student_connector_user import Student_Connector_User, \
    Student_Connector_Skills, Student_Connector_Courses_User
from orm_interface.entities.user import User
from orm_interface.entities.studyprogram import StudyProgram

student_connector = Blueprint("student_connector", __name__)

session = Session()

@student_connector.route("/home")
@student_connector.route("/")
def home():
    return "Student Connector Home"

@student_connector.route("/get-token", methods=["GET"])
@jwt_required()
def get_profile_info():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@student_connector.route("/study-programs", methods=["GET"])
def get_all_study_programs():
    all_studyprograms = session.query(StudyProgram).all()
    response = []
    for studyprogram in all_studyprograms:
        lectures = studyprogram.lectures
        seminar, vorlesung, vorlesung_uebung, uebung = 0,0,0,0
        for lecture in lectures:
            if len(lecture.sws.strip()) > 0:
                if lecture.subject_type == "Vorlesung":
                    vorlesung += int(lecture.sws)
                elif lecture.subject_type == "Seminar":
                    seminar += int(lecture.sws)
                elif lecture.subject_type == "Vorlesung/Übung":
                    vorlesung_uebung += int(lecture.sws)
                elif lecture.subject_type == "Übung":
                    uebung += int(lecture.sws)

        response.append({
            "id": studyprogram.id,
            "name": studyprogram.name,
            "url": studyprogram.url,
            "stats": {
                "Vorlesung": vorlesung,
                "Vorlesung/Übung": vorlesung_uebung,
                "Übung": uebung,
                "Seminar": seminar
            }
        })
    return jsonify(response)
@student_connector.route("/http-call", methods=["GET"])
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

@student_connector.route("/other-users/<course_id>", methods=["GET"])
def get_other_users_in_course(course_id):
    users = session.query(User) \
            .join(Student_Connector_User)\
            .join(Student_Connector_Courses_User)\
            .filter(Student_Connector_Courses_User.c.lecture_id == course_id).distinct().all()
    result = []
    amount = min(len(users), 4)
    for i in range(amount):
        result.append({"id": users[i].id,
                       "firstname": users[i].firstname,
                       "lastname": users[i].lastname})
    return jsonify(result)


@student_connector.route("/profile", methods=["GET"])
@jwt_required()
def get_personal_profile_information():
    current_user = get_jwt_identity()
    profile = session.query(Student_Connector_User).filter(Student_Connector_User.email == current_user["email"]).first()
    courses = []
    skills = []
    if profile is None:
        return jsonify({"error" : "Profile not found!"})
    if profile.courses is not None:
        for course in profile.courses:
            courses.append({"id": course.id,
                           "name": course.name})
    if profile.skills:
        for skill in profile.skills:
            skills.append(skill.skill_name)
    if profile.sc_degree is not None:
        return {"id": profile.id,
                "email": profile.email,
                "description": profile.description,
                "skills": skills,
                "degree": profile.sc_degree.name,
                "degree_id": profile.sc_degree.id,
                "courses": courses}
    else:
        return {"id": profile.id,
                "email": profile.email,
                "description": profile.description,
                "skills": skills,
                "degree": "",
                "degree_id": 0,
                "courses": courses}
@student_connector.route("/profile/<id>", methods=["GET"])
def get_profile(id):
    profile = session.query(Student_Connector_User).filter(Student_Connector_User.id == id).first()
    courses = []
    skills = []
    if profile is None:
        return jsonify({"error" : "Profile not found!"})
    if profile.courses is not None:
        for course in profile.courses:
            courses.append({"id": course.id,
                           "name": course.name})
    if profile.skills:
        for skill in profile.skills:
            skills.append(skill.skill_name)
    if profile.sc_degree is not None:
        return {"id": profile.id,
                "email": profile.email,
                "description": profile.description,
                "skills": skills,
                "degree": profile.sc_degree.name,
                "degree_id": profile.sc_degree.id,
                "courses": courses}
    else:
        return {"id": profile.id,
                "email": profile.email,
                "description": profile.description,
                "skills": skills,
                "degree": "",
                "degree_id": 0,
                "courses": courses}

@student_connector.route("/profile/<id>/courses", methods=["GET"])
def get_courses_from_profile(id):
    user = session.query(Student_Connector_User).filter(Student_Connector_User.id == id).first()
    courses = []
    if user is not None:
        for course in user.courses:
            courses.append({"id" : course.id,
                            "name": course.name})
        return jsonify(courses)
    return abort(400, "User does not exist")

@student_connector.route("/add-course", methods=["POST"])
@jwt_required()
def add_course_to_profile():
    # this is only a dummy authentication, it is completely useless!
    current_user = get_jwt_identity()
    user = session.query(Student_Connector_User).filter(Student_Connector_User.email == current_user.email).first()
    if 'courses' in request.form:
        courses = []
        for course in request.form.getlist('courses'):
            course_from_db = session.query(Lecture).filter(Lecture.id == course).first()
            if course_from_db is not None:
                courses.append(course_from_db)
        user.courses.extend(courses)
        session.commit()
    return jsonify("Successful added course")

@student_connector.route("/add-course/<id>", methods=["POST"])
@jwt_required()
def add_single_course_to_profile(id):
    courses = []
    current_user = get_jwt_identity()
    user = session.query(Student_Connector_User).filter(Student_Connector_User.email == current_user['email']).first()
    course = session.query(Lecture).filter(Lecture.id == id).first()
    if course is not None:
        courses.append(course)
        user.courses.extend(courses)
        session.commit()
    return jsonify("Successful added course")

@student_connector.route("/remove-course/<id>", methods=["POST"])
@jwt_required()
def remove_single_course_from_profile(id):
    current_user = get_jwt_identity()
    user = session.query(Student_Connector_User).filter(Student_Connector_User.email == current_user['email']).first()
    course = session.query(Lecture).filter(Lecture.id == id).first()
    if course is not None and course in user.courses:
        user.courses.remove(course)
        session.commit()
        return jsonify("Successful removed course")
    else:
        return abort(400, "Course not found")

@student_connector.route("/profile/<id>", methods=["POST"])
@jwt_required()
def set_profile_attributes(id):
    profile_attributes = request.json
    current_user = get_jwt_identity()
    if str(current_user['id']) != id:
        return abort(401)
    user_db = session.query(Student_Connector_User).filter(Student_Connector_User.email == current_user['email'])
    user = user_db.first()
    if 'description' in profile_attributes:
        user_db.update({'description': profile_attributes['description']})
    if 'skills' in profile_attributes:
        #skill_from_db = session.query(Student_Connector_Skills).filter(profile_attributes['skills'].any(Student_Connector_Skills.skill_name)).first()
        skill_from_db = session.query(Student_Connector_Skills).filter(Student_Connector_Skills.skill_name.in_(profile_attributes['skills'])).all()
        if skill_from_db != []:
            for skill in skill_from_db:
                user.skills.append(skill)
        else:
            skills = []
            for skill in profile_attributes['skills']:
                skill_db = Student_Connector_Skills(skill)
                skills.append(skill_db)
                session.add(skill_db)
            user.skills.extend(skills)
    if 'degree_id' in profile_attributes:
        user_db.update({'degree_id': profile_attributes['degree_id']})
    session.commit()
    return jsonify("Successfully changed!")

@student_connector.route("/lectures", methods=["GET"])
def get_lectures():
    result = []
    studyprogram_id = request.args.get('studyprogram-id')
    lectures = session.query(Lecture).filter(Lecture.root_id.any(id = studyprogram_id)).all()
    #lectures = session.query(Lecture).filter_by(Lecture.root_id.any(studyprogram_id)).all()
    for lecture in lectures:
        result.append({"id": lecture.id,
                       "longtext": lecture.longtext,
                       "description": lecture.description,
                       "sws": lecture.sws,
                       "name": lecture.name})
    return jsonify(result)

@student_connector.route("/lecture/<id>", methods=["GET"])
def get_lecture_by_id(id):
    result = []
    lecture = session.query(Lecture).filter(Lecture.id == id).first()
    result.append({"id": lecture.id,
                       "longtext": lecture.longtext,
                       "description": lecture.description,
                       "sws": lecture.sws,
                       "name": lecture.name})
    return jsonify(result)