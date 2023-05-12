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

Accidentally did a force push and deleted previous commits from main (from April 27 - May 1 -> can see these commits under different area in GitHub though) 

Does not look like there is a way to get those commits back. Reminder: don't put -f flag next
to push!

Keeping this here for future reference :
  git init
  git branch some_new_branch
  git checkout some_new_branch
  git status
  git add .
  git commit -m "some really cool commit message"
  git remote add "https://github.com/haleyekrueger/busy-body.git"
  git push -u origin some_new_branch
  
  Then go on github and merge 
  


To run file:

npm install @react-navigation/native @react-navigation/native-stack
npm install --save react-native-gesture-handler react-native-reanimated react-native-screens
npm install -g expo-cli (might need to use sudo)
sudo expo-cli start --tunnel

can do npm run ios 

resources:
https://www.youtube.com/watch?v=ALnJLbjI7EY
https://www.youtube.com/watch?v=_Fi86az2OV4
https://www.youtube.com/watch?v=yyGS0adZdsU&list=RDCMUCYSa_YLoJokZAwHhlwJntIA&start_radio=1&rv=yyGS0adZdsU&t=5055

https://reactnative.dev/docs/navigation
https://reactnavigation.org/docs/getting-started
