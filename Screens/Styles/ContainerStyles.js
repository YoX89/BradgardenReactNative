import { StyleSheet } from "react-native";
import { Colors } from "../../Styles/Colors";

export const ContainerStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  full: {
    flex: 1
  },
  modal: {
    flex: 1,
    borderRadius: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.background
  },
  scrollView: {
    alignItems: "flex-start"
  }
});
