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
import { ComponentStyles } from "../Components/Styles/ComponentStyles";
import Api from "../Networking/Api";
import SelectionScreen from "./SelectionScreen";

export default class AddSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedGame: null,
      selectedWinners: null,
      selectedLosers: null,
      selectedTraitors: null,
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
      selectedWinners,
      selectedLosers,
      selectedTraitors,
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

    const nameReducer = (text, member) => text + member.text + "\n";
    const hasTraitor = selectedGame && selectedGame.traitor;
    return (
      <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
        {selectedGame && (
          <Text style={ComponentStyles.rowSelected}>{selectedGame.name}</Text>
        )}
        <Button title="Choose game" onPress={() => this.chooseGameAction()} />
        {selectedWinners && (
          <Text style={ComponentStyles.rowSelected}>
            {selectedWinners.reduce(nameReducer, "").trim()}
          </Text>
        )}
        <Button
          title="Choose winners"
          onPress={() => this.chooseWinnersAction()}
        />
        {selectedLosers && (
          <Text style={ComponentStyles.rowSelected}>
            {selectedLosers.reduce(nameReducer, "").trim()}
          </Text>
        )}
        <Button
          title="Choose losers"
          onPress={() => this.chooseLosersAction()}
        />
        {hasTraitor &&
          selectedTraitors && (
            <Text style={ComponentStyles.rowSelected}>
              {selectedTraitors.reduce(nameReducer, "").trim()}
            </Text>
          )}
        {hasTraitor && (
          <Button
            title="Choose traitors"
            onPress={() => this.chooseTraitorsAction()}
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

  toggleModalVisible() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  didSelectGame = gameArray => {
    const game = gameArray[0];
    this.setState({ selectedGame: game });
    this.toggleModalVisible();
  };

  chooseGameAction = async () => {
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

  chooseWinnersAction() {
    const { selectedWinners } = this.state;
    this.openMemberSelection(selectedWinners, this.didSelectWinners);
  }

  chooseLosersAction() {
    const { selectedLosers } = this.state;
    this.openMemberSelection(selectedLosers, this.didSelectLosers);
  }

  chooseTraitorsAction() {
    const { selectedTraitors } = this.state;
    this.openMemberSelection(selectedTraitors, this.didSelectTraitors);
  }

  didSelectWinners = memberArray => {
    this.setState({ selectedWinners: memberArray });
    this.toggleModalVisible();
  };

  didSelectLosers = memberArray => {
    this.setState({ selectedLosers: memberArray });
    this.toggleModalVisible();
  };

  didSelectTraitors = memberArray => {
    this.setState({ selectedTraitors: memberArray });
    this.toggleModalVisible();
  };

  openMemberSelection = async (selectedMembers, onPressDone) => {
    var members = await Api.fetchMembers();
    members = members.map(member => {
      member.text = member.firstName + " " + member.lastName;
      return member;
    });
    const selectedIds = selectedMembers
      ? selectedMembers.map(member => member.id)
      : [];
    this.setState({
      selectables: members,
      selectMultiple: true,
      selectedIds: selectedIds,
      onPressDone: onPressDone
    });
    this.toggleModalVisible();
  };
}

AppRegistry.registerComponent("AddSessionScreen", () => AddSessionScreen);
