import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

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
  centerLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  profileHeader: {
    height: 200,
    alignItems: "stretch",
    elevation: 8,
    backgroundColor: Colors.background,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  },
  profileHeaderOuterWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30
  },
  profileHeaderInnerWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
