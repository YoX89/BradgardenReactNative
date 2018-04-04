import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { ButtonStyles } from "../Styles/ButtonStyles";
import Button from "../Components/Button";
import Picker from "../Components/Picker";
import Api from "../Networking/Api";
import SelectionScreen from "./SelectionScreen";
import SessionListScreen from "./SessionListScreen";
import DropdownAlert from "react-native-dropdownalert";

export default class AddSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedGame: null,
      selectedWinners: null,
      selectedLosers: null,
      selectedTraitors: null,
      isSelectionScreenVisible: false,
      isSessionListVisible: false,
      selectables: [],
      selectMultiple: false,
      selectedIds: [],
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
    const {
      loading,
      selectedGame,
      selectedWinners,
      selectedLosers,
      selectedTraitors,
      isSelectionScreenVisible,
      isSessionListVisible,
      selectables,
      selectMultiple,
      selectedIds,
      onPressDone
    } = this.state;

    const hasTraitor = selectedGame && selectedGame.traitor;
    const selectedGames = selectedGame ? [selectedGame] : null;
    return (
      <View style={ContainerStyles.full}>
        <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
          <Button
            title="Previous sessions"
            onPress={() => this.setState({ isSessionListVisible: true })}
          />
          <Picker
            selected={selectedGames}
            placeholder="Choose game"
            onPress={() => this.chooseGameAction()}
          />
          <Picker
            selected={selectedWinners}
            placeholder="Choose winners"
            onPress={() => this.chooseWinnersAction()}
          />
          <Picker
            selected={selectedLosers}
            placeholder="Choose losers"
            onPress={() => this.chooseLosersAction()}
          />
          {hasTraitor && (
            <Picker
              selected={selectedTraitors}
              placeholder="Choose traitors"
              onPress={() => this.chooseTraitorsAction()}
            />
          )}
          <Button title="Add session" onPress={() => this.addSession()} />
          {loading && <ActivityIndicator size="large" />}
        </ScrollView>
        <SelectionScreen
          isVisible={isSelectionScreenVisible}
          selectables={selectables}
          onPressDone={onPressDone}
          selectedIds={selectedIds}
          selectMultiple={selectMultiple}
        />
        <SessionListScreen
          isVisible={isSessionListVisible}
          onClose={() => this.setState({ isSessionListVisible: false })}
        />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }

  addSession = async () => {
    const {
      selectedGame,
      selectedWinners,
      selectedLosers,
      selectedTraitors
    } = this.state;

    if (!selectedGame) {
      this.dropdown.alertWithType("warn", "Please select a game", "");
      return;
    }

    this.setState({ loading: true });
    try {
      const success = await Api.addSession(
        selectedGame,
        selectedWinners,
        selectedLosers,
        selectedTraitors
      );

      if (success) {
        this.setState({
          selectedGame: null,
          selectedWinners: null,
          selectedLosers: null,
          selectedTraitors: null,
          loading: false
        });
        this.dropdown.alertWithType(
          "success",
          "The session was successfully added",
          ""
        );
      } else {
        this.setState({ loading: false });
        this.dropdown.alertWithType(
          "error",
          "Error adding session",
          "Verify your selections and try again."
        );
      }
    } catch (e) {
      this.setState({ loading: false });
      this.dropdown.alertWithType(
        "error",
        "Error adding session",
        e.toString()
      );
    }
  };

  toggleModalVisible() {
    this.setState({
      isSelectionScreenVisible: !this.state.isSelectionScreenVisible
    });
  }

  didSelectGame = gameArray => {
    const game = gameArray[0];
    this.setState({ selectedGame: game });
    this.toggleModalVisible();
  };

  chooseGameAction = async () => {
    const { selectedGame } = this.state;
    try {
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
    } catch (e) {
      this.dropdown.alertWithType(
        "error",
        "Error fetching games",
        e.toString()
      );
    }
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
    try {
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
    } catch (e) {
      this.dropdown.alertWithType(
        "error",
        "Error fetching members",
        e.toString()
      );
    }
  };
}

AppRegistry.registerComponent("AddSessionScreen", () => AddSessionScreen);
