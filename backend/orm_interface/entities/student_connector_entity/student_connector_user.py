from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey
from orm_interface.base import Base
from sqlalchemy.orm import relationship

class Student_Connector_User(Base):
    __tablename__ = 'student_connector_user'
    email = Column(String, ForeignKey('user.email'), primary_key=True)

    def __init__(self, email):
        self.email = email