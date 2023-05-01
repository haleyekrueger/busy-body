import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/logo1.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../component/CustomButton'


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const loginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * .2}]} 
            resizeMode="contain"
            />
          
            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword}/>

            <CustomButton />
        </View>
    );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
    marginBottom: 15
  }
});
export default loginScreen;
