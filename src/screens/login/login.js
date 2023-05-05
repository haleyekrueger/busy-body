import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    navigation.navigate('Survey')
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
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
