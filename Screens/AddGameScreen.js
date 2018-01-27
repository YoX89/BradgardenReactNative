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
import Toggle from "../Components/Toggle";

const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class AddGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      isVisible: props.isVisible,
      hasTraitor: false,
      isCoop: false
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { isVisible, hasTraitor, isCoop } = this.state;
    return (
      <Modal isVisible={isVisible}>
        <View style={ContainerStyles.modal}>
          <Input placeholder="Name of the game" />
          <Input placeholder="Number of players" numeric={true} />
          <Toggle
            text="Has traitor"
            value={hasTraitor}
            onValueChange={value => this.setState({ hasTraitor: value })}
          />
          <Toggle
            text="Is co-op"
            value={isCoop}
            onValueChange={value => this.setState({ isCoop: value })}
          />
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
