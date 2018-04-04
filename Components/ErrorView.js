import React, { Component } from "react";
import { View, Text } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class ErrorView extends Component {
  render() {
    const { title, message } = this.props;
    return (
      <View style={ComponentStyles.errorWrapper}>
        {title && <Text style={ComponentStyles.errorTitle}>{title}</Text>}
        {message && <Text style={ComponentStyles.errorMessage}>{message}</Text>}
      </View>
    );
  }
}
