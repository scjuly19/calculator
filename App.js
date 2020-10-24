import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Calculator from './src/scenes/calculator';
export default function App() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.container}>
     <Calculator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
});
