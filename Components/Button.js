import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ComponentStyles } from "./Styles/ComponentStyles";

export default class Button extends Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <View>
        <TouchableOpacity style={ComponentStyles.button} onPress={onPress}>
          <Text style={ComponentStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
