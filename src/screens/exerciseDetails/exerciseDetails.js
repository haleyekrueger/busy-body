import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from '@react-native-async-storage/async-storage';





//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a
//           https://reactnative.dev/docs/alert
//           https://reactnativeelements.com/docs/components/divider
//           https://stackoverflow.com/questions/48590924/align-close-button-on-top-right-corner-of-imagebackground-react-native
//           https://blog.logrocket.com/creating-a-pop-up-modal-in-react-native/
//           https://www.youtube.com/watch?v=rWfhwW9forg



const ExerciseDetails = () => {

  // Get exercise list and user info that has been passed from
  // previous screen
  const route = useRoute();
  const {exercise_list, user, userID} = route.params;
 
  const navigation = useNavigation();

  // Navigate to instructions when "view instructions" is pressed
  const onInstructionsPressed = (exercise) => {
    navigation.navigate('ExerciseInstructions', {exercise})
  };


  // Modal for editing the sets and reps  
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // Makes sure each modal is for each individual exercise
  const [exerciseModals, setExerciseModals] = useState(
    exercise_list.map(() => false)
  );

  const handleModal = (index) => {
    const updatedExerciseModals = [...exerciseModals];
    updatedExerciseModals[index] = !updatedExerciseModals[index];
    setExerciseModals(updatedExerciseModals);
    setIsModalVisible(!isModalVisible)
  }

  // functionality of editing sets and reps
  const [exerciseList, setExerciseList] = useState(exercise_list);

  // Update sets
   const handleSetsChange = (value, index) => {
     const updatedExerciseList = [...exerciseList];
     updatedExerciseList[index].sets = value;
     setExerciseList(updatedExerciseList)
   };

   // Udpate reps 
   const handleRepsChange = (value, index) => {
    const updatedExerciseList = [...exerciseList];
    updatedExerciseList[index].reps = value;
    setExerciseList(updatedExerciseList);
  };


  // Funcitonality for deleting an exercise from the list 
  const onDeletePressed = (exercise) => {
    console.log(exercise)
    Alert.alert('Delete', 'Are you sure you want to delete this exercise?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        
      },
      {text: 'Delete', onPress: () => console.log('Delete Pressed')},
    ]);

  };

  // Handling checking and unchecking the completed boxes 
  const [checkedExercise, setCheckedExercise] = useState(
    exercise_list.map(() => false)
  );

  const handleCheckbox = async (index) => {
    const newCheckedExercise = [...checkedExercise];
    newCheckedExercise[index] = !newCheckedExercise[index];
    setCheckedExercise(newCheckedExercise);
    try {
      await AsyncStorage.setItem('checkedExercises', JSON.stringify(newCheckedExercise));
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  // Storing checked/unchecked boxes:
  useEffect(() => {
    const loadCheckedExercises = async () => {
      try {
        const savedCheckedExercises = await AsyncStorage.getItem('checkedExercises');
        if (savedCheckedExercises) {
          setCheckedExercise(JSON.parse(savedCheckedExercises));
          console.log('Data loaded successfully!');
        }
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };
  
    loadCheckedExercises();
  }, []);

  // When saving exercises, saves which exercises have been marked as completed
  const onSavePressed = () => {
      const checkedExercisesList = exercise_list.filter((exercise, index) => checkedExercise[index]);
      // Do something with the checked exercises
      console.log("CHECKED EXERCISES", checkedExercisesList);
      navigation.navigate('Workouts', {checkedExercisesList});
    // this will send a CREATE request to Users api
  }

 

  // Screen display
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
    <SafeAreaView>

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.root}>
        {exercise_list.map((exercise, index) => (
          

          <View key={exercise.name} style={styles.blurContainer}>
          <BlurView intensity={30} tint='light' style={styles.blurView2}>


            <Text style={styles.title}>{exercise.name}</Text>
            <Divider style={styles.divider} inset={true} insetType="right"/>
            <Text style={styles.text2}>Sets: {exercise.sets}</Text>
            <Text style={styles.text2}>Reps: {exercise.reps}</Text>


            <TouchableOpacity style={styles.instructions}
            onPress={() => onInstructionsPressed(exercise)}>
                <Text style={styles.text}>View Instructions</Text>
            </TouchableOpacity>
              

            <View>

            <CheckBox 
              title="Completed"
              textStyle={{
                color: 'white',
                fontSize: 18,
              }}
              checked={checkedExercise[index]}
              containerStyle={styles.checkbox}
              onPress={() => handleCheckbox(index)}

              
                  checkedIcon={
                    <Ionicons 
                      name="checkbox-outline"
                      size={24}
                      color="white" 
                    />


                  }
                  uncheckedIcon={
                    <Ionicons 
                      name="square-outline"
                      size={24}
                      color="white" 
                    />
              }
            />
            </View>
            
          
               <Feather 
                style={styles.editIcon}
                name="edit" 
                size={22} 
                color="white" 
                onPress={() => handleModal(index)}
              />

              <View style={styles.modal}>
              <Modal isVisible={exerciseModals[index]}>
             
              <LinearGradient style={styles.modalContainer}
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
                  end={{x: .95, y: .98}}
                  locations={[.03, .09, .25, .4, .55, .7, .85, .9, .99]}> 


                  <View style={styles.modalContent}>
                  <Text style={styles.LargerText}>{exercise.name}</Text>
                  <Text style={styles.modalText}>Sets:</Text>
                  <View style={styles.picker}>
                    

                  <RNPickerSelect
                      placeholder= {{
                          label: 'Update Sets...'
                        }}
                      onValueChange={(value) => handleSetsChange(value, index)}
                      items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' },
                        { label: '6', value: '6' },
                        { label: '7', value: '7' },
                      ]}
                      style={{  
                      placeholder: {   
                        fontSize: 15,
                        marginTop: 5,
                        marginBottom: 5,
                        textAlign: 'center',
                        color: 'white',
                        alignItems: 'center',
                      },
                      inputIOS: {
                        fontSize: 15,
                        marginTop: 5,
                        marginBottom: 5,
                        textAlign: 'center',
                        color: 'white',
                        alignItems: 'center',
                      },
                    }}
                  />
                  </View>
              
            
                  <Text style={styles.modalText}>Reps:</Text>
                  {<View style={styles.picker}>
                
                      <RNPickerSelect
                      placeholder= {{
                          label: 'Update Reps...'
                        }}
                      onValueChange={(value) => handleRepsChange(value, index)}
                      items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' },
                        { label: '6', value: '6' },
                        { label: '7', value: '7' },
                        { label: '8', value: '8' },
                        { label: '9', value: '9' },
                        { label: '10', value: '10' },
                        { label: '11', value: '11' },
                        { label: '12', value: '12' },
                        { label: '13', value: '13' },
                        { label: '14', value: '14' },
                        { label: '15', value: '15' },
                        { label: '16', value: '16' },
                        { label: '17', value: '17' },
                        { label: '18', value: '18' },
                        { label: '19', value: '19' },
                        { label: '20', value: '20' },
                      ]}
                      style={{  
                        placeholder: {
                          fontSize: 15,
                          marginTop: 5,
                          marginBottom: 5,
                          textAlign: 'center',
                          color: 'white',
                          alignItems: 'center',
                        },
                        inputIOS: {                   
                          fontSize: 15,
                          marginTop: 5,
                          marginBottom: 5,
                          textAlign: 'center',
                          color: 'white',
                          alignItems: 'center',
                        },
                      }}
                  />
                  </View>
                  }

            
                <Divider style={styles.divider2} inset={true} insetType="center"/>
                
                <CustomButton 
                  text="Save"
                  onPress={() => handleModal(index)}
                />
                
                 </View>
                 </LinearGradient>
              </Modal>
           
              </View> 
              <AntDesign 
                style={styles.deleteIcon}
                name="delete" 
                size={22} 
                color="white" 
                onPress={() => onDeletePressed(exercise)}
            />
          </BlurView>
          </View>
      
          
        ))}
    
          </View>

          <View style={styles.buttonContainer}>
          <CustomButton
           text="Save"
           onPress={onSavePressed} />
          </View>

      </ScrollView>
    </SafeAreaView>


   
  </LinearGradient>
  );

};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  modalContainer: {
    borderRadius: 20,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: 10,
    marginLeft: 10,
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {  
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',  
  },

  blurContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },

  blurContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  blurView2: {
    borderRadius: 20,
    textAlign: "left",
    width: '90%',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    overflow: "hidden", 
  },

  blurView3: {
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: 'center',
    width: '90%',
    padding: 15,
    marginLeft: 16,
    marginBottom: 100,
    overflow: "hidden", 
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

  divider2: {
    backgroundColor: 'white',
    height: 1,
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 10,
    width: '80%',
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
    marginRight: 90,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 75,
  },

  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginLeft: 10,  
  },

  text2: {
    textAlign: 'left',
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },

  modalText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },

  textCenter: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },

  LargerText: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
 
  editIcon: {
    position: 'absolute',
    left: 250,
    right: 0,
    top: '13%',
    bottom: 0
  },

  deleteIcon: {
    position: 'absolute',
    left: 280,
    right: 0,
    top: '13%',
    bottom: 0 
  },

  checkbox: {
    flex: 1,
    width: '100%',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    textAlign: 'left',
    borderRadius: 20,
    justifyContent: 'left',
    marginLeft: 0,
   },

   picker: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    width: 150,
    height: 35,
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 6,
   
   },






});


export default ExerciseDetails;
