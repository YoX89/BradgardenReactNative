import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import { Colors } from "../Styles/Colors";
import Button from "../Components/Button";
import Modal from "react-native-modal";
import AddGameScreen from "./AddGameScreen";

const extractKey = ({ id }) => id;
const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class GameListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      games: []
    };
  }

  static navigationOptions = {
    tabBarLabel: "Games",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../Images/user.png")}
        style={[ButtonStyles.tabIcon, { tintColor: tintColor }]}
      />
    )
  };

  componentWillMount = async () => {
    try {
      const response = await fetch(baseURL + "/games");
      const games = await response.json();
      this.setState({ loading: false, games });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  renderGame = ({ item }) => {
    return <Text style={RowStyles.row}>{item.name}</Text>;
  };

  render() {
    const { loading, games, error } = this.state;

    if (loading) {
      return (
        <View style={ContainerStyles.center}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load games.</Text>
        </View>
      );
    }

    return (
      <View style={ContainerStyles.list}>
        <Button title="Add new game" onPress={() => this.showAddGameScreen()} />
        <FlatList
          style={ContainerStyles.list}
          data={games}
          renderItem={this.renderGame}
          keyExtractor={extractKey}
        />
        <AddGameScreen
          isVisible={false}
          onRef={ref => (this.addGameScreen = ref)}
        />
      </View>
    );
  }

  showAddGameScreen() {
    this.addGameScreen.toggleVisible();
  }
}

AppRegistry.registerComponent("GameListScreen", () => GameListScreen);
