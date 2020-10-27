import React,{useContext} from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {ThemeContext} from '../../theme-context';

const Button = (props) => {
const theme=useContext(ThemeContext);
  const { text, style, onclick,disabled } = props;
  return (
    <TouchableOpacity style={[styles.container, style,{backgroundColor:text==="="?'coral':theme.background,borderColor:theme.color}]} onPress={onclick} disabled={disabled}>
      <Text style={[styles.text,{color:theme.color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
  },
});
export default Button;
