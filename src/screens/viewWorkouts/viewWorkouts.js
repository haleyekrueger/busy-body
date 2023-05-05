//Resources: 
// https://programmingwithmosh.com/react-native/make-api-calls-in-react-native-using-fetch/
// https://reactnative.dev/docs/network?language=javascript
// https://www.freecodecamp.org/news/react-native-networking-api-requests-using-fetchapi/

import React, { useEffect, useState } from 'react';
import GetExercises from '../../getExercises';
import { Text, View } from 'react-native';


const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const FetchExercises = async () => {
        try{
            const exerciseData = await GetExercises();
            setExercises(exerciseData);
        } catch(error) {
            console.error(error);
        }
    }
        FetchExercises();

    }, []);

    return (
        <View>      
          {exercises.map((exercise) => (
            <View key={exercise.id}>
              <Text>{exercise.name}</Text>
              <Text>{exercise.instructions}</Text>
              
            </View>
          ))}
        </View>
      );
    }

export default ExerciseList;