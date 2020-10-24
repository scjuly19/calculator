import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Button from "../components/button";
const Calculator = () => {
  const numbers = [
    "C",
    "+/-",
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
  const [dotClicked, setDotState] = useState([]);
  const handleChange = (text) => {
    if (text === "C") {
      return resetResult();
    }
    if (text === "DEL") {
      return handleBackspace();
    }
    if (text === "+" || text === "-" || text === "/" || text === "*") {
      if (operation) {
        return;
      } else {
        setDotState(false)
        return setOperation(text);
      }
    }
    if (text === "=") {
      calculate();
    }
    if (text === ".") {
      if (dotClicked) {
        return;
      } else {
        setDotState(text);
      }
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      <View style={styles.input}>
        <Text style={styles.text}>
          {result ? result : operation ? `${num1}${operation}${num2}` : num1}
        </Text>
      </View>
      <View style={styles.numContainer}>
        <View style={styles.numbers}>
          {numbers.map((item, index) => (
            <Button
              text={item}
              style={{
                backgroundColor: index === 18 ? "coral" : null,
                marginTop: 10,
              }}
              onclick={() => handleChange(item)}
              // disabled={item === "." && dotClicked}
            />
          ))}
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
