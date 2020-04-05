// Components/Test.js

import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import HelloWorld from "./HelloWorld";

class Test extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <HelloWorld />
        <View style={styles.subview_container}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subview_container: {
    // first possiblity
    // backgroundColor: Platform.OS === "ios" ? "red" : "blue",
    ...Platform.select({
      ios: {
        backgroundColor: "blue",
      },
      android: {
        backgroundColor: "red",
      },
    }),
    width: 50,
    height: 50,
  },
});

export default Test;
