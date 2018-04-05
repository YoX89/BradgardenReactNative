import React, { Component } from "react";
import { Text, ImageBackground, View } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";
import { ContainerStyles } from "../Styles/ContainerStyles";
import { TextStyles } from "../Styles/TextStyles";
import { Colors } from "../Styles/Colors";

export default class ProfileHeader extends Component {
  render() {
    const { name, traitor, gamesPlayed, winRate } = this.props;
    return (
      <ImageBackground
        source={require("../Images/profile_background.jpg")}
        style={ContainerStyles.profileHeader}
      >
        <View
          style={ContainerStyles.full}
          backgroundColor={Colors.secondaryOverlay}
        >
          <Text style={TextStyles.memberTitle}>{name}</Text>
          <Text style={TextStyles.memberDetails}>{traitor}</Text>
          <View style={ContainerStyles.profileHeaderOuterWrapper}>
            <View style={ContainerStyles.profileHeaderInnerWrapper}>
              <Text style={ComponentStyles.profileHeaderContext}>
                Games Played
              </Text>
              <Text style={ComponentStyles.profileHeaderDetails}>
                {gamesPlayed}
              </Text>
            </View>
            <View style={ContainerStyles.profileHeaderInnerWrapper}>
              <Text style={ComponentStyles.profileHeaderContext}>Winrate</Text>
              <Text style={ComponentStyles.profileHeaderDetails}>
                {winRate}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
