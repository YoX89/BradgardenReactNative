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
      selectables: props.selectables,
      isVisible: props.isVisible
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  setSelectables(selectables) {
    this.setState({ selectables: selectables });
  }

  renderSelectable = ({ item }) => {
    return <Text style={RowStyles.row}>{item.text}</Text>;
  };

  render() {
    const { isVisible, selectables } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <Button title="Done" onPress={() => this.toggleVisible()} />
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
