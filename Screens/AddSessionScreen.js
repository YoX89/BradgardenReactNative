import React, { Component } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import Api from "../Networking/Api";

export default class AddSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Add session",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../Images/user.png")}
        style={[ButtonStyles.tabIcon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={ContainerStyles.center}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    return <Text>Here you should be able to add a session</Text>;
  }
}

AppRegistry.registerComponent("AddSessionScreen", () => AddSessionScreen);
