import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/style';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TopBar = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.topBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === tab ? styles.activeTab : null]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab ? styles.activeTabText : null]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    height: hp('8%'),
    flexDirection: 'row', // Align tabs horizontally
    justifyContent: 'space-around', // Even spacing between tabs
    backgroundColor: colors.yellow, // Background color of the top bar
    paddingVertical: 10, // Vertical padding
    borderBottomWidth: 1, // Optional: Add a bottom border
    borderBottomColor: colors.navy, // Border color (optional)
  },
  tab: {
    flex: 1, // Make all tabs take equal space
    alignItems: 'center', // Center align text within each tab
    paddingVertical: 10, // Add padding for better click area
  },
  activeTab: {
    borderBottomWidth: 3, // Highlight the active tab with a bottom border
    borderBottomColor: colors.navy, // Navy color for the bottom border
  },
  tabText: {
    fontSize: 24, // Base font size
    color: 'gray', // Default color for inactive tabs
  },
  activeTabText: {
    color: colors.navy, // Highlighted text color for the active tab
    fontWeight: 'bold', // Bold text for emphasis
  },
});
