import React, {useState} from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../customStyleSheet'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

//resource: https://www.youtube.com/watch?v=ALnJLbjI7EY

const ResetPassword = () => {

  const navigation=useNavigation();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmitPressed = () => {
    console.warn('Submit pressed')
    };

  const onSignInPressed = () => {
  navigation.navigate("Login")
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>RESET PASSWORD</Text>

            <CustomInput 
            placeholder="Code"
            value={code}
            setValue={setCode}
            />

            <CustomInput 
            placeholder="Password"
            value={newPassword}
            setValue={setNewPassword}
            />  

            <CustomButton
            text="Submit"
            onPress={onSubmitPressed}
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

export default ResetPassword;
