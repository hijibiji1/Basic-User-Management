import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme';

const UserDetails = ({route}) => {
  const {id} = route.params;
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async id => {
    try {
      const response = await fetch(
        `https://reitriver-render-api.onrender.com/employees/${id}`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setUserDetails(jsonData[0]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  if (!userDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{userDetails.name}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Employee ID:</Text>
        <Text style={styles.value}>{userDetails.employeeId}</Text>

        <Text style={styles.label}>Location(s):</Text>
        <Text style={styles.value}>
          {(userDetails.locations || []).join(', ') || 'N/A'}
        </Text>

        <Text style={styles.label}>Area List:</Text>
        <Text style={styles.value}>
          {userDetails.areaList ? userDetails.areaList : 'Not Available'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: themeColors.bgDark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: themeColors.bgDark,
  },
  loadingText: {
    color: themeColors.black,
    fontSize: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themeColors.bgLight,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: themeColors.bgLight,
    padding: 16,
    borderRadius: 10,
  },
  label: {
    color: themeColors.text,
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: themeColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
