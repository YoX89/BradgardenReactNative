import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { Colors } from "../Styles/Colors";
import Modal from "react-native-modal";
import Input from "../Components/Input";
import Button from "../Components/Button";

const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class AddGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      isVisible: props.isVisible
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Modal isVisible={isVisible}>
        <View style={ContainerStyles.modal}>
          <Input placeholder="Name of the game" />
          <Button title="Close" onPress={() => this.toggleVisible()} />
        </View>
      </Modal>
    );
  }

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }
}

AppRegistry.registerComponent("AddGameScreen", () => AddGameScreen);
