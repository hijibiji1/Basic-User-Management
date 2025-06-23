import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme';
import {useIsFocused} from '@react-navigation/native';
import DeleteSwap from '../common/deleteSwap';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState('');
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://reitriver-render-api.onrender.com/employees',
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const UserShowCase = ({user}) => {
    return (
      <DeleteSwap id={user.employeeId} fetchUpdateData={fetchData}>
        <Pressable
          onPress={() =>
            navigation.navigate('UserDetails', {id: user.employeeId})
          }>
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, {fontSize: 16, fontWeight: 'bold'}]}>
              {user.name}
            </Text>
            <Text style={styles.itemText}>{`ID.: ${user.employeeId}`}</Text>
            <Text style={styles.itemText}>{`Loc.: ${user.locations}`}</Text>
          </View>
        </Pressable>
      </DeleteSwap>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <UserShowCase user={item} />}
        keyExtractor={item => item.employeeId}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: themeColors.bgLight,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
