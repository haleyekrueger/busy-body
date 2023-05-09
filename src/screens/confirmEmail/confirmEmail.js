import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButtons';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const ConfirmEmail = () => {
  const [code, setCode] = useState('');

  const navigation=useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate('Survey')
  };

  const onResendPressed = () => {
    console.warn('Resend pressed')
  };

  const onSignInPressed = () => {
    navigation.navigate('Login')
  };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm Email</Text>

           
            <CustomInput 
            placeholder="Enter your confirmation code"
            value={code}
            setValue={setCode}
            />

            <CustomButton
            text="Confirm"
            onPress={onConfirmPressed}
            />

            <CustomButton
            text="Resend code"
            type="SECONDARY"
            onPress={onResendPressed}
            />  

            <CustomButton
            text="Back to sign in"
            onPress={onSignInPressed}
            type="TERTIARY"
            />

        

        </View>
        </ScrollView>
    )
    };
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    color: '#a6a6a6',
    marginVertical: 10,
  },
  link: {
    color: '#ffcc00',
  
  }
});

export default ConfirmEmail;
