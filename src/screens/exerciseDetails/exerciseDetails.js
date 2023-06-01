import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CheckBox, Card } from 'react-native-elements';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';



//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a
//           https://reactnative.dev/docs/alert
//           https://reactnativeelements.com/docs/components/divider
//           https://stackoverflow.com/questions/48590924/align-close-button-on-top-right-corner-of-imagebackground-react-native



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
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.root}>
        {exercise_list.map((exercise, index) => (
          <Card key={index} containerStyle={styles.card}>
            <Text style={styles.title}>{exercise.name}</Text>
            <Divider style={styles.divider} inset={true} insetType="right"/>
            <Text style={styles.text}>Sets: {exercise.sets}</Text>
            <Text style={styles.text}>Reps: {exercise.reps}</Text>
            <TouchableOpacity style={styles.instructions}
            onPress={() => onInstructionsPressed(exercise)}>
                <Text style={styles.text}>View Instructions</Text>
            </TouchableOpacity>
              
            <View style={styles.checkbox}>
            <CheckBox 
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
            </View>
            
            <Feather 
                style={styles.editIcon}
                name="edit" 
                size={24} 
                color="white" 
                onPress={() => onEditPressed(exercise)}
            />
            
              <AntDesign 
                style={styles.deleteIcon}
                name="delete" 
                size={24} 
                color="white" 
                onPress={() => onDeletePressed(exercise)}
            />
            
          </Card>
          
        ))}
    
        </View>
        
      </ScrollView>
    <View style={styles.buttonContainer}>
    <CustomButton text="Save" onPress={onSavePressed} />
    </View>
  </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  root: {
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'left',
    justifyContent: 'left',
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    
  },
  divider: {
    backgroundColor: 'white',
    height: 1,
    marginBottom: 15,
    marginLeft: 10,
    width: '90%',
  },
  title: {
    textAlign: 'left',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    
  },
  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
    
  },
  card: {
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#B455FF',
    borderRadius: 10,
  },
  checkbox: {
    justifyContent: 'left'
  },
  editIcon: {
    position: 'absolute',
    left: 250,
    right: 0,
    top: 12,
    bottom: 0
    
  },
  deleteIcon: {
    position: 'absolute',
    left: 285,
    right: 0,
    top: 12,
    bottom: 0
    
  },

});


export default ExerciseDetails;
