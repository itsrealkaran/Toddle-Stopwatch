import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// we will deal with buttons here

function Control({ isRunning, handleLeftButtonPress, handleRightButtonPress }) {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: isRunning ? "#F9F9F9" : "#F2F2F2" },
        ]}
        onPress={handleLeftButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: isRunning ? "#000000" : "#B0B0B0" }}>
            {isRunning ? "Lap" : "Reset"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: isRunning ? "#D33852" : "#2EAA8B" },
        ]}
        onPress={handleRightButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: isRunning ? "#ffffff" : "#ffffff" }}>
            {isRunning ? "Stop" : "Start"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const CENTER = {
  justifyContent: "center",
  alignItems: "center",
};

const styles = StyleSheet.create({
  controlButtonBorder: {
    ...CENTER,
    width: 96,
    height: 96,
    borderRadius: 70,
  },
  controlButton: {
    ...CENTER,
    width: 96,
    height: 96,
    borderRadius: 65,
    borderColor: "#EBEBEB",
    borderWidth: 1,
  },
});

export default React.memo(Control);
