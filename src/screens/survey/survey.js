import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';

import CustomButton from '../../components/CustomButton';


const Survey = () => {
    const navigation=useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('TabNavigation', {screen: 'WorkoutNavigation'})
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