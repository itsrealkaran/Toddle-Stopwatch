import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from "react-native";
import { displayTime } from "./util";

function Result({ results, handleOpenPrompt}) {
  const handleRecordPress = (lap) => {
    handleOpenPrompt(lap);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {results.map((lap, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.resultItem,
            index % 2 === 0 ? styles.oddback : styles.evenback,
          ]}
          onPress={() => handleRecordPress(lap)}
        >
          <Text style={styles.resultItemText}>Lap {results.length - index}</Text>
          <Text style={styles.resultItemText}>{displayTime(lap)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
  },
  resultItemText: {
    color: "#000",
  },
  oddback: {
    backgroundColor: "#ffffff",
    borderColor: "#ebebeb",
  },
  evenback: {
    backgroundColor: "#f2f2f2",
    borderColor: "#ebebeb",
  },
});

export default React.memo(Result);
