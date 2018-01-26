import React from "react";
import { TabNavigator } from "react-navigation";
import MemberListScreen from "../Screens/MemberListScreen";
import GameListScreen from "../Screens/GameListScreen";

export const Tabs = TabNavigator({
  Games: {
    screen: GameListScreen
  },
  Members: {
    screen: MemberListScreen
  }
});
