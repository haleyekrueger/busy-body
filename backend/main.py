from google.cloud import datastore
from flask import Flask, request, json, url_for, make_response
import json
import constants
#from json2html import json2html

app = Flask(__name__)
client = datastore.Client()

@app.route('/')
def index():
    return "Use postman testing suite to understand functionality"

"""
 CREATE A users
    - username must be between 8 and 20 characters
    - password must be between 8 and 20 characters
    - age must be between 14 and 115
    - body_type must be either "endomorph", "ectomorph", or "mesomorph"
 """
@app.route('/users', methods=['POST'])
def users_post():

    error_msg = {}
    invalid = False
    content = request.get_json()

    content_type = request.content_type
    if content_type != 'application/json':
        return (json.dumps({"Error": "The request sent an unsupported MIME type"}), 415)
    
    mime_sent = request.headers.get('Accept')
    if not (mime_sent == "application/json" or mime_sent == "*/*"):
        return((json.dumps({"Error": "The requests Accept header contains an unsupported MIME type"}), 406))

    # check for inclusion of required attributes
    check_username = content.get('username')
    check_password = content.get('password')
    check_age = content.get('age')
    check_body_type = content.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg["Error"] = "The request object contains extraneous attributes"

    # Check if the users username is already in use
    query = client.query(kind=constants.users)
    query.add_filter('username', '=', check_username)
    curr_users = list(query.fetch())

    if curr_users:
        return (json.dumps({"Error":  "The request object contains a username attribute that is not unique"}), 403)

    if not check_username or not check_password or not check_age or not check_body_type:
        return (json.dumps({"Error": "The request object is missing at least one of the required attributes"}), 400)
    else:

        # check for username length
        if len(check_username) < 8 or len(check_username) > 20: 
            invalid = True
            error_msg["Username Error"] = "username length must be between 8 and 20 characters"
        # check for password length
        if len(check_password) < 8 or len(check_password) > 20:
            invalid = True
            error_msg["Password Error"] = "password length must be between 8 and 20 characters"
            
        # check that age is an int
        if type(check_age) != int:
            invalid = True
            error_msg["Age Error"] = "age attribute must be of type int"
        else:
            # check that age is between 14 and 115
            if check_age < 14 or check_age > 115:
                invalid = True
                error_msg["Age Error"] = "age must be between 14 and 115 years"
        
        body_types = ["ectomorph", "endomorph", "mesomorph"]
        if check_body_type not in body_types:
            invalid = True
            error_msg["Body Type Error"] = "Error: Body type attribute is not ectomorph, endomorph, or mesomorph"

        if invalid:
            headers = {'Content-Type': 'application/json'}
            return (json.dumps(error_msg), 400, headers)

        new_user = datastore.entity.Entity(key=client.key(constants.users))
        new_user.update({"username": content["username"], "password": content["password"], "age": content["age"], "body_type": content["body_type"]})
        client.put(new_user)
        user_id = new_user.key.id

        response_data = {"id": user_id, "username": new_user.get("username"), "password": new_user.get("password"), "age": new_user.get("age"), "body_type": new_user.get("body_type"), "self": url_for('users_get', user_id=user_id, _external=True)}
        return (json.dumps(response_data), 201, {"Content-Type": "application/json"})

#GET A user

@app.route('/users/<user_id>', methods=['GET'])
def users_get(user_id):
    users_key = client.key(constants.users, int(user_id))
    users = client.get(key=users_key)

    if users == None:
        return (json.dumps({"Error": "No user with this user_id exists"}), 404)
    else: # check header for accepted type, if json send json if html send json2html FIX
        response_data = {"id": user_id, "username": users.get("username"), "password": users.get("password"), "age": users.get("age"), "body_type": users.get("body_type"), "self": url_for('users_get', user_id=user_id, _external=True)}
        #res = make_response(json2html.convert(json = json.dumps(response_data)))
        res = make_response(json.dumps(response_data))
        res.headers.set('Content-Type', 'application/json')
        return res

"""
#EDIT A users (PATCH)

# Haley Krueger citing Renta on Stack Overflow: https://stackoverflow.com/questions/71029951/how-to-properly-write-a-patch-endpoint-in-flask-and-pymongo 
# specifically for structure of setting attributes on line 109-111 so that they are only assigned if they are not null
"""
@app.route('/users/<user_id>', methods=['PATCH'])
def users_patch(user_id):
    content = request.get_json()
    users_key = client.key(constants.users, int(user_id))
    updated_user = client.get(key=users_key)
    invalid = False
    content = request.get_json()
    error_msg = {}
    attributes = []

    # check for inclusion of possible attributes
    if content.get('username') != None:
        new_username = content.get('username')
        attributes.append(new_username)
    else:
        new_username = updated_user.get('username')
    if content.get('password') != None:
        new_password = content.get('password')
        attributes.append(new_password)
    else:
        new_password = updated_user.get('password')
    if content.get('age') != None:
        new_age = content.get('age')
        attributes.append(new_age)
    else:
        new_age = updated_user.get('age')
    if content.get('body_type') != None:
        new_body_type = content.get('body_type')
        attributes.append(new_body_type)
    else:
        new_body_type = updated_user.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg["Error"] = "The request object contains extraneous attributes"

    # check for request without attributes
    if len(attributes) == 0:
        invalid = True
        error_msg["No Attributes Error"] = "The request object does not contain any attributes"
    else:

        if content.get('username') != None:
            # check for username length
            if len(new_username) < 8 or len(new_username) > 20: 
                invalid = True
                error_msg["Username Error"] = "username length must be between 8 and 20 characters"
            
            # check username uniqueness
            query = client.query(kind=constants.users)
            query.add_filter('username', '=', new_username)
            curr_users = list(query.fetch())
            if len(curr_users) != 0 and curr_users[0].key != users_key:
                return (json.dumps({"Error":  "The request object contains a username attribute that is not unique"}), 403)
                
        # check for password length
        if len(new_password) < 8 or len(new_password) > 20:
            invalid = True
            error_msg["Password Error"] = "password length must be between 8 and 20 characters"

        # check that age is an int
        if content.get('age') != None:
            if type(new_age) != int:
                invalid = True
                error_msg["Age Error"] = "age attribute must be of type int"
            else:
                # check that age is between 14 and 115
                if new_age < 14 or new_age > 115:
                    invalid = True
                    error_msg["Age Error"] = "age must be between 14 and 115 years"
        
        if content.get('body_types') != None:
            body_types = ["ectomorph", "endomorph", "mesomorph"]
            if new_body_type not in body_types:
                invalid = True
                error_msg["Body Type Error"] = "Error: Body type attribute is not ectomorph, endomorph, or mesomorph"
        
        if invalid:
            headers = {'Content-age': 'application/json'}
            return (json.dumps(error_msg), 400, headers)

        else:

            updated_user.update({"username": new_username, "password": new_password, "age": new_age, "body_type": new_body_type})
            client.put(updated_user)
            user_id = updated_user.key.id

            response_data = {"id": user_id, "username": updated_user.get("username"), "password": updated_user.get("password"), "age": updated_user.get("age"), "body_type": updated_user.get("body_type"), "self": url_for('users_get', user_id=user_id, _external=True)}

            return (json.dumps(response_data), 201, {"Content-Type": "application/json"})

"""
#EDIT A user (PUT)
"""
@app.route('/users/<user_id>', methods=['PUT'])
def users_put(user_id):
    content = request.get_json()
    users_key = client.key(constants.users, int(user_id))
    updated_user = client.get(key=users_key)
    
    invalid = False
    content = request.get_json()
    error_msg = {}

    # check for inclusion of required attributes
    check_username = content.get('username')
    check_password = content.get('password')
    check_age = content.get('age')
    check_body_type = content.get('body_type')

    # check for inclusion of extraneous attributes
    if len(content) > 4:
        invalid = True
        error_msg["Error"] = "The request object contains extraneous attributes"

    if not check_username or not check_password or not check_age or not check_body_type:
        return (json.dumps({"Error": "The request object is missing at least one of the required attributes"}), 400)
    else:

        # check for username length
        if len(check_username) < 8 or len(check_username) > 20: 
            invalid = True
            error_msg["Username Error"] = "username length must be between 8 and 20 characters"
        # check for password length
        if len(check_password) < 8 or len(check_password) > 20:
            invalid = True
            error_msg["Password Error"] = "password length must be between 8 and 20 characters"
            
        # check that age is an int
        if type(check_age) != int:
            invalid = True
            error_msg["Age Error"] = "age attribute must be of type int"
        else:
            # check that age is between 14 and 115
            if check_age < 14 or check_age > 115:
                invalid = True
                error_msg["Age Error"] = "age must be between 14 and 115 years"
        
        body_types = ["ectomorph", "endomorph", "mesomorph"]
        if check_body_type not in body_types:
            invalid = True
            error_msg["Body Type Error"] = "Error: Body type attribute is not ectomorph, endomorph, or mesomorph"

        if invalid:
            headers = {'Content-Type': 'application/json'}
            return (json.dumps(error_msg), 400, headers)

        new_user = datastore.entity.Entity(key=client.key(constants.users))
        new_user.update({"username": content["username"], "password": content["password"], "age": content["age"], "body_type": content["body_type"]})
        client.put(new_user)
        user_id = {}
        user_id["id"] = new_user.key.id

        new_url = str(url_for('users_get', user_id=user_id["id"], _external=True))
        res = make_response(json.dumps(user_id), 303)
        res.headers.set('Location', new_url)
        res.headers.set('Content-Type', 'application/json')
        return res

"""

#DELETE A users
"""
@app.route('/users/<user_id>', methods=['DELETE'])
def users_delete(user_id):
    users_key = client.key(constants.users, int(user_id))
    users = client.get(key=users_key)
    if users == None:
        return (json.dumps({"Error": "No users with this user_id exists"}), 404)
    else:
        client.delete(users_key)
        return ('', 204)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
