import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import styles from '../../customStyleSheet'
import { LinearGradient } from 'expo-linear-gradient';


//resources: https://reactnative.dev/docs/checkbox.html
//           https://icons.expo.fyi/Ionicons/checkbox-outline
//           https://www.geeksforgeeks.org/create-a-card-view-in-react-native-using-react-native-paper/
//           https://medium.com/@athletecoder/avoid-usecontext-to-handle-your-global-state-in-react-c12454356e2a

const ExerciseInstructions = () => {

  const route = useRoute();
  
  const {exercise} = route.params;

  const sentences = exercise.instructions.split('.');
  
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
            {sentences.map((sentence, index) => (
            <Text 
              key={index}
              style={styles.textLeft}>
              {sentence}
            </Text>
            ))}
          </BlurView>
      </View>
      </View>

      </ScrollView>
      </SafeAreaView>
    </LinearGradient>

  
    )
  
    };
export default ExerciseInstructions;
