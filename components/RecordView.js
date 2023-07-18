import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Modal } from "react-native";

function RecordView({ records, handledelPrompt, filteredRecords, searchQuery }) {
  const filteredRecord = records.filter(record => record.lapName);
  if (searchQuery === ''){
    filteredRecords = filteredRecord;}
  const delpress = (record) => {
    handledelPrompt(record);};
  
  return (
    <ScrollView contentContainerStyle={styles.recordlist}>
      {filteredRecords.map((record, index) => (
        <TouchableOpacity key={index} onPress={() => delpress(record)}>
          <View style={[styles.resultItem, index % 2 === 0 ? styles.evenItem : styles.oddItem]}>
            <Text style={styles.resultItemText}>{record.lapName}</Text>
            <Text style={styles.resultItemText}>{record.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recordlist: {
    paddingTop: 42,
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
  evenItem: {
    backgroundColor: "#ffffff",
    borderColor: "#ebebeb",
  },
  oddItem: {
    backgroundColor: "#f2f2f2",
    borderColor: "#ebebeb",
  },
  resultItemText: {
    color: "#000",
  },
});

export default RecordView;
