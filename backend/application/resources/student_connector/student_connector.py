from flask import Blueprint, jsonify, request, abort
from orm_interface.base import Base, Session, engine
from orm_interface.entities.student_connector_entity.student_connector_user import Student_Connector_User, \
    Student_Connector_Skills
from orm_interface.entities.studyprogram import StudyProgram

student_connector = Blueprint("student_connector", __name__)

session = Session()

@student_connector.route("/home")
@student_connector.route("/")
def home():
    return "Student Connector Home"

@student_connector.route("/study-programs", methods=["GET"])
def get_all_study_programs():
    all_studyprograms = session.query(StudyProgram).all()

@student_connector.route("/profile/<id>", methods=["GET"])
def get_profile(id):
    profile = session.query(Student_Connector_User).filter(Student_Connector_User.id == id).first()
    return {"id": profile.id,
            "email": profile.email,
            "description": profile.description,
            "skills": profile.skills,
            "degree": profile.sc_degree.name}

@student_connector.route("/profile/<id>", methods=["POST"])
def set_profile_description(id):
    # this is only a dummy authentication, it is completely useless!
    profile_attributes = request.form
    if id == profile_attributes['check']:
        user_db = session.query(Student_Connector_User).filter(Student_Connector_User.id == id)
        user = user_db.first()
        if 'description' in profile_attributes:
            user_db.update({'description': profile_attributes['description']})
        if 'skills' in profile_attributes:
            skill = session.query(Student_Connector_Skills).filter(Student_Connector_Skills.skill_name == profile_attributes['skills']).first()
            if skill is not None:
                user.skills.append(skill)
            else:
                skills = []
                for skill in profile_attributes.getlist('skills'):
                    skill_db = Student_Connector_Skills(skill)
                    skills.append(skill_db)
                    session.add(skill_db)
                user.skills.extend(skills)
        if 'degree_id' in profile_attributes:
            user_db.update({'degree_id': profile_attributes['degree_id']})
        session.commit()
        return jsonify("Successfully changed!")
    abort(403)