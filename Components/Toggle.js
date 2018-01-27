import React, { Component } from "react";
import { AppRegistry, Switch, Text, View } from "react-native";
import { Colors } from "../Styles/Colors";
import { ComponentStyles } from "./Styles/ComponentStyles";

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      value: props.value,
      onValueChange: props.onValueChange
    };
  }

  render() {
    const { text, value } = this.state;
    return (
      <View style={ComponentStyles.toggle}>
        <Text style={ComponentStyles.toggleText}>{text}</Text>
        <Switch value={value} onValueChange={this.toggleValue} />
      </View>
    );
  }

  toggleValue = value => {
    this.setState({ value: value });
    this.state.onValueChange(value);
  };
}
