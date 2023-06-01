import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type="PRIMARY", bgColor, fgColor}) => {
    return (
        <Pressable 
        onPress={onPress} 
        style={[
            styles.container,
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {}

            ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>
                    {text}
            </Text>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {    
        width: '80%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5

    },

    container_PRIMARY: {
        marginVertical: 15,
        backgroundColor: '#7235a1',

    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },

    container_TERTIARY: {},

    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },

    text_SECONDARY: {
        color: 'white'
    },

    text_TERTIARY: {
        color: 'white',
        textAlign: 'center',
    },

  
})

export default CustomButton;
