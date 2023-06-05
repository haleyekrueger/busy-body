import React, {useState} from 'react';
import { View, Text, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation} from '@react-navigation/core'
import styles from '../../customStyleSheet'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Divider } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from "react-native-picker-select";
import { BlurView } from 'expo-blur';



//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY
//  https://blog.logrocket.com/how-to-use-react-native-picker-select/
 

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



  // update body type
  const [bodyType, setBodyType] = useState(null);
  const handleBodyTypeChange = (value) => {
    setFrequency(value);
  };


  // update frequency
  const [frequency, setFrequency] = useState(null);
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };

  // update age
  const [age, setAge] = useState('');


    return (

      <LinearGradient style={styles.container}
      colors={[
        '#E4B9FF',
        '#DA9EFF',
        '#C86DFF',
        '#B455FF',
        '#A055FF',
        '#9655FF',
        '#7755FF',
        '#7755FF',
        '#6355FF',
      ]}
      start={{x: 0, y: 0}}
      end={{x: .85, y: .75}}
      locations={[.03, .09, .25, .38, .49, .59, .7, .8, .95]}
    >
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

          <Text style={styles.text}>Select your body type:</Text>
          <View style={styles.blurContainer}>
          <BlurView intensity={55} tint='light' style={styles.blurView}>
            <View style={styles.picker}>
            <RNPickerSelect
            placeholder= {{
                label: 'Body type...'
              }}
            onValueChange={handleBodyTypeChange}
            items={[
              { label: 'Mesomorph', value: 'Mesomorph' },
              { label: 'Ectomorph', value: 'Ectomorph' },
              { label: 'Endomorph', value: 'Endomorph' },
          
            ]}
          
            style={{  
              placeholder: {
                color: '#7755FF',
                fontStyle: 'italic',
                fontSize: 15,
                textAlign: 'center',
                marginTop: 8,
                alignItems: 'center',
              },
              inputIOS: {
                fontStyle: 'italic',
                fontSize: 15,
                textAlign: 'center',
                marginTop: 8,
                alignItems: 'center',
              },
       
            }}
        />
        </View>
            </BlurView>
            
        </View>

          <Text style={styles.text}>Select the number of days you would like to work out each week:</Text>
          <View style={styles.blurContainer}>
          <BlurView intensity={55} tint='light' style={styles.blurView}>
            <View style={styles.picker}>
            <RNPickerSelect
          
            placeholder= {{
              label: 'Days per week...'
            }}
            onValueChange={handleFrequencyChange}
            items={[
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ]}

            style={{
              
              placeholder: {
                color: '#7755FF',
                fontStyle: 'italic',
                fontSize: 15,
                textAlign: 'center',
                marginTop: 8,
                alignItems: 'center',
              },
              inputIOS: {
               
                fontStyle: 'italic',
                fontSize: 15,
                textAlign: 'center',
                marginTop: 8,
                alignItems: 'center',
              },
       
            }}
        />
        </View>
            </BlurView>
            
        </View>
     
        <Text style={styles.text}>Enter your age:</Text>
        <CustomInput
            placeholder="Age..."
            value={age}
            setValue={setAge}
            onChangeText={text => handleOnchange(text, 'age')}
          
            />

        </View>

        <View style={styles.buttonContainer}>
      <CustomButton 
            text="Create my account" 
            onPress={onRegisterPressed}

            />
      </View>
      </ScrollView>

    
    </SafeAreaView>  
    </LinearGradient>
    )
};


export default SignUp;