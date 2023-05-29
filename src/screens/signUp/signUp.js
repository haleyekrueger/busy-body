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

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {

    handleError(null, 'email');
    handleError(null, 'password');
    handleError(null, 'repeatPassword');
    //Keyboard.dismiss();
    let isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!email) {
      handleError('Please input an email', 'email');
      isValid = false;
    } else if (reg.test(email) === false) {

      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 5) {
      handleError('Password must be greater than 5 characters', 'password');
      isValid = false;
    }

    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;

    if (!isNonWhiteSpace.test(password)) {
      handleError('Password must not contain whitespace', 'password');
      isValid = false;
    }

    if (!isContainsUppercase.test(password)) {
      handleError('Password must have at least 1 uppercase letter', 'password');
      isValid = false;
    }

    if (!isContainsNumber.test(password)) {
      handleError('Password must contain at least 1 number', 'password');
      isValid = false;
    }

    if (password != repeatPassword) {
      console.log("not the same passwords")
      handleError('Passwords do not match', 'repeatPassword');
      isValid = false;      
    }

    if (isValid) {
      //register();
      console.log("valid");
    }
  };


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

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };


    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Create Account</Text>

            <CustomInput 
            placeholder="Username"
         
            value={username}
            onChangeText={setUsername}
            setValue={setUsername}
            secureTextEntry={false}
            />

            <CustomInput
            placeholder="Email"
            
            value={email}
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            setValue={setEmail}
            secureTextEntry={false}
            error={errors.email}
            />

            <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            setValue={setPassword}
            secureTextEntry={true}
            error={errors.password}
            />

            <CustomInput
            placeholder="Re-enter Password"
            value={repeatPassword}
            onChangeText={text => handleOnchange(text, 'repeatPassword')}
            onFocus={() => handleError(null, 'repeatPassword')}
            setValue={setRepeatPassword}
            secureTextEntry={true}
            error={errors.repeatPassword}
            />      

            <CustomButton 
            text="Register" 
            onPress={validate}
            />

           

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
