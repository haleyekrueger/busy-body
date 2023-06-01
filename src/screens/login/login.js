import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import styles from '../../customStyleSheet'

const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
}

//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const LoginScreen = () => {
  // request attributes username and password from Users entity on busy body 
  // dqtastore database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 // const onSignInPressed = () => {
    // send username and password to backend? how to manage login
// can we do a /users GET request and then parse through the list for
// the unique username and then see if the password asso iated with the username 
// matches the password entered
    

  //  navigation.navigate('Survey')
//  }
  
  
  
const onSignInPressed = async () => {
  try {
    const response = await fetch(`${config.backendUrl}/users`);
    const users = await response.json();

    console.log(users);
  
    const usernameInput = username;
    const passwordInput = password;

    const user = users.find(user => user.username === usernameInput)
    

    if (user && user.password === passwordInput) {
      const userID = user.id;
      // passing userID to identify the correct user on the rest of the screens
      navigation.navigate('Survey', {userID});
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
};
  
  
  
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
    // we will need to add an email attribute to the user object
// so that we can do the same method with get all users...thr user will enter their
// username and email and we will parse the reponse to find the associated email matches 
// the username given/if it even exists, then we will send a link to the email to a screen that
// hits a PATCH endpoint and allows the user to update their password
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
    // this will send a CREATE request to Users api
  }

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

    return (
    <SafeAreaView style ={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
    
            <Text style={titleStyle.title}> BUSY BODY </Text> 
          
            <CustomInput
              placeholder="Username" 
              value={username} 
              setValue={setUsername}/>
              
            <CustomInput placeholder="Password" value={password} setValue={setPassword}/>

            <CustomButton text="Sign In" onPress={onSignInPressed} />

            <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

            <CustomButton 
              text="New user? Create an account" 
              onPress={onSignUpPressed}
              type="TERTIARY"
            />

        </View>
      </ScrollView>
    </SafeAreaView>  
    );
};

const titleStyle = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 55,
    width: 200,
    height: 180,
    fontStyle: 'italic',
    fontWeight: 900,   
    alignItems: 'center',
    flexDirection: 'column',
    lineHeight: 55, 
    textAlign: 'center',
    letterSpacing: 0,
    color: 'white',
  },
});


export default LoginScreen;
