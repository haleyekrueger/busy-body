# busy-body

--------------------------------------------------------------------------------------------------
backend hosted on: https://busy-body-386417.wn.r.appspot.com/

If you send this json object to /users via POST:

{
  "username": "john_joejohn",
  "password": "password123",
  "age": 25,
  "body_type": "mesomorph"
}


The api will return this if the data is valid:

{
  "id": 5634161670881280, 
  "username": "john_joejohn", 
  "password": "password123", 
  "age": 25, 
  "body_type": "mesomorph", 
  "self": "https://busy-body-386417.wn.r.appspot.com/users/5634161670881280"
}


Or something like this if the data is invalid:

{
    "Password Error": "password length must be between 8 and 20 characters"
}

Text me if you are working on something and you need a quick fix or tutorial! Haley 9166935782
---------------------------------------------------------------------------------------------------

To run frontend file:

npm install 
npx expo start
i for ios

General resources:
https://www.youtube.com/watch?v=ALnJLbjI7EY
https://www.youtube.com/watch?v=_Fi86az2OV4
https://www.youtube.com/watch?v=yyGS0adZdsU&list=RDCMUCYSa_YLoJokZAwHhlwJntIA&start_radio=1&rv=yyGS0adZdsU&t=5055

https://reactnative.dev/docs/navigation
https://reactnavigation.org/docs/getting-started
