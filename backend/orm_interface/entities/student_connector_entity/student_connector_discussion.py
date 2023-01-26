from sqlalchemy import Integer, ForeignKey, Column, String, Table
from sqlalchemy.orm import relationship

from orm_interface.base import Base

class Student_Connector_Comments(Base):
    __tablename__ = 'student_connector_comments'
    comment_id = Column(Integer, primary_key=True),
    discussion_id = Column(Integer, ForeignKey('student_connector_discussion.discussion_id'), primary_key=True),
    author_id = Column(Integer, ForeignKey('student_connector_user.id')),
    comment_text = Column(String),
    parent_comment_id = Column(Integer)
    discussion = relationship('Student_Connector_User',
        secondary='student_connector_skills_user', back_populates="skills"
    )
    def __init__(self, comment_id, discussion_id, author_id, comment_text, parent_comment_id):
        self.comment_id =comment_id
        self.discussion_id = discussion_id
        self.author_id = author_id
        self.comment_text =comment_text
        self.parent_comment_id =parent_comment_id

class Student_Connector_Discussion(Base):
    __tablename__ = 'student_connector_discussion'
    lecture_id= Column(Integer, ForeignKey('student_connector_lecture_id'), primary_key=True),

    discussion_id= Column(Integer, primary_key=True),
    comments = relationship('Student_Connector_Comments',
        secondary='student_connector_discussion', back_populates="comments"
    )
    def __init__(self, lecture_id, discussion_id):
        self.lecture_id =lecture_id
        self.discussion_id = discussion_id