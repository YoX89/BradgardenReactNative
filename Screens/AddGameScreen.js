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
import Api from "../Networking/Api";

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
          <Input
            placeholder="Name of the game"
            onRef={ref => (this.nameInput = ref)}
          />
          <Input
            placeholder="Number of players"
            numeric={true}
            onRef={ref => (this.numberOfPlayersInput = ref)}
          />
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
          <Button title="Add game" onPress={() => this.addGame()} />
          <Button title="Close" onPress={() => this.toggleVisible()} />
          {this.state.loading && <ActivityIndicator size="large" />}
        </View>
      </Modal>
    );
  }

  addGame = async () => {
    const { hasTraitor, isCoop } = this.state;
    const name = this.nameInput.text();
    const numberOfPlayers = this.numberOfPlayersInput.text();

    this.setState({ loading: true });
    try {
      const success = await Api.addGame(
        name,
        numberOfPlayers,
        hasTraitor,
        isCoop
      );
      this.setState({ loading: false });
      if (success) {
        this.toggleVisible();
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log("Error while posting game: " + { e });
    }
  };

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }
}

AppRegistry.registerComponent("AddGameScreen", () => AddGameScreen);
