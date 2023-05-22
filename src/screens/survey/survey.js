import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomButton from '../../components/CustomButton';

const Survey = () => {
  // to get the userID passed from login screen
  const route = useRoute();
  const { userID } = route.params;

  // to set the checkboxes for survey answer
  const bodyTypeOptions = ['Ectomorph', 'Mesomorph', 'Endomorph'];
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const experienceLevelOptions = ['Beginner', 'Intermediate', 'Advanced'];
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.heading}>Please fill out the survey then press submit to access your workout plan</Text>
        <Text style={styles.text}>Select your body type:</Text>
        <CustomRadioButton
          options={bodyTypeOptions}
          selectedOption={selectedBodyType}
          onSelect={handleSelectBodyType}
        />

        <Text style={styles.text}>Select your experience level:</Text>
        <CustomRadioButton
          options={experienceLevelOptions}
          selectedOption={selectedExperienceLevel}
          onSelect={handleSelectExperienceLevel}
        />

        <CustomButton text="Submit" onPress={onSubmitPressed} type="SECONDARY" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
  },
  text: {
   
    padding: 8,
    fontSize: 15
  },
  heading: {
    fontWeight: 'bold',
    padding: 8,
    fontSize: 18
  },
});

export default Survey;
