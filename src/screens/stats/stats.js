import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import styles from '../../customStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import CustomButton from '../../components/CustomButton';


const config = {
    backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
  };

const Stats = () => {
    const navigation=useNavigation();
    const [userData, setUserData] = useState(null);
    const route = useRoute();
    const {userID} = route.params;
    useEffect(() => {
        console.log(userID);
      }, []);
  
      
      useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response1 = await fetch(`${config.backendUrl}/users/${userID}/exercises`,
          {
            method: 'GET'
          });
          const data1 = await response1.json();
          setUserData(data1);
          console.log(data1)
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
          <Text style={styles.title}>Statistics</Text>
          <View style={styles.blurContainer2}>
            <BlurView intensity={30} tint='light' style={styles.blurView2}>
       
          
            <Text style={styles.largerTextLeft}>Upper Body Count: 1</Text>
            <Text style={styles.largerTextLeft}>Lower Body Count: 1</Text>
            <Text style={styles.largerTextLeft}>Core Count: 0</Text>
          
          </BlurView>
          </View>
          <View style={styles.root}>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
    );
  
     
    };
  
  




export default Stats;