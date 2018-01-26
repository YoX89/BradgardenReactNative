import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";

const extractKey = ({ id }) => id;
const baseURL =
  "https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api";

export default class MemberListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      members: []
    };
  }

  componentWillMount = async () => {
    try {
      const response = await fetch(baseURL + "/members");
      const members = await response.json();
      this.setState({ loading: false, members });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  renderMember = ({ item }) => {
    return (
      <Text style={RowStyles.row}>
        {item.firstName} {item.lastName}
      </Text>
    );
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
        style={ContainerStyles.list}
        data={members}
        renderItem={this.renderMember}
        keyExtractor={extractKey}
      />
    );
  }
}

AppRegistry.registerComponent("MemberListScreen", () => MemberListScreen);
