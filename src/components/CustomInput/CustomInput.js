import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';


const customInput = ({value, setValue, placeholder, error, onFocus = () => {}, secureTextEntry}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
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

        paddingHorizontal: 10,
        marginVertical: 6,

        
       },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
       
        height: 30,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#7755FF',
    },
})
export default customInput;
