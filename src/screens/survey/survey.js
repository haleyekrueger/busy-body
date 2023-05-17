import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {userID} from '../login';
import {useRoute} from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';


const Survey = () => {

    const route = useRoute();
    const {userID} = route.params;
    console.log(userID)

    useEffect(() => {
      console.log(userID);
    }, []);

    const navigation=useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('TabNavigation', {screen: 'WorkoutNavigation', userID: userID})
      };
      
    
    return(
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text>Fill out the survey then press submit to access your workout plan</Text>
            <CustomButton 
            text="Submit" 
            onPress={onSubmitPressed}
            type='SECONDARY'
            />


        </View>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 40,
      backgroundColor: "white",
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      height: 100,
      marginBottom: 5,
    },
});

export default Survey 