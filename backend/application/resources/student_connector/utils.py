from flask import jsonify
from orm_interface.entities.user import User

def prepare_discussion(discussion, profile_db):
    comments = []
    sorted_comments = sorted(discussion.comments, key=lambda x: x.time_created)
    for comment in sorted_comments:
        comment_author_name = profile_db.filter(User.email == comment.author.email).first()
        comment_author = {"comment_author_id": comment.author.id,
                          "comment_author_email": comment.author.email,
                          "comment_author_profile_image": comment.author.profile_image,
                          "comment_author_name": comment_author_name.firstname + " " + comment_author_name.lastname,
                          "comment_author_firstname": comment_author_name.firstname,
                          "comment_author_lastname": comment_author_name.lastname}
        comments.append({"comment_id": comment.id,
                         "comment_text": comment.text,
                         "comment_author": comment_author,
                         "time_created": comment.time_created})
    discussion_author_name = profile_db.filter(User.email == discussion.author.email).first()
    discussion_author = {"discussion_author_id": discussion.author.id,
                         "discussion_author_email": discussion.author.email,
                         "discussion_author_profile_image": discussion.author.profile_image,
                         "discussion_author_name": discussion_author_name.firstname + " " + discussion_author_name.lastname,
                         "discussion_author_firstname": discussion_author_name.firstname,
                         "discussion_author_lastname": discussion_author_name.lastname}
    result = {"discussion_id": discussion.id,
                   "discussion_text": discussion.text,
                   "discussion_author": discussion_author,
                   "comments": comments,
                   "time_created": discussion.time_created,
                   "time_updated": discussion.time_updated,
                    "show_all": False}
    return result

def prepare_profile_from_sc_user(sc_profile):
    courses = []
    skills = []
    profile = sc_profile.user
    if profile is None:
        return jsonify({"error": "Profile not found!"})
    if sc_profile.courses is not None:
        for course in sc_profile.courses:
            courses.append({"id": course.id,
                            "name": course.name})
    if sc_profile.skills:
        for skill in sc_profile.skills:
            skills.append({
                "id": skill.id,
                "skill_name": skill.skill_name}
            )
    if sc_profile.sc_degree is not None:
        return {"id": sc_profile.id,
                "uid": profile.id,
                "email": profile.email,
                "firstname": profile.firstname,
                "lastname": profile.lastname,
                "description": sc_profile.description,
                "skills": skills,
                "degree": {
                    "id": sc_profile.sc_degree.id,
                    "name": sc_profile.sc_degree.name,
                    "url": sc_profile.sc_degree.url,
                },
                "degree_id": sc_profile.sc_degree.id,
                "courses": courses,
                "profile_image": sc_profile.profile_image}
    else:
        return {"id": sc_profile.id,
                "uid": profile.id,
                "email": profile.email,
                "firstname": profile.firstname,
                "lastname": profile.lastname,
                "description": sc_profile.description,
                "skills": skills,
                "degree": "",
                "degree_id": 0,
                "courses": courses,
                "profile_image": sc_profile.profile_image}

def prepare_profile(profile):
    courses = []
    skills = []
    sc_profile = profile.student_connector_user[0]
    if profile is None:
        return jsonify({"error": "Profile not found!"})
    if sc_profile.courses is not None:
        for course in sc_profile.courses:
            courses.append({"id": course.id,
                            "name": course.name})
    if sc_profile.skills:
        for skill in sc_profile.skills:
            skills.append({
                "id": skill.id,
                "skill_name": skill.skill_name}
            )
    if sc_profile.sc_degree is not None:
        return {"id": sc_profile.id,
                "uid": profile.id,
                "email": profile.email,
                "firstname": profile.firstname,
                "lastname": profile.lastname,
                "description": sc_profile.description,
                "skills": skills,
                "degree": {
                    "id": sc_profile.sc_degree.id,
                    "name": sc_profile.sc_degree.name,
                    "url": sc_profile.sc_degree.url,
                },
                "degree_id": sc_profile.sc_degree.id,
                "courses": courses,
                "profile_image": sc_profile.profile_image}
    else:
        return {"id": sc_profile.id,
                "uid": profile.id,
                "email": profile.email,
                "firstname": profile.firstname,
                "lastname": profile.lastname,
                "description": sc_profile.description,
                "skills": skills,
                "degree": "",
                "degree_id": 0,
                "courses": courses,
                "profile_image": sc_profile.profile_image}

def prepare_lecture_member(all_member):
    result = []
    for member in all_member:
        result.append({"id": member.id,
                        "uid": member.user.id,
                        "firstname": member.user.firstname,
                        "lastname": member.user.lastname,
                        "name": member.user.firstname + " " + member.user.lastname,
                        "profile_image": member.profile_image})
    return result