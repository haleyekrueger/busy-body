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
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 3,
       },
    input: {
        backgroundColor: 'white',
        height: 40
    },
})
export default customInput;
