import React, { useEffect, useState } from 'react';
import GetExercises from '../../getExercises';
import { View, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/core';
import ExerciseDetails from '../exerciseDetails'

const ExerciseList = () => {

  const navigation = useNavigation();
  const onViewPressed = (exercise) => {
    navigation.navigate('ExerciseDetails', { exercise })
  };

  const [exercises, setExercises] = useState([]);

  const [muscleGroups, setMuscleGroups] = useState(['chest', 'shoulders', 'triceps']);

  useEffect(() => {
    const FetchExercises = async () => {
      try {
      const promises = muscleGroups.map((muscleGroup) => GetExercises(muscleGroup));
      const exerciseData = await Promise.all(promises);
      const filteredData = exerciseData
        .map((data, index) => data.filter((exercises) => exercises.muscle === muscleGroups[index]))
        .map((data) => _.shuffle(data).slice(0,2));
        setExercises(filteredData.flat());
      } catch(error) {
        console.error(error);
      }
    }
    FetchExercises();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise) => (
          <View key={exercise.id}>
            <CustomButton 
              text={exercise.name} 
              onPress={() => onViewPressed(exercise)}
              type="TERTIARY"/>
          </View>
        ))}
    </ScrollView>
  );
}

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

export default ExerciseList;