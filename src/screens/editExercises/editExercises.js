import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import styles from '../../customStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from "react-native-picker-select";
import CustomButton from '../../components/CustomButton/CustomButton';



//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a

const EditExercises = () => {

  const route = useRoute();
  
  const {exercise, exercise_list} = route.params;


  const handleSetsChange = (index, value) => {
  const updatedExerciseList = [...exercise_list];
  updatedExerciseList[index].sets = value;
  setExerciseList(updatedExerciseList);
   
     console.log(exercise_list)
   };


  return(
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
      <SafeAreaView >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.root}>
      <Text style={styles.title}>{exercise.name}</Text>

      <View style={styles.blurContainer4}>
          <BlurView intensity={30} tint='light' style={styles.blurView4}>
            
            <Text style={styles.title}>
              Edit
            </Text>


            <RNPickerSelect
                    placeholder= {{
                        label: 'Update Sets'
                      }}
                    onValueChange={(value) => handleSetsChange(index, value)}
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
                        color: 'white',
                        textAlign: 'center',
                        alignItems: 'center',
                        fontSize: 18,
                      },
                      inputIOS: {
                  
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'white',
                        alignItems: 'center',
                     
                      },
              
                    }}
                   
                />
               
         
            

                <Text style={styles.textCenter}>Edit Reps:</Text>
                {<View style={styles.picker}>
                    <RNPickerSelect
                    placeholder= {{
                        label: 'Update Reps'
                      }}
                      
                    onValueChange={handleSetsChange}
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
                        color: 'white',
                        textAlign: 'center',
                        alignItems: 'center',
                        fontSize: 18,
                      },
                      inputIOS: {
  
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop: 10,
                        textAlign: 'center',
                        color: 'white',
                        alignItems: 'center',
                      },
              
                    }}
                />
                </View>}
            
          
                <CustomButton 
                  text="Save" />
                  {/* // onPress={} /> */}
                  
           









          
          </BlurView>
      </View>
      </View>

      </ScrollView>
      </SafeAreaView>
    </LinearGradient>

  
    )
  
    };
export default EditExercises;
