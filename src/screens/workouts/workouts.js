import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';


const Workouts = () => {
    const route = useRoute();
    const {userID, experienceLevel } = route.params;
    const navigation=useNavigation();

    const onViewPressed = () => {
        navigation.navigate('WorkoutNavigation', {screen:'ViewWorkouts'})
      };

    const onEditPressed = () => {
      navigation.navigate('WorkoutNavigation', {screen:'EditWorkouts'})
      };

    return(
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>

            <CustomButton 
            text="View Workouts" 
            onPress={onViewPressed}
            type='SECONDARY'
            />

            <CustomButton 
            text="Edit Workouts" 
            onPress={onEditPressed}
            type='SECONDARY'
            />


        </View>
        </ScrollView>
    )
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


export default Workouts;