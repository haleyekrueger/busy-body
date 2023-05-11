import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';


const Profile = () => {
    const navigation=useNavigation();
    const [userData, setUserData] = useState(null);

    const onLogoutPressed = () => {
        navigation.navigate('Login')
      };
    
    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user'); //change url to host (probably appspot)
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
    
  if (!userData) {
    return <Text>Hang tight...</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Username: {userData.username}</Text>
        <Text style={styles.text}>Age: {userData.age}</Text>
        <Text style={styles.text}>Body Type: {userData.body_type}</Text>
        <CustomButton
          text="Log Out"
          onPress={onLogoutPressed}
          type="SECONDARY"
        />
      </View>
    </ScrollView>
  );

   
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


  }
});


export default Profile;
