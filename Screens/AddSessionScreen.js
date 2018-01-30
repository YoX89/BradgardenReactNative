import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import Button from "../Components/Button";
import Api from "../Networking/Api";
import SelectionScreen from "./SelectionScreen";

export default class AddSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedGame: null
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
    const { loading, selectedGame } = this.state;

    if (loading) {
      return (
        <View style={ContainerStyles.center}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    return (
      <ScrollView>
        <Button title="Choose game" onPress={() => this.chooseGame()} />
        <Button title="Choose winners" onPress={() => this.chooseWinners()} />
        <Button title="Choose losers" onPress={() => this.chooseLosers()} />
        {selectedGame &&
          selectedGame.hasTraitor && (
            <Button
              title="Choose traitors"
              onPress={() => this.chooseTraitors()}
            />
          )}
        <SelectionScreen
          isVisible={false}
          selectables={[]}
          onRef={ref => (this.selectionScreen = ref)}
        />
      </ScrollView>
    );
  }

  chooseGame = async () => {
    var games = await Api.fetchGames();
    games = games.map(game => {
      game.text = game.name;
      return game;
    });
    this.selectionScreen.setSelectables(games);
    this.selectionScreen.toggleVisible();
  };

  chooseWinners() {
    this.openMembers();
  }

  chooseLosers() {
    this.openMembers();
  }

  openMembers = async () => {
    var members = await Api.fetchMembers();
    members = members.map(member => {
      member.text = member.firstName + " " + member.lastName;
      return member;
    });
    this.selectionScreen.setSelectables(members);
    this.selectionScreen.toggleVisible();
  };
}

AppRegistry.registerComponent("AddSessionScreen", () => AddSessionScreen);
