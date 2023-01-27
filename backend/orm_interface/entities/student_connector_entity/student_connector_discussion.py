from sqlalchemy import Integer, ForeignKey, Column, String, Table
from sqlalchemy.orm import relationship

from orm_interface.base import Base

class Student_Connector_Discussion(Base):
    __tablename__ = 'student_connector_discussion'

    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String, nullable=False)
    author_id = Column(String, nullable=False)
    comments = relationship('Student_Connector_Comments', back_populates="discussion"
    )
    lecture_id = Column(String, ForeignKey('lecture.id'))
    lecture = relationship('Lecture', back_populates="discussions")
    def __init__(self, id, text, lecture_id, author_id):
        self.id = id
        self.text = text
        self.lecture_id = lecture_id
        self.author_id = author_id

class Student_Connector_Comments(Base):
    __tablename__ = 'student_connector_comments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    discussion_id = Column(Integer, ForeignKey('student_connector_discussion.id'))
    author_id = Column(Integer, ForeignKey('student_connector_user.id'))
    text = Column(String, nullable=False)
    discussion = relationship('Student_Connector_Discussion', back_populates="comments"
    )
    def __init__(self, id, discussion_id, author_id, text):
        self.comment_id = id
        self.discussion_id = discussion_id
        self.author_id = author_id
        self.text = text
