import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const MyHeader = ({ activeButton, setActiveButton }) => {
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'timer' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('timer')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'timer' && styles.activeText,
            ]}
          >
            Timer
          </Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'records' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('records')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'records' && styles.activeText,
            ]}
          >
            Records
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#717171',
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#ffffff',
  },
  separator: {
    width: 2,
    backgroundColor: '#dbdbdb',
    marginHorizontal: 4,
    height: '65%',
  },
});

export default MyHeader;
