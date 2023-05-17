import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {userID} from '../survey';
import {useRoute} from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';


const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
}

const Profile = () => {
    const navigation=useNavigation();
    const [userData, setUserData] = useState(null);
    const route = useRoute();
    const {userID} = route.params;

    useEffect(() => {
      console.log(userID);
    }, []);


    const onLogoutPressed = () => {
        navigation.navigate('Login')
      };
    
    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/users/${userID}`);
        const data = await response.json();
        setUserData(data);
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
