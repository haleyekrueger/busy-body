import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton';
     
const onSignInFacebook = () => {
    console.warn('Sign in Facebook');
  };

  const onSignInGoogle = () => {
    console.warn('Sign in Google');
  };

  const onSignInApple = () => {
    console.warn('Sign in Apple');
  };

const SocialSignInButtons = () => {
    return (
        <>
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
        </>
      );
    };
   

export default SocialSignInButtons;