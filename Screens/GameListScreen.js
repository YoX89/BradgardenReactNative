import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { ButtonStyles } from "../Styles/ButtonStyles";
import { Colors } from "../Styles/Colors";
import Button from "../Components/Button";
import ListItem from "../Components/ListItem";
import Modal from "react-native-modal";
import AddGameScreen from "./AddGameScreen";
import Api from "../Networking/Api";
import DropdownAlert from "react-native-dropdownalert";

const extractKey = ({ id }) => id;

export default class GameListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      games: [],
      isAddGameScreenVisible: false
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

  componentDidMount() {
    this.fetchGames(false);
  }

  fetchGames = async force => {
    this.setState({ loading: true });
    try {
      const games = await Api.fetchGames(force);
      this.setState({ loading: false, games });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  presentDeleteGameAlert = game => {
    Alert.alert(
      "Delete " + game.name + "?",
      null,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => this.deleteGame(game),
          style: "destructive"
        }
      ],
      null
    );
  };

  deleteGame = async game => {
    this.setState({ loading: true });
    try {
      const success = await Api.deleteGame(game.id);
      this.setState({ loading: false });

      if (success) {
        this.dropdown.alertWithType("success", game.name + " was deleted", "");
      } else {
        this.dropdown.alertWithType(
          "error",
          "Server error",
          "Something went wrong, please try again."
        );
      }
    } catch (e) {
      this.setState({ loading: false });
      this.dropdown.alertWithType(
        "error",
        "Network error",
        "Make sure you are connected to the internet."
      );
    }
  };

  onRefresh = () => {
    this.fetchGames(true);
  };

  renderGame = ({ item }) => {
    return (
      <ListItem
        text={item.name}
        onPressItem={this.presentDeleteGameAlert}
        data={item}
      />
    );
  };

  render() {
    const { loading, games, error, isAddGameScreenVisible } = this.state;

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load games.</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={ContainerStyles.full}>
        <Button
          title="Add new game"
          onPress={() => this.toggleAddGameScreen()}
        />
        <FlatList
          style={ContainerStyles.list}
          data={games}
          renderItem={this.renderGame}
          keyExtractor={extractKey}
          onRefresh={this.onRefresh}
          refreshing={loading}
        />
        <AddGameScreen
          isVisible={isAddGameScreenVisible}
          onClose={() => this.didCloseAddGameScreen()}
        />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
  }

  didCloseAddGameScreen() {
    this.fetchGames();
    this.toggleAddGameScreen();
  }

  toggleAddGameScreen() {
    this.setState({
      isAddGameScreenVisible: !this.state.isAddGameScreenVisible
    });
  }
}

AppRegistry.registerComponent("GameListScreen", () => GameListScreen);
