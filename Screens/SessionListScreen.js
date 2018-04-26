import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import ListItem from "../Components/ListItem";
import Api from "../Networking/Api";

const extractKey = ({ id }) => id.toString();

export default class SessionListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false
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

  renderSession = ({ item }) => {
    const { games } = this.state;
    var text = item.date.split(" ")[0];
    if (games) {
      const { gameID } = item;
      const foundGame = games.find(function(game) {
        return game.id === gameID;
      });
      if (foundGame) {
        text += " - " + foundGame.name;
      }
    }
    return <ListItem text={text} data={item} />;
  };

  render() {
    const { loading, sessions, error } = this.state;

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load sessions.</Text>
        </View>
      );
    }

    return (
      <FlatList
        style={ContainerStyles.full}
        data={sessions}
        renderItem={this.renderSession}
        keyExtractor={extractKey}
        refreshing={loading}
        onRefresh={this.onRefresh}
      />
    );
  }
}

AppRegistry.registerComponent("SessionListScreen", () => SessionListScreen);
