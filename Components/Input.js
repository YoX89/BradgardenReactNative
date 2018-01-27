import React, { Component } from "react";
import { AppRegistry, TextInput, View } from "react-native";
import { Colors } from "../Styles/Colors";
import { ComponentStyles } from "./Styles/ComponentStyles";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      placeholder: props.placeholder,
      numeric: props.numeric
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { placeholder, numeric } = this.state;
    return (
      <View>
        <TextInput
          style={ComponentStyles.input}
          placeholderTextColor={Colors.secondary}
          placeholder={placeholder}
          keyboardType={numeric ? "numeric" : "default"}
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }

  text() {
    return this.state.text;
  }
}
