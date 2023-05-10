from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask, request, json, url_for, make_response
import json
import constants
from json2html import json2html

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017')       # default MongoDB local host port
database = client['mydatabase']
collection = database.users

@app.route('/')
def index():
    return "To be connected to busy-body frontend soon"

"""
 CREATE A USER
    attributes:     username (between 8 and 20 chars a-z, no special chars, no digits)
                    password (between 8 and 20 chars a-z)
                    age (int 0-115)
                    body_type (string "ectomorph", "endomorph", or "mesomorph")
 """
@app.route('/user', methods=['POST'])
def user_post():
    error_msg = []
    invalid = False
    content = request.get_json()
    content_type = request.headers.get('Content-Type')
    if content_type != 'application/json':
        return (json.dumps({"Error": "The request sent an unsupported MIME type"}), 415)
    
    # check for inclusion of required attributes
    check_username = content.get('username')
    check_password = content.get('password')
    check_age = content.get('age')
    check_body_type = content.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg.append("Error: The request object contains extraneous attributes")

    # Check if the user username is already in use
    existing_users = database.users
    this_user = existing_users.find_one({"username": check_username})

    if this_user != None:
        return (json.dumps({"Error":  "The request object contains a username attribute that is not unique"}), 403)

    if not check_username or not check_password or not check_age or not check_body_type:
        return (json.dumps({"Error": "The request object is missing at least one of the required attributes"}), 400)
    
    else:
        # check for username length
        if len(check_username) < 8 or len(check_username)> 20: 
            invalid = True
            error_msg.append("Error: Username attribute length must be between 8 & 20 characters")
        
        # check for password length
        if len(check_password) < 8 or len(check_password) > 20:
            invalid = True
            error_msg.append("Error: Password attribute length must be between 8 & 20 characters")
        
        # check that age is an int
        if type(check_age) != int:
            invalid = True
            error_msg.append("Error: Age attribute must be of type int")
        else:
            # check that age does not exceed 115
            if check_age > 115:
                invalid = True
                error_msg.append("Error: Age attribute value must be less than or equal to 115")
        
        if check_body_type != "ectomorph" or check_body_type != "endomorph" or check_body_type != "mesomorph":
            invalid = True
            error_msg.append("Error: Body type attribute is not ectomorph, endomorph, or mesomorph")

        if invalid == True:
            final_msg = ', '.join(error_msg)
            return (json.dumps(final_msg), 400)

        new_user = {"username": content["username"], "password": content["password"], "age": content["age"], "body_type": content["body_type"]}
        new_db_obj = collection.insert_one(new_user)
        user_id = new_db_obj.inserted_id

        response_data = {"id": str(user_id), "username": new_user["username"], "password": new_user["password"], "age": new_user["age"], "body_type": new_user.get["body_type"], "self": url_for('user_get', user_id=user_id, _external=True)}
        return (json.dumps(response_data), 201, {"Content-Type": "application/json"})


"""
GET A user
""" 
@app.route('/user/<user_id>', methods=['GET'])
def user_get(user_id):
    user = database.find_one({"_id": ObjectId(user_id), "entity_type": constants.user})

    if user == None:
        return (json.dumps({"Error": "No user with this user_id exists"}), 404)
    else:
        response_data = {"id": str(user_id), "username": user["username"], "password": user["password"], "age": user["age"], "body_type": user.get["body_type"], "self": url_for('user_get', user_id=user_id, _external=True)}
        return (json.dumps(response_data), 200, {"Content-Type": "application/json"})


"""
EDIT A USER (PATCH)
"""
@app.route('/user/<user_id>', methods=['PATCH'])
def user_patch(user_id):
    content = request.get_json()
    user = database.users.find_one({"_id": ObjectId(user_id)})
    if user == None:
        return json.dump({"Error": "This user does not exist"}), 404

    invalid = False
    attributes = []
    error_msg = []

    # check for inclusion of possible attributes
    if content.get('username') != None:
        new_username = content.get('username')
        attributes.append(new_username)
    else:
        new_username = user.get('username')
    if content.get('password') != None:
        new_password = content.get('password')
        attributes.append(new_password)
    else:
        new_password = user.get('password')
    if content.get('age') != None:
        new_age = content.get('age')
        attributes.append(new_age)
    else:
        new_age = user.get('age')
    if content.get('body_type') != None:
        new_body_type = content.get('body_type')
        attributes.append(new_body_type)
    else:
        new_body_type = user.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg.append("Error: The request object contains extraneous attributes")

    # check for request without attributes
    if len(attributes) == 0:
        invalid = True
        error_msg.append("Error: The request object does not contain any attributes")
    else:
        # check for username length
        if len(new_username) < 8 or len(new_username)> 20: 
            invalid = True
            error_msg.append("Error: Username attribute length must be between 8 & 20 characters")
        
        # check for password length
        if len(new_password) < 8 or len(new_password) > 20:
            invalid = True
            error_msg.append("Error: Password attribute length must be between 8 & 20 characters")
        
        # check that age is an int
        if type(new_age) != int:
            invalid = True
            error_msg.append("Error: Age attribute must be of type int")
        else:
            # check that age does not exceed 115
            if new_age > 115:
                invalid = True
                error_msg.append("Error: Age attribute value must be less than or equal to 115")
        
        if new_body_type != "ectomorph" or new_body_type != "endomorph" or new_body_type != "mesomorph":
            invalid = True
            error_msg.append("Error: Body type attribute is not ectomorph, endomorph, or mesomorph")

        if invalid == True:
            final_msg = ', '.join(error_msg)
            return (json.dumps(final_msg), 400)

        new_user = {"username": content["username"], "password": content["password"], "age": content["age"], "body_type": content["body_type"]}
        new_db_obj = collection.insert_one(new_user)
        user_id = new_db_obj.inserted_id

        response_data = {"id": str(user_id), "username": new_user["username"], "password": new_user["password"], "age": new_user["age"], "body_type": new_user.get["body_type"], "self": url_for('user_get', user_id=user_id, _external=True)}
        return (json.dumps(response_data), 201, {"Content-Type": "application/json"})
  

"""
EDIT A user (PUT)
"""
@app.route('/user/<user_id>', methods=['PUT'])
def user_put(user_id):
    content = request.get_json()
    user = database.users.find_one({"_id": ObjectId(user_id)})
    if user == None:
        return json.dump({"Error": "This user does not exist"}), 404

    invalid = False
    attributes = []
    error_msg = []

    # check for inclusion of required attributes
    check_username = content.get('username')
    check_password = content.get('password')
    check_age = content.get('age')
    check_body_type = content.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg.append("Error: The request object contains extraneous attributes")

    # check for missing attributes
    if not check_username or not check_password or not check_age or not check_body_type:
        invalid = True
        error_msg.append("Error: The request object is missing at least one of the required attributes")
    else:
        if check_username:
            # check username length
            if len(check_username) < 8 or len(check_username) > 20:
                invalid = True
                error_msg.append("Error: username attribute age must be between 8 & 20 characters")

            # Check if the user username is already in use
            existing_users = database.users
            this_user = existing_users.find_one({"username": check_username})

            if this_user != None:
                return (json.dumps({"Error":  "The request object contains a username attribute that is not unique"}), 403)
                
        # check password length
        if check_password:
            if len(check_password) < 8 or len(check_password) > 20:
                invalid = True
                error_msg.append("Error: password attribute age must be between 8 & 20 characters")

        # check that age is an int
        if check_age:
            if type(check_age) != int:
                invalid = True
                error_msg.append("Error: age attribute must be of type int")
            else:
                # check that age does not exceed 115
                if check_age > 115:
                    invalid = True
                    error_msg.append("Error: age attribute value must be less than or equal to 115")
    
        if invalid == True:
            final_msg = ', '.join(error_msg)
            return (json.dumps({final_msg}), 400)

        new_user = {"username": content["username"], "password": content["password"], "age": content["age"], "body_type": content["body_type"]}
        new_db_obj = collection.insert_one(new_user)
        user_id = new_db_obj.inserted_id

        response_data = {"id": str(user_id), "username": new_user["username"], "password": new_user["password"], "age": new_user["age"], "body_type": new_user.get["body_type"], "self": url_for('user_get', user_id=user_id, _external=True)}
        return (json.dumps(response_data), 201, {"Content-Type": "application/json"})
    

"""
DELETE A user
"""
@app.route('/user/<user_id>', methods=['DELETE'])
def user_delete(user_id):
        user = database.users.find_one_and_delete({"_id": ObjectId(user_id)})
        if user == None:
            return (json.dumps({"Error": "This user does not exist"}), 404)
        else:
            return ('', 204)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=27017, debug=True)