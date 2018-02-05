import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import Button from "../Components/Button";
import Api from "../Networking/Api";
import SelectionScreen from "./SelectionScreen";

export default class AddSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedGame: null,
      isModalVisible: false,
      selectables: [],
      selectMultiple: false,
      selectedIds: []
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
    const {
      loading,
      selectedGame,
      isModalVisible,
      selectables,
      selectMultiple,
      selectedIds,
      onPressDone
    } = this.state;

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
        {selectedGame && <Text>{selectedGame.name}</Text>}
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
          isVisible={isModalVisible}
          selectables={selectables}
          onPressDone={onPressDone}
          selectedIds={selectedIds}
          selectMultiple={selectMultiple}
        />
      </ScrollView>
    );
  }

  didSelectGame = gameArray => {
    const game = gameArray[0];
    this.setState({ selectedGame: game });
    this.toggleModalVisible();
  };

  didSelectMember = memberArray => {
    this.toggleModalVisible();
  };

  toggleModalVisible() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  chooseGame = async () => {
    const { selectedGame } = this.state;
    var games = await Api.fetchGames();
    games = games.map(game => {
      game.text = game.name;
      return game;
    });
    const selectedIds = selectedGame ? [selectedGame.id] : [];
    this.setState({
      selectables: games,
      selectMultiple: false,
      selectedIds: selectedIds,
      onPressDone: this.didSelectGame
    });
    this.toggleModalVisible();
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
    this.setState({
      selectables: members,
      selectMultiple: true,
      selectedIds: [],
      onPressDone: this.didSelectMember
    });
    this.toggleModalVisible();
  };
}

AppRegistry.registerComponent("AddSessionScreen", () => AddSessionScreen);
