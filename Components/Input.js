import React, { Component } from "react";
import { AppRegistry, TextInput, View } from "react-native";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", placeholder: props.placeholder };
  }

  render() {
    const { placeholder } = this.state;
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder={placeholder}
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }
}
