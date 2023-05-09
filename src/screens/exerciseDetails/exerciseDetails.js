import React from 'react';
import { View, Text } from 'react-native';


const ExerciseDetails = ({ route }) => {
  const {exercise} = route.params;

  return(
    <View>
      <Text>{exercise.instructions}</Text>
    </View>
  )
};

export default ExerciseDetails;
