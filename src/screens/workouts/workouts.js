import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import styles from '../../customStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
};

const exercises_example = [
  { name: 'Bicep Curl', sets: 3, reps: 12, instructions: 'bicep curl instructions..'},
  { name: 'Squat', sets: 3, reps: 12, instructions: 'squat instructions..' },
  { name: 'Pull Up', sets: 3, reps: 12, instructions: 'pull up instructions...' },
  { name: 'Deadlift', sets: 3, reps: 12, instructions: 'deadlift instructions...' },
  { name: 'Barbell Row', sets: 3, reps: 12, instructions: 'barbell row instructions..' },
  { name: 'Tricep Pushdown', sets: 3, reps: 12, instructions: 'tricep pushdown instructions...' },
];

const WorkoutScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { userID, user, users } = route.params;

  const frequency = 3;

  // Create a list for the whole week. Each day will be added as a list of exercises
  // to the weeklyExercises list 
  const weeklyExercises = [];

  const exercisesPerDay = Math.floor(exercises_example.length / frequency);

  // add remainder to the last day 
  const exercisesLeft = exercises_example.length % frequency;

  // create a list for each day 
  for (let i = 0; i < frequency; i ++) {
    const dailyExercises = [];
    
    for (let j = 0; j < exercisesPerDay; j++) {
      const exerciseIndex = i * exercisesPerDay + j;
      dailyExercises.push(exercises_example[exerciseIndex]);
    }

    // if we have exercises left over
    if (i === frequency - 1 && exercisesLeft > 0) {
      const startingIndex = exercises_example.length - exercisesLeft;
      // adding the reamining exercises to the last day 
      dailyExercises.push(...exercises_example.slice(startingIndex));
    }

  weeklyExercises.push(dailyExercises)

  }

  const onViewPressed = (exercise_list) => {

    navigation.navigate('ExerciseDetails', {exercise_list, user, userID});
  };

  // map through the weekly workouts to display each day
  // click on a workout to navigate to exercise info screen
  return (
    <LinearGradient style={styles.container}
    colors={[
      '#E4B9FF',
      '#DA9EFF',
      '#C86DFF',
      '#B455FF',
      '#A055FF',
      '#9655FF',
      '#7755FF',
      '#7755FF',
      '#6355FF',
    ]}
    start={{x: 0, y: 0}}
    end={{x: .85, y: .75}}
    locations={[.03, .09, .25, .38, .49, .59, .7, .8, .95]}
  >

   
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.root}>
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.largerTextLeft2}>You have {frequency} workouts this week. Click 
        a day below to view the workout for that day.
        </Text>
        
        {weeklyExercises.map((exercise_list, index) => (
        <View key={`day-${index}`} style={styles.blurContainer3}>
        <BlurView intensity={30} tint='light' style={styles.blurView3}>
          <View key={index} >
          <CustomButton
            text= {`Day ${index + 1}`} 
            key={index}
            onPress={() => onViewPressed(exercise_list)}
            type="PRIMARY"
          />
          </View>
        </BlurView>
        </View>
        ))}
        </View>
      </ScrollView>
  
    </LinearGradient>

  );
};


export default WorkoutScreen;