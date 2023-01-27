from datetime import datetime

from sqlalchemy import Integer, ForeignKey, Column, String, Table, func, DateTime
from sqlalchemy.orm import relationship

from orm_interface.base import Base

class Student_Connector_Discussion(Base):
    __tablename__ = 'student_connector_discussion'

    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String, nullable=False)
    author_email = Column(String, ForeignKey('student_connector_user.email'))
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    time_updated = Column(DateTime(timezone=True))
    author = relationship('Student_Connector_User', back_populates="discussions")
    comments = relationship('Student_Connector_Comments', back_populates="discussion"
    )
    lecture_id = Column(String, ForeignKey('lecture.id'))
    lecture = relationship('Lecture', back_populates="discussions")
    def __init__(self, id, text, lecture_id, author_email):
        self.id = id
        self.text = text
        self.lecture_id = lecture_id
        self.author_email = author_email

    def update(self, session):
        self.time_updated = func.now()
        session.add(self)
        session.commit()

class Student_Connector_Comments(Base):
    __tablename__ = 'student_connector_comments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    discussion_id = Column(Integer, ForeignKey('student_connector_discussion.id'))
    author_email = Column(String, ForeignKey('student_connector_user.email'))
    author = relationship('Student_Connector_User', back_populates="comments")
    text = Column(String, nullable=False)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    discussion = relationship('Student_Connector_Discussion', back_populates="comments"
    )
    def __init__(self, id, discussion_id, author_email, text):
        self.comment_id = id
        self.discussion_id = discussion_id
        self.author_email = author_email
        self.text = text
