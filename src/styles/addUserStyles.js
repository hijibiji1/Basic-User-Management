import React from 'react';
import {StyleSheet} from 'react-native';
import {themeColors} from '../theme';

export const addUserStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    // marginBottom: 15,
    textAlign: 'center',
  },
  inputStyle: {
    padding: 8,
    // width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: themeColors.bgLight,
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
