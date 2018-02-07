import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import { Colors } from "../Styles/Colors";
import Button from "../Components/Button";
import ListItem from "../Components/ListItem";
import Modal from "react-native-modal";
import AddGameScreen from "./AddGameScreen";
import Api from "../Networking/Api";

const extractKey = ({ id }) => id;

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
      const games = await Api.fetchGames();
      this.setState({ loading: false, games });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  renderGame = ({ item }) => {
    return <ListItem text={item.name} />;
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
      <SafeAreaView style={ContainerStyles.full}>
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
      </SafeAreaView>
    );
  }

  showAddGameScreen() {
    this.addGameScreen.toggleVisible();
  }
}

AppRegistry.registerComponent("GameListScreen", () => GameListScreen);
