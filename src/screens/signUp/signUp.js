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
//
 

const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
}

const registerUser = async (username, password, age, frequency, body_type) => {
  console.log(username)
  console.log(password)
  console.log(body_type)
  console.log(frequency)
  console.log(age)
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
        frequency,
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
    console.error(error)
    throw new Error ('Registration failed.')
   
  }

}


const SignUp = () => {

  const navigation = useNavigation();

  // Update username
  const [username, setUsername] = useState('');


  // Update password
  const [password, setPassword] = useState('');


  // Update body type
  const [body_type, setBodyType] = useState(null);
  const handleBodyTypeChange = (value) => {
    setBodyType(value);
  };

  // Update frequency
  const [frequency, setFrequency] = useState(null);
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };

  // update age
  const [age, setAge] = useState('');

  // When register is pressed, call registerUser to create a user
  const onRegisterPressed = async() => {
    try{
      const response = await registerUser(username, password, age, frequency, body_type);
      console.log(response.userID, 2);
      if (response.success) {
        console.log(response.userID,3)
        navigation.navigate('TabNavigation', {
          screen: 'WorkoutNavigation',
          userID: response.userID,})  
    }
    } catch (error) {
      console.error(error)
    }
  };


  const onSignInPress = () => {
    navigation.navigate('Login')
  };

  // Screen display
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
       
            />

            <CustomInput
            placeholder="Password"
            onChangeText={setPassword}
            setValue={setPassword}
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
            />

        </View>

        <View>
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