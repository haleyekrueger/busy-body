import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import styles from '../../customStyleSheet'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';


//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const ForgotPassword = () => {

    const [username, setUsername] = useState('');
    const navigation=useNavigation()

    const onSendPressed = () => {
      navigation.navigate('ResetPassword')
    };

    const onSignInPressed = () => {
      navigation.navigate('Login')
    };

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>FORGOT PASSWORD</Text>
            <Text style={styles.text}>Enter your username and click send to generate a code</Text>
   
            <CustomInput 
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />

            <CustomButton
            text="Send"
            onPress={onSendPressed}
            />

            <CustomButton
            text="Back to sign in"
            onPress={onSignInPressed}
            type="TERTIARY"
            />

        </View>
        </ScrollView>
        </SafeAreaView>
    )
    };


export default ForgotPassword;
