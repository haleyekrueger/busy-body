import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import styles from '../../customStyleSheet'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY
//          https://www.youtube.com/watch?v=O5sI8oWVBR0



// Link to connect to backend
const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
}



const LoginScreen = () => {
  const navigation = useNavigation();
  // request attributes username and password from Users entity on busy body 
  // dqtastore database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onSignInPressed = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/users`);
      const users = await response.json();

      console.log(users);
    
      const usernameInput = username;
      const passwordInput = password;

      const user = users.find(user => user.username === usernameInput)
      

      if (user && user.password === passwordInput) {
        const userID = user.id;

        // console.log("USER ID", userID)
        // console.log("USER", user)
        // passing userID to identify the correct user on the rest of the screens
  
        navigation.navigate('TabNavigation', {
          screen: 'WorkoutNavigation',
          userID: userID,
          user: user,
          users: users,
        })
        
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again later.');
    }
  };
    
    

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
    // this will send a CREATE request to Users api
  }

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
    
            <Text style={titleStyle.title}> BUSY BODY </Text> 
          
            <CustomInput
              placeholder="Username" 
              value={username} 
              setValue={setUsername}/>
              
         
            <CustomInput 
              placeholder="Password" 
              value={password} 
              setValue={setPassword}
              secureTextEntry={true}/>
                        

            <CustomButton 
              text="Sign In" 
              onPress={onSignInPressed} />


            <View style={styles.root}>
            <CustomButton 
              text="New User? Create an account" 
              onPress={onSignUpPressed}
              type="TERTIARY"
            />

            </View>

        </View>
        
      </ScrollView>
      </LinearGradient>
    );
};

const titleStyle = StyleSheet.create({
  blurContainer: {
 
    width: '70%',
    borderRadius: 100,
    padding: 5,
    marginVertical: 10,

    
   },
  title: {
    marginTop: 15,
    fontSize: 55,
    width: 200,
    height: 180,
    fontStyle: 'italic',
    fontWeight: 900,   
    alignItems: 'center',
    flexDirection: 'column',
    lineHeight: 55, 
    textAlign: 'center',
    letterSpacing: 0,
    color: 'white',
  },
});


export default LoginScreen;
