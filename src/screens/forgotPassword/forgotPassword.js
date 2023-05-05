import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButtons';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const ForgotPassword = () => {

const [username, setUsername] = useState('');

const navigation=useNavigation()

const onSendPressed = () => {
  navigation.navigate('ResetPassword')
};


const onSignInPressed = () => {
  navigation.navigate('Login')
};

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Reset Your Password</Text>

           
            <CustomInput 
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />

            <CustomButton
            text="Send"
            onPress={onSendPressed}
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

export default ForgotPassword;
