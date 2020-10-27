import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Switch } from "react-native";
import { ThemeContext, themes } from "../../theme-context";
import Button from "../components/button";




const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [newTheme, toggleTheme] = useState(themes.light);
  const [isEnabled, setIsEnabled] = useState(false);

  /**@description Toggle the theme of calculator */

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    toggleTheme(newTheme === themes.light ? themes.dark : themes.light);
  };

  /**@description Handle the operations on button click 
   * @param type of button clicked
  */

  const handleClick = (type) => {
    if (type === 'C') {
      return resetAll();
    }
    if (type === '%' || type === '/' || type === '*' || type === '-' || type === '+') {
      if (!num1) {
        return;
      }
      else {
        setOperation(type)
        return handleOperation(type);
      }
    }
    if (type === "=") {
      return calResult()
    }
    if (type === 'DEL') {
      if (result) {
        return resetAll()
      }

      if (!num2) {
        return setNum1(num1.slice(0, -1))
      }
      else {
        return setNum2(num2.slice(0, -1))
      }

    }
    if (type === ".") {
      if (!num2) {
        if (num1.indexOf(type) === -1) {
          return setNum1(num1 + type)
        }
      }
      else {
        if (num2.indexOf(type) === -1) {
          return setNum2(num2 + type)
        }
      }
    }
    else {
      if (!num2 && !operation) {
        return setNum1(`${num1}${type}`)
      }
      else {
        return setNum2(`${num2}${type}`)
      }
    }

  }

  const resetAll = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setOperation("");
  }
  const handleOperation = (type) => {

  }
  const calResult = () => {
    const result = eval(`${num1}${operation}${num2}`);
    setResult(result);
  }
  const buttons = ['C', '+/-', '%', 'DEL', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
  return (
    <View style={[styles.container, { backgroundColor: newTheme.background }]}>
      <ThemeContext.Provider value={newTheme}>
        <Text style={[styles.title, { color: newTheme.color }]}>Calculator</Text>
        <View style={[styles.input, { borderColor: newTheme.color }]}>
          <Text style={[styles.text, { color: newTheme.color }]} numberOfLines={1} ellipsizeMode={'head'}>
            {result ? result : operation && num1 ? `${num1}${operation}${num2}` : num1 ? num1 : 0}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "black" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ fontSize: 14, color: newTheme.color }}>Switch to dark theme</Text>
        </View>
        <View style={styles.numContainer}>
          {buttons.map((item, index) => {
            return (<Button
              text={item}
              style={{ marginTop: 5 }}
              onclick={() => handleClick(item)}
            />)
          })}
        </View>
      </ThemeContext.Provider>
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
    justifyContent: 'space-between',
    marginTop: 10
  },
  text: {
    color: "white",
    fontSize: 28,
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

export default Calculator;
