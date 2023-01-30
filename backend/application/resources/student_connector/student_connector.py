from flask import Blueprint, jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func

from application.resources.student_connector.utils import prepare_discussion, prepare_profile, prepare_lecture_member, \
    prepare_profile_from_sc_user
from orm_interface.base import Base, Session, engine
from orm_interface.entities.lecture import Lecture
from orm_interface.entities.student_connector_entity.student_connector_user import Student_Connector_User, \
    Student_Connector_Skills, Student_Connector_Courses_User, Student_Connector_Chat_Room, Student_Connector_Messages
from orm_interface.entities.student_connector_entity.student_connector_discussion import Student_Connector_Discussion, \
    Student_Connector_Comments
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
        seminar, vorlesung, vorlesung_uebung, uebung = 0, 0, 0, 0
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
    data = {'data': 'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)


@student_connector.route("/other-users/<course_id>", methods=["GET"])
def get_other_users_in_course(course_id):
    users = session.query(User) \
        .join(Student_Connector_User) \
        .join(Student_Connector_Courses_User) \
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
    profile = session.query(User).join(Student_Connector_User).filter(
        Student_Connector_User.email == current_user["email"]).first()
    return prepare_profile(profile)


@student_connector.route("/profile/<id>", methods=["GET"])
def get_profile(id):
    # profile = session.query(Student_Connector_User).filter(Student_Connector_User.id == id).first()
    profile = session.query(User) \
        .join(Student_Connector_User) \
        .filter(Student_Connector_User.id == id).first()
    return prepare_profile(profile)


@student_connector.route("/profile/<id>/courses", methods=["GET"])
def get_courses_from_profile(id):
    user = session.query(Student_Connector_User).filter(Student_Connector_User.id == id).first()
    courses = []
    if user is not None:
        for course in user.courses:
            courses.append({"id": course.id,
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
    skills_to_add = []
    if 'description' in profile_attributes and profile_attributes['description'] is not None and profile_attributes[
        'description'] != "":
        user_db.update({'description': profile_attributes['description']})
    if 'skills_add' in profile_attributes and profile_attributes['skills_add'] != []:
        skills_to_add = list(map(lambda x: x["skill_name"], profile_attributes['skills_add']))
        skill_from_db = session.query(Student_Connector_Skills).filter(
            Student_Connector_Skills.skill_name.in_(skills_to_add)).all()
        new_skills_user = list(filter(lambda x: x not in list(map(lambda y: y.skill_name, user.skills)), skills_to_add))
        new_skills_db = list(filter(lambda x: x not in list(map(lambda y: y.skill_name, skill_from_db)), skills_to_add))
        new_skills_db = list(map(lambda x: x.skill_name.capitalize(), new_skills_db))
        skills = []
        for skill in new_skills_db:
            skill_db = Student_Connector_Skills(skill)
            if skill in new_skills_user:
                skills.append(skill_db)
            session.add(skill_db)
        for skill in new_skills_user:
            if skill not in new_skills_db:
                skill_db = session.query(Student_Connector_Skills).filter(
                    Student_Connector_Skills.skill_name == skill).first()
                skills.append(skill_db)

        user.skills.extend(skills)
    if 'skills_remove' in profile_attributes and profile_attributes['skills_remove'] != []:
        skills_to_remove_names = list(map(lambda x: x["skill_name"], profile_attributes['skills_remove']))
        skills_to_remove = list(filter(lambda x: x not in skills_to_add, skills_to_remove_names))
        for skill in skills_to_remove:
            skill_db = session.query(Student_Connector_Skills).filter(
                Student_Connector_Skills.skill_name == skill).first()
            user.skills.remove(skill_db)
    if 'degree_id' in profile_attributes and profile_attributes['degree_id'] is not None:
        user_db.update({'degree_id': profile_attributes['degree_id']})
    if 'profile_image' in profile_attributes and profile_attributes['profile_image'] is not None:
        user_db.update({'profile_image': profile_attributes['profile_image']})
    session.commit()
    return jsonify("Successfully changed!")


@student_connector.route("/lectures", methods=["GET"])
def get_lectures():
    result = []
    studyprogram_id = request.args.get('studyprogram-id')
    lectures = session.query(Lecture).filter(Lecture.root_id.any(id=studyprogram_id)).all()
    # lectures = session.query(Lecture).filter_by(Lecture.root_id.any(studyprogram_id)).all()
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
    members = []
    lecture = session.query(Lecture).filter(Lecture.id == id).first()
    members = prepare_lecture_member(lecture.sc_user)
    result.append({"id": lecture.id,
                   "longtext": lecture.longtext,
                   "description": lecture.description,
                   "sws": lecture.sws,
                   "name": lecture.name,
                   "members": members})
    return jsonify(result)


@student_connector.route("/skills", methods=["GET"])
def get_all_skills():
    result = []
    skills = session.query(Student_Connector_Skills).all()
    for skill in skills:
        result.append({"id": skill.id,
                       "skill_name": skill.skill_name})
    return jsonify(result)


@student_connector.route("/start-discussion", methods=["POST"])
@jwt_required()
def start_new_discussion():
    discussion_data = request.json
    current_user = get_jwt_identity()
    discussion = Student_Connector_Discussion(id=None, lecture_id=discussion_data['lecture_id'],
                                              text=discussion_data['text'],
                                              author_email=current_user['email'])
    session.add(discussion)
    discussion.update_time(session)
    session.commit()
    return "Successfully started discussion!"


@student_connector.route("/add-comment", methods=["POST"])
@jwt_required()
def add_comment_to_discussion():
    current_user = get_jwt_identity()
    comment_data = request.json
    discussion_db = session.query(Student_Connector_Discussion).filter(
        Student_Connector_Discussion.id == comment_data['discussion_id'])
    discussion = discussion_db.first()
    comment = Student_Connector_Comments(id=None, discussion_id=comment_data['discussion_id'],
                                         author_email=current_user['email'],
                                         text=comment_data['text'])
    discussion.update_time(session)
    discussion.comments.append(comment)
    session.commit()
    '''profile_db = session.query(User)
    discussion = session.query(Student_Connector_Discussion).filter(
        Student_Connector_Discussion.id == comment_data['discussion_id']).first()'''
    return 'Successfully added comment!'


@student_connector.route("/discussions/<lecture_id>", methods=["GET"])
def get_discussion(lecture_id):
    result = []
    discussions = session.query(Student_Connector_Discussion).filter(
        Student_Connector_Discussion.lecture_id == lecture_id).all()
    profile_db = session.query(User)
    for discussion in discussions:
        result.append(prepare_discussion(discussion, profile_db))
    result = sorted(result, key=lambda x: x['time_updated'], reverse=True)
    return jsonify(result)


@student_connector.route("/lectures-with-member-by-id", methods=["GET"])
def get_lecture_member_by_id():
    lecture_ids = request.args.getlist('id')
    lecture_db = session.query(Lecture)
    result = []
    for lecture_id in lecture_ids:
        lecture = lecture_db.filter(Lecture.id == lecture_id).first()
        result.append({"id": lecture_id,
                       "members": prepare_lecture_member(lecture.sc_user),
                       "longtext": lecture.longtext,
                       "description": lecture.description,
                       "sws": lecture.sws,
                       "name": lecture.name, })
    return jsonify(result)


@student_connector.route("/chats", methods=["GET"])
@jwt_required()
def get_chats():
    current_user = get_jwt_identity()
    result_chat = []
    sc_user = session.query(Student_Connector_User).filter(Student_Connector_User.id == current_user["id"]).first()
    for chat in sc_user.chats:
        messages = []
        recipient_user = list(filter(lambda x: x.id != current_user["id"], chat.user))[0]
        recipient_user = prepare_profile_from_sc_user(recipient_user)
        for message in chat.messages:
            messages.append({"user_id": message.user_id,
                             "message": message.message})
        result_chat.append({
            "chat_id": chat.id,
            "messages": messages,
            "recipient_user": recipient_user})
    return jsonify(result_chat)


@student_connector.route("/create-chatroom", methods=["POST"])
@jwt_required()
def create_chatroom():
    current_user = get_jwt_identity()
    data = request.json
    sc_user = session.query(Student_Connector_User).filter(Student_Connector_User.id == current_user["id"]).first()
    recipient_user = session.query(Student_Connector_User).filter(
        Student_Connector_User.id == data["recipient_id"]).first()
    if sc_user.chats == []:
        chat_room = Student_Connector_Chat_Room(None)
        chat_room.user.append(sc_user)
        chat_room.user.append(recipient_user)
        session.add(chat_room)
        session.commit()
        return jsonify("Succesfully created chatroom!")
    for chat in sc_user.chats:
        if recipient_user not in chat.user:
            chat_room = Student_Connector_Chat_Room(None)
            chat_room.user.append(sc_user)
            chat_room.user.append(recipient_user)
            session.add(chat_room)
            session.commit()
            return jsonify("Succesfully created chatroom!")
    return jsonify("Chatroom already exists!")


@student_connector.route("/chatroom", methods=["GET"])
@jwt_required()
def get_chatroom():
    current_user = get_jwt_identity()
    data = request.json
    user = session.query(User).filter(User.id == current_user["id"]).first()
    recipient_user = session.query(User).filter(User.id == data["recipient_id"]).first()
    sc_user = session.query(Student_Connector_User).filter(Student_Connector_User.id == current_user["id"]).first()
    sc_recipient_user = session.query(Student_Connector_User).filter(
        Student_Connector_User.id == data["recipient_id"]).first()
    for chat in sc_user.chats:
        if sc_recipient_user in chat.user and sc_user in chat.user:
            unread_messages_db = session.query(Student_Connector_Messages).filter(Student_Connector_Messages.chat_id == chat.id
                and Student_Connector_Messages.is_read == False)
            unread_messages_db.update({"is_read": True})
            result_chat = []
            messages = []
            users = []
            users.append(prepare_profile(user))
            users.append(prepare_profile(recipient_user))
            for message in chat.messages:
                messages.append({"user_id": message.user_id,
                                 "message": message.message,
                                 "time_created": message.time_created})
            messages = sorted(messages, key=lambda x: x['time_created'])
            result_chat.append({
                "chat_id": chat.id,
                "messages": messages,
                "users": users})
            session.commit()
            return jsonify(result_chat)
    return jsonify("Chatroom does not exist!")


@student_connector.route("/send-message/<chat_id>", methods=["POST"])
@jwt_required()
def send_message(chat_id):
    current_user = get_jwt_identity()
    message_data = request.json
    chat_room = session.query(Student_Connector_Chat_Room).filter(Student_Connector_Chat_Room.id == chat_id).first()
    sc_user = session.query(Student_Connector_User).filter(Student_Connector_User.id == current_user["id"]).first()
    new_message = Student_Connector_Messages(chat_id=chat_room.id, message=message_data['message'], user_id=sc_user.id)
    chat_room.messages.append(new_message)
    session.add(new_message)
    session.commit()
    return jsonify("Succesfully added message!")
