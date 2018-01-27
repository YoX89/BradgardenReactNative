import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import { Colors } from "../Styles/Colors";
import Modal from "react-native-modal";
import Input from "../Components/Input";

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
          <Text>Hello!</Text>
          <Input placeholder="Name of the game" />
          <Button
            style={ButtonStyles.standard}
            color={Colors.button}
            title="Close"
            onPress={() => this.toggleVisible()}
          />
        </View>
      </Modal>
    );
  }

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }
}

AppRegistry.registerComponent("AddGameScreen", () => AddGameScreen);
