import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomRadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioButton}
          onPress={() => onSelect(index)}
        >
          <View
            style={[
              styles.radioButtonCircle,
              { borderColor: selectedOption === index ? '#000' : '#ccc' },
            ]}
          >
            {selectedOption === index && (
              <View style={styles.radioButtonInnerCircle} />
            )}
          </View>
          <Text style={styles.radioButtonLabel}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    fontSize: 15,
  },
});

export default CustomRadioButton;
