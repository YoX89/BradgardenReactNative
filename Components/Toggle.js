import React, { Component } from "react";
import { Switch, Text, View } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class Toggle extends Component {
  render() {
    const { text, value, onValueChange } = this.props;
    return (
      <View style={ComponentStyles.toggle}>
        <Text style={ComponentStyles.toggleText}>{text}</Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    );
  }
}
