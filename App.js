import React from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { Tabs } from "./Router/Router";
import { Colors } from "./Styles/Colors";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar backgroundColor={"transparent"} translucent />
        </View>
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  statusBar: {
    height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    backgroundColor: Colors.bar
  }
});
