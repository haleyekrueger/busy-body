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
    
        padding: 10,
        alignItems: 'center',
      
      
    },

    container_PRIMARY: {
        backgroundColor: 'transparent',
 
        marginBottom: 50,
    },

    container_SECONDARY: {
        borderColor: '#7755FF',
        borderWidth: 2,
    },

    container_TERTIARY: {
        
    },

    text_PRIMARY: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',

    },

    text_SECONDARY: {
        color: 'white',
        fontWeight: 'bold'
    },

    text_TERTIARY: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        
    },

  
})

export default CustomButton;
