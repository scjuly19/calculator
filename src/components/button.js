import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props) => {
  const { text, style, textStyle, onclick,disabled } = props;
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onclick} disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 32,
  },
});

export default Button;
