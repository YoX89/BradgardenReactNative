import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";
import MemberListScreen from "../Screens/MemberListScreen";
import GameListScreen from "../Screens/GameListScreen";
import AddSessionScreen from "../Screens/AddSessionScreen";
import { Colors } from "../Styles/Colors";

export const Tabs = TabNavigator(
  {
    Sessions: {
      screen: AddSessionScreen
    },
    Games: {
      screen: GameListScreen
    },
    Members: {
      screen: MemberListScreen
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.black,
      indicatorStyle: {
        backgroundColor: Colors.primary
      },
      style: {
        backgroundColor: Colors.bar
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: true
  }
);
