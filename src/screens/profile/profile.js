import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {userID} from '../survey';
import {useRoute} from '@react-navigation/native';
import styles from '../../customStyleSheet'

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
  <SafeAreaView style ={styles.container}>  
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.largerText}>Username: {userData.username}</Text>
        <Text style={styles.largerText}>Age: {userData.age}</Text>
        <Text style={styles.largerText}>Body Type: {userData.body_type}</Text>
        <CustomButton
          text="Log Out"
          onPress={onLogoutPressed}
          type="PRIMARY"
        />
      </View>
    </ScrollView>
  </SafeAreaView>
  );

   
  };


export default Profile;
