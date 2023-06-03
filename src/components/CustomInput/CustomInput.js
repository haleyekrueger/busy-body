import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';

// resources: https://stackoverflow.com/questions/40628114/react-native-cannot-write-first-letter-with-noncapital
//            https://docs.expo.dev/versions/latest/sdk/blur-view/
//            https://mui.com/joy-ui/react-textarea/
const customInput = ({value, setValue, placeholder, error, secureTextEntry}) => {

    return (
        <View style={styles.blurContainer}>
          <BlurView intensity={55} tint='light' style={styles.blurView}>
            <View style={styles.inputContainer}>
            <TextInput
              value={value}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={setValue}
              placeholder={placeholder}
              placeholderTextColor='#7755FF'
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
            </View>
          </BlurView>
          {error && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {error}
            </Text>
          )}
        </View>
      );
    };
    

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        width: '75%',
        padding: 5,
        marginVertical: 10,
  
        backgroundColor: 'transparent',
       },

    blurView: {
        height: 40,
        borderRadius: 20,
        overflow: "hidden", 
        

    },
    inputContainer: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    
    },

    input: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontStyle: 'italic',
        color: '#2b2b2b',
        fontSize: 15
        
    },
})
export default customInput;
