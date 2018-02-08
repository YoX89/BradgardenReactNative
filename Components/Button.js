import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ComponentStyles } from "./Styles/ComponentStyles";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { title: props.title, onPress: props.onPress };
  }

  render() {
    const { title, onPress } = this.state;
    return (
      <View>
        <TouchableOpacity style={ComponentStyles.button} onPress={onPress}>
          <Text style={ComponentStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
