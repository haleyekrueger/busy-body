import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomButton from '../../components/CustomButton';
import styles from '../../customStyleSheet'

const Survey = () => {
  // to get the userID passed from login screen
  const route = useRoute();
  const { userID } = route.params;

  // to set the checkboxes for survey answer
  const bodyTypeOptions = ['Ectomorph', 'Mesomorph', 'Endomorph'];
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const experienceLevelOptions = ['3', '4', '5'];
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);

  const handleSelectBodyType = (index) => {
    setSelectedBodyType(index);
  };

  const handleSelectExperienceLevel = (index) => {
    setSelectedExperienceLevel(index);
  };

  const navigation = useNavigation();

  // pass userID, selected body type, and selected experience level
  // to the rest of the screens

  // once database updated, can save the experience level and body type
  // and just pass the userID to access the other information in another screen
  const onSubmitPressed = () => {
    navigation.navigate('TabNavigation', {
      screen: 'WorkoutNavigation',
      userID: userID,
      bodyType: bodyTypeOptions[selectedBodyType],
      experienceLevel: experienceLevelOptions[selectedExperienceLevel]
     });
    
  };


  return (
  <SafeAreaView style ={styles.container}>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.subtitle}>CUSTOMIZE YOUR PLAN</Text>
        <Text style={styles.largerText}>Select your body type:</Text>
        <CustomRadioButton
          options={bodyTypeOptions}
          selectedOption={selectedBodyType}
          onSelect={handleSelectBodyType}
        />

        <Text style={styles.largerText}>Select the number of days you would like to work out each week:</Text>
        <CustomRadioButton
          options={experienceLevelOptions}
          selectedOption={selectedExperienceLevel}
          onSelect={handleSelectExperienceLevel}
        />

        <CustomButton text="Submit" onPress={onSubmitPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};


export default Survey;
