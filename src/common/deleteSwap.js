import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const DeleteSwap = props => {
  const swipeableRowRef = useRef(null);
  const {children, id, fetchUpdateData} = props;

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <RectButton style={styles.leftAction} onPress={close}>
        <AnimatedIcon
          name="archive"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-65, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RectButton style={styles.rightAction} onPress={deleteFn}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };

  const updateRef = ref => {
    swipeableRowRef.current = ref;
  };

  const close = () => {
    swipeableRowRef.current.close();
  };

  const deleteFn = async () => {
    try {
      const response = await fetch(
        `https://reitriver-render-api.onrender.com/employeeRemove/${id}`,
        {method: 'DELETE'},
      );

      if (response.ok) {
        fetchUpdateData();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      // leftThreshold={40}
      rightThreshold={40}
      // renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    justifyContent: 'flex-end',
    marginBottom: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default DeleteSwap;
