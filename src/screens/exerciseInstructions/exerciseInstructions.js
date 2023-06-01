import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a

const ExerciseInstructions = () => {

  const route = useRoute();
  
  const {exercise} = route.params;
  
  return(
    <View>
      <Text>{exercise.instructions}</Text>
    </View>
    )

  };
export default ExerciseInstructions;
