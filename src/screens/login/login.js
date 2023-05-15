import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../assets/images/logo1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

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
      const response = await fetch('`${config.backendUrl}/users`')
      const users = await response.json()

      const usernameInput = document.getElementById('username').value
      const passwordInput = document.getElementById('password').value

      const user = users.find(user => user.username === usernameInput)

        if (user && user.password === passwordInput) {
            navigation.navigate('Survey')
        } else {
             alert('Invalid username or password')
        }
      }
  
  
  
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
    // we will need to add an email attribute to the user object
// so that we can do the same method with get all users...thr user will enter their
// username and email and we will parse the reponse to find the associated email matches 
// the username given/if it even exists, then we will send a link to the email to a screen that
// hits a PATCH endpoint and allows the user to update their password
  }

  const onSignInFacebook = () => {
    console.warn('Sign in Facebook');
  }

  const onSignInGoogle = () => {
    console.warn('Sign in Google');
  }

  const onSignInApple = () => {
    console.warn('Sign in Apple');
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
    // this will send a CREATE request to Users api
  }

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * .2}]} 
            resizeMode="contain"
            />
          
            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword}/>

            <CustomButton text="Sign In" onPress={onSignInPressed} />

            <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

            <CustomButton
              text="Sign In with Facebook" 
              bgColor='#E7EAF4'
              fgColor='#4765A9'
              onPress={onSignInFacebook} />

            <CustomButton 
              text="Sign In with Google" 
              bgColor='#fae9ea'
              fgColor='#dd4d44'
              onPress={onSignInGoogle} />

            <CustomButton 
              text="Sign In with Apple" 
              bgColor='#535353'
              fgColor='#F9F6F6'
              onPress={onSignInApple} />

            <CustomButton 
              text="Don't have an account? Create one" 
              onPress={onSignUpPressed}
              type="TERTIARY"
            />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: "white",
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
    marginBottom: 5,
  },
});
export default LoginScreen;
