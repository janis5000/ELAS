from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, Table
from orm_interface.base import Base
from sqlalchemy.orm import relationship

class Student_Connector_Chat_Room(Base):
    __tablename__ = 'student_connector_chat_room'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = relationship(Integer, ForeignKey('student_connector_user'))


class Student_Connector_Messages(Base):
    __tablename__ = 'student_connector_messages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey('student_connector_user'))
    message = Column(String)