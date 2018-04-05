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
import ProfileHeader from "../Components/ProfileHeader";
import Modal from "react-native-modal";

export default class MemberDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, onPressClose, member } = this.props;
    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.centerWrap}>
          {member && (
            <ScrollView style={ContainerStyles.modalWrap}>
              <ProfileHeader
                name={this.title()}
                traitor={this.traitorText()}
                gamesPlayed={this.gamesPlayedText()}
                winRate={this.winRatioText()}
              />
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
    return this.props.member.gamesPlayed;
  }

  winRatioText() {
    const { winRatio } = this.props.member;
    if (winRatio && winRatio != "NaN") {
      return (winRatio * 100).toFixed(2) + "% wins";
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
