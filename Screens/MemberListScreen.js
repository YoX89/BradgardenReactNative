import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { ButtonStyles } from "../Styles/ButtonStyles";
import ListItem from "../Components/ListItem";
import Api from "../Networking/Api";
import MemberDetailsScreen from "./MemberDetailsScreen";

const extractKey = ({ id }) => id.toString();

export default class MemberListScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      members: [],
      selectedMember: null
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

  componentWillMount() {
    this.fetchMembers(false);
  }

  fetchMembers = async force => {
    this.setState({ loading: true });
    try {
      const members = await Api.fetchMembers(force);
      this.setState({ loading: false, members });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  onPressMember = member => {
    this.setState({ selectedMember: member });
  };

  onPressClose = () => {
    this.setState({ selectedMember: null });
  };

  onRefresh = async () => {
    this.fetchMembers(true);
  };

  renderMember = ({ item }) => {
    return (
      <ListItem
        text={item.firstName + " " + item.lastName}
        onPressItem={this.onPressMember}
        data={item}
      />
    );
  };

  render() {
    const { loading, members, error, selectedMember } = this.state;

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load members.</Text>
        </View>
      );
    }

    return (
      <View style={ContainerStyles.full}>
        <FlatList
          style={ContainerStyles.full}
          data={members}
          extraData={this.state}
          renderItem={this.renderMember}
          keyExtractor={extractKey}
          contentInsetAdjustmentBehavior={"automatic"}
          onRefresh={this.onRefresh}
          refreshing={loading}
        />
        <MemberDetailsScreen
          isVisible={!!selectedMember}
          onPressClose={this.onPressClose}
          member={selectedMember}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("MemberListScreen", () => MemberListScreen);
