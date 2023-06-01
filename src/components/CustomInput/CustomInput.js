import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

// resources: https://stackoverflow.com/questions/40628114/react-native-cannot-write-first-letter-with-noncapital


const customInput = ({value, setValue, placeholder, error, onFocus = () => {}, secureTextEntry}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
                
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor='#858585'
                style={styles.input}
                secureTextEntry={secureTextEntry}
                onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
            />
    
        
        {error && (
        <Text style={{ color: 'red', fontSize: 12}}>
        {error}
        </Text>
        )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        width: '80%',

        borderColor: 'rgba(181, 181, 181, 0.05)',
        borderWidth: 1,
        borderRadius: 5,

        padding: 5,
        marginVertical: 10,

        
       },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        fontWeight: 'bold',
        height: 30,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#2b2b2b',
    },
})
export default customInput;
