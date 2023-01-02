from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey
from orm_interface.base import Base
from sqlalchemy.orm import relationship


class Student_Connector_User(Base):
    __tablename__ = 'student_connector_user'
    id = Column(Integer, unique=True, nullable=False, autoincrement=True)
    email = Column(String, ForeignKey('user.email'), primary_key=True)
    description = Column(String)
    skills = Column(String)
    languages = Column(String)
    degree_id = Column(String, ForeignKey('study_program.id'))
    sc_degree = relationship('StudyProgram', back_populates="sc_user")

    def __init__(self, id, email, description, skills, languages, degree_id):
        self.id = id
        self.email = email
        self.description = description
        self.skills = skills
        self.languages = languages
        self.degree_id = degree_id