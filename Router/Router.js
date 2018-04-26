import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import MemberListScreen from "../Screens/MemberListScreen";
import GameListScreen from "../Screens/GameListScreen";
import AddSessionScreen from "../Screens/AddSessionScreen";
import SessionListScreen from "../Screens/SessionListScreen";
import { Colors } from "../Styles/Colors";
import { ButtonStyles } from "../Styles/ButtonStyles";
import { Image } from "react-native";

const SessionsTab = StackNavigator(
  {
    AddSession: {
      screen: AddSessionScreen,
      navigationOptions: {
        title: "Add Session"
      }
    },
    SessionList: {
      screen: SessionListScreen,
      navigationOptions: {
        title: "Previous Session"
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: Colors.primary,
      headerStyle: {
        backgroundColor: Colors.bar
      }
    },
    cardStyle: {
      backgroundColor: Colors.background
    }
  }
);

export const Tabs = TabNavigator(
  {
    Sessions: {
      screen: SessionsTab,
      navigationOptions: {
        tabBarLabel: "Add session",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../Images/add_session.png")}
            style={[ButtonStyles.tabIcon, { tintColor: tintColor }]}
          />
        )
      }
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
