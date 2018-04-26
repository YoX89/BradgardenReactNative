import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { Colors } from "../Styles/Colors";
import Modal from "react-native-modal";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Toggle from "../Components/Toggle";
import ErrorView from "../Components/ErrorView";
import Api from "../Networking/Api";

export default class AddGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasTraitor: false,
      isCoop: false,
      error: null
    };
  }

  render() {
    const { isVisible, onClose } = this.props;
    const { hasTraitor, isCoop, loading, error } = this.state;
    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.centerWrap}>
          <ScrollView style={ContainerStyles.modalWrap}>
            {error && <ErrorView title={error.title} message={error.message} />}
            <Input
              placeholder="Name of the game"
              onRef={ref => (this.nameInput = ref)}
            />
            <Input
              placeholder="Maximum number of players"
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
            <Button title="Close" onPress={() => onClose()} />
            {loading && <ActivityIndicator size="large" />}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }

  addGame = async () => {
    const { hasTraitor, isCoop } = this.state;
    const { onClose } = this.props;
    const name = this.nameInput.text();
    const numberOfPlayers = this.numberOfPlayersInput.text();

    this.setState({ loading: true, error: null });
    try {
      const success = await Api.addGame(
        name,
        numberOfPlayers,
        hasTraitor,
        isCoop
      );
      this.setState({ loading: false });
      if (success) {
        onClose();
      } else {
        this.setState({
          error: {
            title: "Server error",
            message:
              "Something went wrong while adding the game, please review your life."
          }
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: {
          title: "Network error",
          message: "Make sure you are connected to the internet."
        }
      });
    }
  };
}

AppRegistry.registerComponent("AddGameScreen", () => AddGameScreen);
