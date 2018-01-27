import { StyleSheet } from "react-native";
import { Colors } from "../../Styles/Colors";

export const ContainerStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    flex: 1
  },
  modal: {
    flex: 1,
    borderRadius: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.background
  }
});
