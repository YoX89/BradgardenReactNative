import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const TextStyles = StyleSheet.create({
  memberTitle: {
    color: Colors.primary,
    backgroundColor: "transparent",
    fontSize: 24,
    padding: 10
  },
  memberDetails: {
    color: Colors.primary,
    backgroundColor: "transparent",
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  sessionTitle: {
    color: Colors.black,
    backgroundColor: "transparent",
    fontSize: 24,
    padding: 10
  },
  sessionDetails: {
    color: Colors.black,
    backgroundColor: "transparent",
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  }
});
