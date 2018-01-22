import React from 'react';
import { TabNavigator } from 'react-navigation';
import MemberListScreen from '../Screens/MemberListScreen';

export const Tabs = TabNavigator({
  MemberList: {
    screen: MemberListScreen,
  },
});
