import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
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
  const [seePassword, setSeePassword] = useState(true);
 

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
  
/*
  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };*/

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
            //onPress={onRegisterPressed}
            onPress={validate}
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
