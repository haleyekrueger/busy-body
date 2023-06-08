import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import styles from '../../customStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import CustomButton from '../../components/CustomButton';



const config = {
  backendUrl: 'https://busy-body-final.uw.r.appspot.com',
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

    return
     <Text>Hang tight...</Text>;

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

  <SafeAreaView style ={styles.container}>  
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.blurContainer2}>
          <BlurView intensity={30} tint='light' style={styles.blurView2}>
     
        
          <Text style={styles.largerTextLeft}>Username: {userData.username}</Text>
          <Text style={styles.largerTextLeft}>Age: {userData.age}</Text>
          <Text style={styles.largerTextLeft}>Body Type: {userData.body_type}</Text>
        
        </BlurView>
        </View>
        <View style={styles.root}>
        <CustomButton
          text="Log Out"
          onPress={onLogoutPressed}
          type="PRIMARY"
        />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  </LinearGradient>
  );

   
  };


export default Profile;
