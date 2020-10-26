import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Switch } from "react-native";
import { ThemeContext, themes } from "../../theme-context";
import Button from "../components/button";
const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [newTheme, toggleTheme] = useState(themes.dark);
  const [isEnabled, setIsEnabled] = useState(false);

  const theme = useContext(ThemeContext);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    toggleTheme(newTheme === themes.dark ? themes.light : themes.dark);
  };
  return (
    <View style={[styles.container, { backgroundColor: newTheme.background }]}>
      <Text style={[styles.title, { color: newTheme.color }]}>Calculator</Text>
      <View style={[styles.input, { borderColor: newTheme.color }]}>
        <Text style={[styles.text, { color: newTheme.color }]}>
          {result ? result : operation ? `${num1}${operation}${num2}` : num1}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemeContext.Provider value={newTheme}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </ThemeContext.Provider>
      </View>
      <View style={styles.numContainer}>
        <View style={styles.numbers}>
          <Button
            text={"C"}
            style={{
              marginTop: 10,
            }}
          />
          <Button
            text={"C"}
            style={{
              marginTop: 10,
            }}
          />
          <Button
            text={"C"}
            style={{
              marginTop: 10,
            }}
          />
          <Button
            text={"C"}
            style={{
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 38,
  },
  input: {
    height: 180,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    marginTop: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  numContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  numbers: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  operations: {
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  text: {
    color: "white",
    fontSize: 28,
  },
});

export default Calculator;
