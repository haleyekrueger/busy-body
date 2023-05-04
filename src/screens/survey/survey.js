import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';

import CustomButton from '../../components/CustomButton';


const Survey = () => {
    const navigation=useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('Submit')
      };

    return(
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
    
            <CustomButton 
            text="Submit" 
            onPress={onSubmitPressed}
            type='SECONDARY'
            />


        </View>
        </ScrollView>
    )
};

export default Survey 