import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation} from '@react-navigation/core'

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButtons';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY
const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
}
const body_type = "mesomorph";
const age = 26; 
const registerUser = async (username, password, age, body_type) => {
  try {
    const response = await fetch(`${config.backendUrl}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        age,
        body_type
      }),
    });
    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData.id, 1)
      const userID = responseData.id
      return { success: true, userID}
    } else {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
  } catch (error) {
    throw new Error ('Registration failed.')
  }
}

const SignUp = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const onRegisterPressed = async() => {
    try{
      const response = await registerUser(username, password, age, body_type);
      console.log(response.userID, 2);
      if (response.success) {
        console.log(response.userID,3)
      navigation.navigate('ConfirmEmail',
        { userID : response.userID },
      );
    }
    } catch (error) {
      console.error(error)
    }
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
            text="Already have an account? Sign intest"
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
