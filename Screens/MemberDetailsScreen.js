import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from "react-native";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { TextStyles } from "../Styles/TextStyles";
import Button from "../Components/Button";
import Modal from "react-native-modal";

export default class MemberDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, onPressClose, member } = this.props;
    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          {member && (
            <ScrollView style={ContainerStyles.modal}>
              <Text style={TextStyles.memberTitle}>{this.title()}</Text>
              <Text style={TextStyles.memberDetails}>
                {this.gamesPlayedText()}
              </Text>
              <Text style={TextStyles.memberDetails}>
                {this.winRatioText()}
              </Text>
              <Text style={TextStyles.memberDetails}>{this.traitorText()}</Text>
              <Button title="Close" onPress={onPressClose} />
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    );
  }

  title() {
    const { member } = this.props;
    return member.firstName + " " + member.lastName;
  }

  gamesPlayedText() {
    const { gamesPlayed } = this.props.member;
    if (gamesPlayed === 0) {
      return "No played games";
    } else if (gamesPlayed === 1) {
      return "One game played";
    } else {
      return gamesPlayed + " games played";
    }
  }

  winRatioText() {
    const { winRatio } = this.props.member;
    if (winRatio && winRatio != "NaN") {
      return winRatio * 100 + "% wins";
    }
    return "0% wins";
  }

  traitorText() {
    const { member } = this.props;
    const { timesTraitor } = member;

    if (member.id === 1) {
      return "Fun fact: He always plays as a traitor.";
    } else if (timesTraitor === 0) {
      return "A trustworthy type, has never played as a traitor.";
    } else if (timesTraitor === 1) {
      return 'Well, we have a saying in Sweden that goes: "En gång är ingen gång". But we still won\'t forget that one traitorous move.';
    } else {
      return (
        "This player has been a traitor more times than I can count. Well... At least " +
        timesTraitor +
        " times."
      );
    }
  }
}

AppRegistry.registerComponent("MemberDetailsScreen", () => MemberDetailsScreen);
