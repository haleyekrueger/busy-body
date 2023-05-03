import React from 'react';
import { StyleSheet, SafeAreaView } from "react-native";
import StackNavigation from './src/navigation/loginNavigation';

const App = () => {
  return (
   
    <SafeAreaView style={styles.root}>
      <StackNavigation/>
    </SafeAreaView>
 
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App
