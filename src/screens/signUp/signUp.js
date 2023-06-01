import React, {useState} from 'react';
import { View, Text, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation} from '@react-navigation/core'
import styles from '../../customStyleSheet'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomRadioButton from '../../components/CustomRadioButton';
import { Divider } from '@rneui/themed';

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
      await validate();
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


  const onSignInPress = () => {
    navigation.navigate('Login')
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const {height, width} = useWindowDimensions();

  // for displaying radio buttons for survey at end of sign up screen:
  const bodyTypeOptions = ['Ectomorph', 'Mesomorph', 'Endomorph'];
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const experienceLevelOptions = ['3', '4', '5'];
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);

  const handleSelectBodyType = (index) => {
    setSelectedBodyType(index);
  };

  const handleSelectExperienceLevel = (index) => {
    setSelectedExperienceLevel(index);
  };

    return (
    <SafeAreaView style ={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Create Account</Text>

            <CustomButton
            text="Already have an account? Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
            />

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
                    <Divider style={styles.divider} inset={true} insetType="center"/>

          <Text style={styles.largerText}>Select your body type:</Text>

          <CustomRadioButton
            options={bodyTypeOptions}
            selectedOption={selectedBodyType}
            onSelect={handleSelectBodyType}
          />
          <Divider style={styles.divider} inset={true} insetType="center"/>

          <Text style={styles.largerText}>Select the number of days you would like to work out each week:</Text>

          <CustomRadioButton
            options={experienceLevelOptions}
            selectedOption={selectedExperienceLevel}
            onSelect={handleSelectExperienceLevel}
          />

    

        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
      <CustomButton 
            text="Register" 
            onPress={onRegisterPressed}
            />
      </View>
    </SafeAreaView>  
    )
};


export default SignUp;