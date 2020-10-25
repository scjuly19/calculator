import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ThemeContext, themes } from "../../theme-context";
import Button from "../components/button";
const Calculator = () => {
  const numbers = [
    "C",
    "M",
    "%",
    "DEL",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [newTheme, toggleTheme] = useState(themes.dark);
  const handleChange = (text) => {
    if (text === "C") {
      return resetResult();
    }
    if (text === "M") {
    }
    if (text === "DEL") {
      return handleBackspace();
    }
    if (text === "+" || text === "-" || text === "/" || text === "*") {
      if (operation) {
        return;
      } else {
        return setOperation(text);
      }
    }
    if (text === "=") {
      calculate();
    }
    if (text === "M") {
      return toggleTheme(newTheme === themes.dark ? themes.light : themes.dark);
    } else {
      if (num1 && operation) {
        return setNum2(`${num2}${text}`);
      } else {
        return setNum1(`${num1}${text}`);
      }
    }
  };
  const handleBackspace = () => {
    if (result) {
      return resetResult();
    }
    if (operation) {
      return setNum2(num2.slice(0, -1));
    } else {
      return setNum1(num1.slice(0, -1));
    }
  };
  const resetResult = () => {
    setNum1("");
    setNum2("");
    setOperation("");
    setResult("");
  };
  const calculate = () => {
    try {
      setResult(eval(`${num1}${operation}${num2}`));
    } catch (error) {
      setResult(error);
    }
  };
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: newTheme.background }]}>
      <Text style={[styles.title,{color:newTheme.color}]}>Calculator</Text>
      <View style={[styles.input,{borderColor:newTheme.color}]}>
        <Text style={[styles.text,{color:newTheme.color}]}>
          {result ? result : operation ? `${num1}${operation}${num2}` : num1}
        </Text>
      </View>
      <View style={styles.numContainer}>
        <View style={styles.numbers}>
          <ThemeContext.Provider value={newTheme}>
            {numbers.map((item, index) => (
              <Button
                text={item}
                style={{
                  backgroundColor: index === 18 ? "coral" : null,
                  marginTop: 10,
                }}
                onclick={() => handleChange(item)}
                data-testid={item}
              />
            ))}
          </ThemeContext.Provider>
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
    paddingTop: 40,
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
