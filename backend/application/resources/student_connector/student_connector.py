from flask import Blueprint
from orm_interface.base import Base, Session, engine
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
    pass