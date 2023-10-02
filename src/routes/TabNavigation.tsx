import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/themed";
import React from "react";

import HomeScreen from "../screens/home/HomeScreen";
import { COLORS, ICON_HOME, TABS } from "../constants";

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={TABS.home}>
      <Tab.Screen
        name={TABS.home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_HOME(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
