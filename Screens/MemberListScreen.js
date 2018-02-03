import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { ButtonStyles } from "./Styles/ButtonStyles";
import ListItem from "../Components/ListItem";
import Api from "../Networking/Api";

const extractKey = ({ id }) => id;

export default class MemberListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      members: []
    };
  }

  static navigationOptions = {
    tabBarLabel: "Members",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../Images/user.png")}
        style={[ButtonStyles.tabIcon, { tintColor: tintColor }]}
      />
    )
  };

  componentWillMount = async () => {
    try {
      const members = await Api.fetchMembers();
      this.setState({ loading: false, members });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  renderMember = ({ item }) => {
    return <ListItem text={item.firstName + " " + item.lastName} />;
  };

  render() {
    const { loading, members, error } = this.state;

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
          <Text>Could not load members.</Text>
        </View>
      );
    }

    return (
      <FlatList
        style={ContainerStyles.full}
        data={members}
        renderItem={this.renderMember}
        keyExtractor={extractKey}
      />
    );
  }
}

AppRegistry.registerComponent("MemberListScreen", () => MemberListScreen);
