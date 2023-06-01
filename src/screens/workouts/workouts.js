import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const config = {
  backendUrl: 'https://busy-body-386417.wn.r.appspot.com',
};

const exercises_example = [
  { name: 'Bicep Curl', sets: 3, reps: 12, instructions: 'bicep curl instructions...' },
  { name: 'Squat', sets: 3, reps: 12, instructions: 'squat instructions..' },
  { name: 'Pull Up', sets: 3, reps: 12, instructions: 'pull up instructions...' },
  { name: 'Deadlift', sets: 3, reps: 12, instructions: 'deadlift instructions...' },
  { name: 'Barbell Row', sets: 3, reps: 12, instructions: 'barbell row instructions..' },
  { name: 'Tricep Pushdown', sets: 3, reps: 12, instructions: 'tricep pushdown instructions...' },
];


// take the list of exercises and divide by number of days necessary
// based on frequency from the survey 
// once this works can go back and make separate functions to add the days
// of the week


const WorkoutScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { users, user, userID } = route.params;
  // console.log(users.length);
  // console.log(user);
  // console.log(userID);
 
  // if user frequency is 3: monday, wed, friday workouts
  // if user frequency is 4: monday, tuesday, thursday, friday workouts
  // if user frequency is 5: monday-friday workouts 

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
      // console.log("INDEX", exerciseIndex)
      // console.log("EXERCISE", exercises_example[exerciseIndex])
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
    navigation.navigate('ExerciseDetails', {exercise_list, user});
  };

  // map through the weekly workouts to display each day
  // click on a workout to navigate to exercise info screen
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text> You have {frequency} workouts this week. Click 
        a day below to view the workout for that day.
        </Text>
        
        {weeklyExercises.map((exercise_list, index) => (
          <View key={index}>
          <CustomButton
            text= {`Day ${index + 1}`} 
            key={index}
            onPress={() => onViewPressed(exercise_list)}
            type="TERTIARY"
          />
          </View>
        
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
    marginBottom: 5,
  },
});

export default WorkoutScreen;
