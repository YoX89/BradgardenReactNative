import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import SecondaryButton from "../Components/SecondaryButton";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { TextStyles } from "../Styles/TextStyles";
import Api from "../Networking/Api";

export default class DetailedSessionScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers = async () => {
    this.setState({ loading: true, error: false });
    try {
      const members = await Api.fetchMembers();
      this.setState({ loading: false, members });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { loading, members, error } = this.state;
    const { session, game, isVisible, onClose } = this.props;

    var winners = null;
    if (session && session.winners) {
      winners = session.winners.map(
        id => members.find(member => member.id === id).firstName + "\n"
      );
    }

    var losers = null;
    if (session && session.losers) {
      losers = session.losers.map(
        id => members.find(member => member.id === id).firstName + "\n"
      );
    }

    var traitors = null;
    if (session && session.traitors) {
      traitors = session.traitors.map(
        id => members.find(member => member.id === id).firstName + "\n"
      );
    }
    const showTraitors = traitors && traitors.length > 0;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.centerWrap}>
          <ScrollView style={ContainerStyles.modalWrap}>
            {game && <Text style={TextStyles.sessionTitle}>{game.name}</Text>}
            {session && (
              <Text style={TextStyles.sessionTitle}>{session.date}</Text>
            )}
            {winners && <Text style={TextStyles.sessionTitle}>Winners:</Text>}
            {winners && (
              <Text style={TextStyles.sessionDetails}>{winners}</Text>
            )}
            {losers && <Text style={TextStyles.sessionTitle}>Losers:</Text>}
            {losers && <Text style={TextStyles.sessionDetails}>{losers}</Text>}
            {showTraitors && (
              <Text style={TextStyles.sessionTitle}>Traitors:</Text>
            )}
            {showTraitors && (
              <Text style={TextStyles.sessionDetails}>{traitors}</Text>
            )}
            <SecondaryButton title="Close" onPress={() => onClose()} />
            {error && <ErrorView title={error.title} message={error.message} />}
            {loading && <ActivityIndicator size="large" />}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
    if (error) {
      return (
        <View style={ContainerStyles.center}>
          <Text>Could not load members.</Text>
        </View>
      );
    }

    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={ContainerStyles.full}>
        <Text> Something something</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent(
  "DetailedSessionScreen",
  () => DetailedSessionScreen
);
