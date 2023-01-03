from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, Table
from orm_interface.base import Base
from sqlalchemy.orm import relationship

Student_Connector_Skills_User = Table(
    "student_connector_skills_user",
    Base.metadata,
    Column('skill_id', Integer, ForeignKey('student_connector_skills.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('student_connector_user.id'), primary_key=True)
)

class Student_Connector_User(Base):
    __tablename__ = 'student_connector_user'
    id = Column(Integer, unique=True, nullable=False, autoincrement=True)
    email = Column(String, ForeignKey('user.email'), primary_key=True)
    description = Column(String)
    degree_id = Column(String, ForeignKey('study_program.id'))
    sc_degree = relationship('StudyProgram', back_populates="sc_user")
    skills = relationship('Student_Connector_Skills',
        secondary=Student_Connector_Skills_User, back_populates="user"
    )

    def __init__(self, id, email, description, languages, degree_id):
        self.id = id
        self.email = email
        self.description = description
        self.languages = languages
        self.degree_id = degree_id

class Student_Connector_Skills(Base):
    __tablename__ = 'student_connector_skills'
    id = Column(Integer, primary_key=True, autoincrement=True)
    skill_name = Column(String, unique=True)
    user = relationship('Student_Connector_User',
        secondary='student_connector_skills_user', back_populates="skills"
    )

    def __init__(self, skill_name):
        self.skill_name = skill_name

"""class Student_Connector_Skills_User(Base):
    __tablename__ = 'student_connector_skills_user'
    skill_id = Column(Integer, ForeignKey('student_connector_skills.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('student_connector_user.id'), primary_key=True)"""
