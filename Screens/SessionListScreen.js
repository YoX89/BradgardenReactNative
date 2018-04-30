import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import DetailedSessionScreen from "./DetailedSessionScreen";
import ListItem from "../Components/ListItem";
import Api from "../Networking/Api";

const extractKey = ({ id }) => id.toString();

export default class SessionListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      detailedSessionVisible: false
    };
  }

  componentDidMount() {
    this.fetchSessions();
    this.fetchGames();
  }

  onRefresh = async () => {
    this.fetchSessions(true);
    this.fetchGames(true);
  };

  fetchSessions = async force => {
    this.setState({ loading: true, error: false });
    try {
      const sessions = await Api.fetchSessions(force);
      this.setState({ loading: false, sessions });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  fetchGames = async force => {
    try {
      const games = await Api.fetchGames(force);
      this.setState({ games });
    } catch (e) {}
  };

  findGameForId(id) {
    const { games } = this.state;
    var game = null;
    if (games) {
      game = games.find(function(game) {
        return game.id === id;
      });
    }

    return game;
  }

  onPressSession = session => {
    const game = this.findGameForId(session.gameID);
    this.setState({
      detailedSessionVisible: !this.state.detailedSessionVisible,
      selectedSession: session,
      selectedGame: game
    });
  };

  renderSession = ({ item }) => {
    const { games } = this.state;
    const game = this.findGameForId(item.gameID);
    const gameName = game != null && game.name != null ? game.name : "";
    return (
      <ListItem
        title={gameName}
        details={item.date}
        data={item}
        onPressItem={this.onPressSession}
      />
    );
  };

  render() {
    const {
      loading,
      sessions,
      error,
      detailedSessionVisible,
      selectedSession,
      selectedGame
    } = this.state;

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load sessions.</Text>
        </View>
      );
    }

    return (
      <View style={ContainerStyles.full}>
        <FlatList
          style={ContainerStyles.full}
          data={sessions}
          renderItem={this.renderSession}
          keyExtractor={extractKey}
          refreshing={loading}
          onRefresh={this.onRefresh}
        />
        <DetailedSessionScreen
          isVisible={detailedSessionVisible}
          session={selectedSession}
          game={selectedGame}
          onClose={() =>
            this.setState({
              detailedSessionVisible: !this.state.detailedSessionVisible
            })
          }
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("SessionListScreen", () => SessionListScreen);
