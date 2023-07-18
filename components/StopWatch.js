import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import Result from "./Result";
import Control from "./Control";
import { displayTime } from "./util";
import MyHeader from "./Header";
import RecordView from "./RecordView";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [records, setRecords] = useState([]);
  const [activeButton, setActiveButton] = useState('timer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLap, setSelectedLap] = useState(null);
  const [lapName, setLapName] = useState('');
  const [selectedLapTime, setSelectedLapTime] = useState('');
  const [isSavePromptVisible, setSavePromptVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState([]);


  const timer = useRef(null);

  const handleLeftButtonPress = useCallback(() => {
    if (isRunning) {
      setResults((previousResults) => [time, ...previousResults]);
    } else {
      setResults([]);
      setTime(0);
    }
  }, [isRunning, time]);

  const handleRightButtonPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);

      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }

    setRunning((previousState) => !previousState);
  }, [isRunning]);

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  
    const filtered = records.filter((record) =>
      record.lapName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const handleSaveLapPrompt = (lap) => {
    setSelectedLap(lap);
  };

  const handleOpenPrompt = (lap) => {
    handleSaveLapPrompt(lap);
    setLapName('');
    setSelectedLapTime(displayTime(lap));
  };

  const handledelPrompt = (record) => {
    setShowDeletePrompt(true);
    setSelectedRecord(record);
    setLapName(record.lapName);
  };
  

  const handleSaveLap = () => {
    if (lapName.trim() !== '') {
      setSelectedLapTime(displayTime(selectedLap));
      setSavePromptVisible(true);
    }
  };

  const handleCancelPrompt = () => {
    setSelectedLap(null);
    setLapName('');
  };

  const handleSavePrompt = (shouldSave) => {
    if (shouldSave) {
      setRecords((previousRecords) => [
        { lapName: lapName, time: selectedLapTime },
        ...previousRecords,
      ]);
    }
    setSelectedLap(null);
    setLapName('');
    setSavePromptVisible(false);
  };

  const renderSearchIcon = () => {
    return (
      <AntDesign name="search1" size={22} color="#717171" style={styles.searchIcon} />
    );
  };

  const handleDeletePrompt = () => {
    setShowDeletePrompt(true);
  };
  
  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
  };

  const handleDelete = () => {
    if (selectedRecord) {
      const updatedRecords = records.filter((record) => record !== selectedRecord);
      setRecords(updatedRecords);
      setSelectedRecord(null);
      setShowDeletePrompt(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader activeButton={activeButton} setActiveButton={handleButtonPress} />
      <StatusBar style="light" />

      <View style={styles.display}>
        <Text style={styles.displayText}>{displayTime(time)}</Text>
      </View>

      <View style={styles.control}>
        <Control
          isRunning={isRunning}
          handleLeftButtonPress={handleLeftButtonPress}
          handleRightButtonPress={handleRightButtonPress}
        />
      </View>

      {activeButton === 'timer' ? (
        <View style={styles.result}>
          <Result results={results} handleOpenPrompt={handleOpenPrompt} />
        </View>
      ) : (
        <View style={styles.overlay}>
          <MyHeader activeButton={activeButton} setActiveButton={handleButtonPress} />
          <View style={styles.records}>
            <View style={styles.searchContainer}>
              {renderSearchIcon()}
              <TextInput
                style={styles.searchInput}
                placeholder="Search Records"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            <RecordView records={records} selectedLapTime={selectedLapTime} searchQuery={searchQuery} handledelPrompt={handledelPrompt} filteredRecords={filteredRecords} handleDeletePrompt={handleDeletePrompt}/>
          </View>
        </View>
      )}

      {isSavePromptVisible && (
        <View style={styles.savecontainer}>
        <View style={styles.popup}>
          <View style={styles.separator} />
          <Text style={styles.promptText}>Save {lapName} in records?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#008392" }]} onPress={() => handleSavePrompt(true)}>
              <Text style={[styles.buttonText, {color: "#ffffff"}]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderColor:'#ebebeb', borderWidth: 1}]} onPress={() => handleSavePrompt(false)}>
              <Text style={[styles.buttonText, {color: "#717171"}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )}

      {selectedLap && !isSavePromptVisible && (
      <View style={styles.savecontainer}>
        <View style={styles.namecontainer}>
        <View style={styles.npromptContainer}>
          <View style={styles.firstSection}>
            <Text style={styles.npromptText}>Title record</Text>
            <TouchableOpacity onPress={handleCancelPrompt} style={styles.cancelIcon}>
              <AntDesign name="close" size={20} color="#222222" />
            </TouchableOpacity>
          </View>
          <View style={styles.secondSection}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter lap name"
              onChangeText={setLapName}
              value={lapName}
            />
          </View>
          <View style={styles.thirdSection}>
            <TouchableOpacity style={styles.nbutton} onPress={handleCancelPrompt}>
              <Text style={[styles.nbuttonText, {color: "#717171",}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nbutton} onPress={handleSaveLap}>
              <Text style={[styles.nbuttonText, {color: "#008392",}]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
      )}
      
      {showDeletePrompt && (
        <View style={styles.savecontainer}>
        <View style={styles.namecontainer}>
        <View style={styles.npromptContainer}>
          <View style={styles.firstSection}>
            <Text style={styles.npromptText}>Delete</Text>
            <TouchableOpacity onPress={handleCancelDelete} style={styles.cancelIcon}>
              <AntDesign name="close" size={20} color="#222222" />
            </TouchableOpacity>
          </View>
          <View style={styles.secondSection}>
            <Text style={styles.context}>Are you sure you want to delete {lapName} from records?</Text>
          </View>
          <View style={styles.thirdSection}>
            <TouchableOpacity style={styles.nbutton} onPress={handleCancelDelete}>
              <Text style={[styles.nbuttonText, {color: "#717171",}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nbutton} onPress={handleDelete}>
              <Text style={[styles.nbuttonText, {color: "#D33852",}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Constants.statusBarHeight,
  },
  display: {
    flex: 1 / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 56,
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : null,
  },
  control: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  result: {
    flex: 4 / 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Constants.statusBarHeight,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 43,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#000000",
  },
  records: {
    flex: 1,
    marginTop: 16,
  },
  namecontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  npromptContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "85%",
  },
  firstSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    paddingLeft: 24,
    paddingVertical: 16,
  },
  npromptText: {
    color: "#222222",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    paddingVertical: 6,
    width: "78%",
  },
  cancelIcon: {
    paddingLeft: 29,
    paddingVertical: 13,
    paddingRight: 13,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
  },
  thirdSection: {
    flexDirection: "row",
    paddingVertical: 32,
    justifyContent: "flex-end",

  },
  nbutton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24, 
  },
  nbuttonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  savecontainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#000000bf", 
  zIndex: 9999,
  },
  popup: {
    //flex: 1,
    height:228,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 228,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  separator: {
    marginTop: 16,
    height: 4,
    width: "12%",
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
  },
  promptText: {
    marginTop: 24,
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    width:"100%",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 22,
    width: "100%",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 11,
    borderRadius: 8,
    justifyContent: "space-around",
    marginBottom: 24,

  },
  buttonText: {
    fontSize: 16,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 24,
  },
  context: {
    fontSize:16,
    fontWeight: 500,
    lineHeight: 24,
    paddingHorizontal: 24,
  },
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