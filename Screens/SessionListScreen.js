import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import { ContainerStyles } from "./Styles/ContainerStyles";
import ListItem from "../Components/ListItem";
import Button from "../Components/Button";
import Api from "../Networking/Api";

const extractKey = ({ id }) => id;

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
  }

  onRefresh = async () => {
    this.fetchSessions(true);
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

  renderSession = ({ item }) => {
    return <ListItem text={item.date} data={item} />;
  };

  render() {
    const { loading, sessions, error } = this.state;
    const { isVisible, onClose } = this.props;

    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load sessions.</Text>
        </View>
      );
    }

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <FlatList
              style={ContainerStyles.full}
              data={sessions}
              renderItem={this.renderSession}
              keyExtractor={extractKey}
              refreshing={loading}
              onRefresh={this.onRefresh}
            />
            <Button title="Close" onPress={onClose} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

AppRegistry.registerComponent("SessionListScreen", () => SessionListScreen);
