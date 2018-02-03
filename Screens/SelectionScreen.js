import React, { PureComponent } from "react";
import { AppRegistry, View, FlatList, Text, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import Button from "../Components/Button";
import { ContainerStyles } from "./Styles/ContainerStyles";
import { RowStyles } from "./Styles/RowStyles";

const extractKey = ({ id }) => id;

export default class SelectionScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      isVisible: props.isVisible,
      selectables: props.selectables,
      onPressDone: props.onPressDone
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isVisible != nextProps.isVisible) {
      this.setState({ isVisible: nextProps.isVisible });
    }
    if (this.state.selectables != nextProps.selectables) {
      this.setState({ selectables: nextProps.selectables });
    }
  }

  renderSelectable = ({ item }) => {
    return <Text style={RowStyles.row}>{item.text}</Text>;
  };

  render() {
    const { isVisible, selectables, onPressDone } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <Button title="Done" onPress={onPressDone} />
            <FlatList
              style={ContainerStyles.full}
              data={selectables}
              renderItem={this.renderSelectable}
              keyExtractor={extractKey}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

AppRegistry.registerComponent("SelectionScreen", () => SelectionScreen);
