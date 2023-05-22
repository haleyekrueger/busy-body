import React, { useEffect, useState } from 'react';
import GetExercises from '../../getExercises';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import _ from 'lodash';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

// exercises need to be fetched only once then stored in database
// need to add an if statement to check if the user already has exercises and if
// they don't, fetch with the following
// if they do, need to get exercises from the database to display

const ExerciseList = () => {
  // Navigate to the exericse details screen to display the instructions
  // for the exercise when View is pressed 
  const navigation = useNavigation();
  const onViewPressed = (exercise) => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  // use useRoute to access the passed parameters from the navigation screen
  const route = useRoute();
  const {userID, bodyType, experienceLevel} = route.params;
  console.log("Printing from line 17 viewWorkouts. Experience level:", experienceLevel);
  console.log("Printing from line 18 viewWorkouts. Body type:", bodyType);

  // muscle groups for each workout
  const muscleGroups = ['quadriceps', 'glutes', 'middle_back', 'chest', 'shoulders', 'triceps', 'biceps'];

  // 
  const [isLoading, setIsLoading] = useState(true);

  // for saving the exercises that are fetched from the API
  const [exercises, setExercises] = useState([]);

  // create exerciseDays array based on the user's response from the survey
  // beginner vs intermediate vs advanced
  const [exerciseDays, setExerciseDays] = useState([]);

  console.log("Printing experience level from line 38", experienceLevel)
  
  useEffect(() => { 
    let days;
  
    if (experienceLevel === 'Beginner') {
      days = ['Monday', 'Wednesday', 'Friday'];
    }
    else if (experienceLevel === 'Intermediate') {
      days = ['Monday', 'Tuesday', 'Thursday', 'Friday'];
    }
    else if (experienceLevel === 'Advanced'){
      days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }
    else {
      console.warn("error")
    }

    setExerciseDays(days)
    console.log(exerciseDays)

}, []);



  // add if statement here with the beginner, intermediate, and advanced
  // also need to save the reps/sets for each
  // could do different muscleGroups for different people
  // maybe add cardio on some days for people wanting to lose weight? (mesomorph?)

  // fetch exercises for each day and for each muscle group 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const promises = exerciseDays.map((day) => {
          const muscleGroupExercises = muscleGroups.map((muscleGroup) =>
            GetExercises(muscleGroup)
          );
          return Promise.all(muscleGroupExercises).then((results) => results.flat());
        });
        const exerciseData = await Promise.all(promises);
        setExercises(exerciseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const getRandomExerciseFromGroup = (exercises, muscleGroup) => {
    const groupExercises = exercises.filter((exercise) => exercise.muscle === muscleGroup);
    return _.sample(groupExercises);
  };

  // display the exercises for each day 
  return (
    <View style={styles.root}>
      {exerciseDays.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
   
    <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
      
        {exerciseDays.map((day, index) => {
          const dayExercises = exercises[index] || [];

        return (
          <View key={`${day}-${index}`} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Exercise Day: {day}</Text>
            {muscleGroups.map((muscleGroup) => {
              const exercise = getRandomExerciseFromGroup(dayExercises, muscleGroup);
              if (exercise) {
                return (
                  <CustomButton
                    key={exercise.id}
                    text={exercise.name}
                    onPress={() => onViewPressed(exercise)}
                    type="TERTIARY"
                  />
                );
              } else {
                return null;
              }
            })}
          </View>
        );
          })} 
    </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ExerciseList;

