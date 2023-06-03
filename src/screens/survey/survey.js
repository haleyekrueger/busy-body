// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/core';
// import { useRoute } from '@react-navigation/native';
// import CustomRadioButton from '../../components/CustomRadioButton';
// import CustomButton from '../../components/CustomButton';
// import styles from '../../customStyleSheet'
// import PickerSelect from 'react-native-picker-select';

// const Survey = () => {
//   // to get the userID passed from login screen
//   const route = useRoute();
//   const { userID } = route.params;

//   // to set the checkboxes for survey answer
//   const bodyTypeOptions = ['Ectomorph', 'Mesomorph', 'Endomorph'];
//   const [selectedBodyType, setSelectedBodyType] = useState(null);

//   const experienceLevelOptions = ['3', '4', '5'];
//   const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);

//   const handleSelectBodyType = (index) => {
//     setSelectedBodyType(index);
//   };

//   const handleSelectExperienceLevel = (index) => {
//     setSelectedExperienceLevel(index);
//   };

//   const navigation = useNavigation();

//   // pass userID, selected body type, and selected experience level
//   // to the rest of the screens

//   // once database updated, can save the experience level and body type
//   // and just pass the userID to access the other information in another screen
//   const onSubmitPressed = () => {
//     navigation.navigate('TabNavigation', {
//       screen: 'WorkoutNavigation',
//       userID: userID,
//       bodyType: bodyTypeOptions[selectedBodyType],
//       experienceLevel: experienceLevelOptions[selectedExperienceLevel]
//      });
    
//   };
//   const [selectedValue, setSelectedValue] = useState(null);

//   const data = [
//     { label: '3', value: '3', key: '3' },
//     { label: '4', value: '4', key: '4' },
//     { label: '5', value: '5', key: '5' },
//   ];

//   return (
//   <SafeAreaView style ={styles.container}>

//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.root}>
//         <Text style={styles.subtitle}>CUSTOMIZE YOUR PLAN</Text>
//         <Text style={styles.largerText}>Select your body type:</Text>
//         <CustomRadioButton
//           options={bodyTypeOptions}
//           selectedOption={selectedBodyType}
//           onSelect={handleSelectBodyType}
//         />

//         <Text style={styles.largerText}>Select the number of days you would like to work out each week:</Text>
//         <CustomRadioButton
//           options={experienceLevelOptions}
//           selectedOption={selectedExperienceLevel}
//           onSelect={handleSelectExperienceLevel}
//         />

// <View style={newStyles.container}>
//     <PickerSelect
//       items={data}
//       onValueChange={(value) => setSelectedValue(value)}
//       placeholder="Select item"
//       value={selectedValue}
//     />
//     </View>  
//         <CustomButton text="Submit" onPress={onSubmitPressed} type="PRIMARY" />
//       </View>
//     </ScrollView>
//   </SafeAreaView>
//   );
// };

// const newStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dropdownContainer: {
//     width: 200,
//     height: 40,
//     backgroundColor: '#fafafa',
//   },

// });

// export default Survey;


import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomButton from '../../components/CustomButton';
import styles from '../../customStyleSheet';
import { LinearGradient } from 'expo-linear-gradient';


const Survey = () => {
  const route = useRoute();
  const { userID } = route.params;

  const bodyTypeOptions = ['Ectomorph', 'Mesomorph', 'Endomorph'];
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const experienceLevelOptions = ['3', '4', '5'];
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);

  const handleSelectBodyType = (index) => {
    setSelectedBodyType(index);
  };

  const handleSelectExperienceLevel = (index) => {
    setSelectedExperienceLevel(index);
  };

  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate('TabNavigation', {
      screen: 'WorkoutNavigation',
      userID: userID,
      bodyType: bodyTypeOptions[selectedBodyType],
      experienceLevel: experienceLevelOptions[selectedExperienceLevel]
    });
  };


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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.subtitle}>CUSTOMIZE YOUR PLAN</Text>
          <Text style={styles.largerText}>Select your body type:</Text>
          <CustomRadioButton
            options={bodyTypeOptions}
            selectedOption={selectedBodyType}
            onSelect={handleSelectBodyType}
          />

          <Text style={styles.largerText}>Select the number of days you would like to work out each week:</Text>
          <CustomRadioButton
            options={experienceLevelOptions}
            selectedOption={selectedExperienceLevel}
            onSelect={handleSelectExperienceLevel}
          />

    

          <CustomButton text="Submit" onPress={onSubmitPressed} type="PRIMARY" />
        </View>
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>
  );
};

const newStyles = StyleSheet.create({
  dropdownContainer: {
    width: 200,
    height: 50,
    marginTop: 10,
    index: 100,
    marginBottom: 20,
    alignSelf: 'center',
    position: 'absolute'
  },
});

export default Survey;
