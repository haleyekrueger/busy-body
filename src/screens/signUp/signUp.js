import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation} from '@react-navigation/core'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButtons';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const SignUp = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail')
  };

  const onTermsOfUsePressed = () => {
    console.warn('Terms of use')
  };

  const onPrivacyPressed = () => {
    console.warn('Privacy')
  };

  const onSignInPress = () => {
    navigation.navigate('Login')
  };


    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Create Account</Text>

            <CustomInput 
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />

            <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            />

            <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            />

            <CustomInput
            placeholder="Re-enter Password"
            value={repeatPassword}
            setValue={setRepeatPassword}
            />      

            <CustomButton 
            text="Register" 
            onPress={onRegisterPressed}
            />

            <Text style={styles.text}>
              By registering, you are agreeing to the{''}
              <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of use</Text> and{''}
              <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy </Text>
            </Text>

            <SocialSignInButton/>

            <CustomButton
            text="Already have an account? Sign in"
            onPress={onSignInPress}
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


export default SignUp;
