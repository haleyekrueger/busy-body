import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';


const Profile = () => {
    const navigation=useNavigation();

    const onLogoutPressed = () => {
        navigation.navigate('Login')
      };

    return(
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>

            <CustomButton 
            text="Log Out" 
            onPress={onLogoutPressed}
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


export default Profile;