from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from orm_interface.base import Base
from orm_interface.entities.student_connector_entity.student_connector_user import Student_Connector_User


class User(Base):
    __tablename__ = "user"

    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, primary_key=True)
    password = Column(String)
    student_connector_user = relationship(Student_Connector_User)

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
