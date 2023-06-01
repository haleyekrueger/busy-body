import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert, useWindowDimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a
//           https://reactnative.dev/docs/alert


const ExerciseDetails = () => {

  const route = useRoute();

  const {exercise_list, user} = route.params;
  // console.log(exercise_list)
  // console.log(user.name)

  const navigation = useNavigation();

  const onInstructionsPressed = (exercise) => {
    navigation.navigate('ExerciseInstructions', {exercise})

  };

  const onEditPressed = (exercise) => {
    console.log(exercise)
   
  };

  const onDeletePressed = (exercise) => {
    Alert.alert('Delete', 'Are you sure you want to delete this exercise?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  };

 
  const onSavePressed = () => {
      const checkedExercisesList = exercise_list.filter((exercise, index) => checkedExercise[index]);
      // Do something with the checked exercises
      console.log("HERE!!!", checkedExercisesList);
      navigation.navigate('Workouts', {checkedExercisesList});
    // this will send a CREATE request to Users api
  }

  const [checkedExercise, setCheckedExercise] = useState(
    exercise_list.map(() => false)
  );

  const handleCheckbox = (index) => {
    const newCheckedExercise = [...checkedExercise];
    newCheckedExercise[index] = !newCheckedExercise[index];
    setCheckedExercise(newCheckedExercise);
  };

  // need to add an onlick to the instructions
  // add edit here as well and delete
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {exercise_list.map((exercise, index) => (
          <View key={index} style={styles.exercise}>
            <Text style={styles.title}>{exercise.name}</Text>
            <Text>Sets: {exercise.sets}</Text>
            <Text>Reps: {exercise.reps}</Text>
            <CustomButton
                text='instructions'
                // type='TERTIARY'
                onPress={() => onInstructionsPressed(exercise)}
            />
        
            <CheckBox style={styles.checkbox}
              title="Completed"
              checked={checkedExercise[index]}
              onPress={() => handleCheckbox(index)}
              checkedIcon={
                <Ionicons 
                  name="checkbox-outline"
                  size={24}
                  color="black" 
                />
              }
              uncheckedIcon={
                <Ionicons 
                  name="square-outline"
                  size={24}
                  color="black" 
                />
              }
            />
            
              <CustomButton
                text='edit'
                // type='TERTIARY'
                onPress={() => onEditPressed(exercise)}
            />
              <CustomButton
                text='delete'
                // type='TERTIARY'
                onPress={() => onDeletePressed(exercise)}
            />
            
          </View>
          
        ))}
      </ScrollView>
      <CustomButton text="Save" onPress={onSavePressed} />
    </View>
  );

};


const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    // backgroundColor: 'white',
  },
  title: {
  
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18

  },
  exercise: {
    padding: 20,
  },
  checkbox: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#a84cd9',
    borderRadius: 5,


  }

});


export default ExerciseDetails;
