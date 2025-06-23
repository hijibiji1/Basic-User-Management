import React from 'react';
import {SafeAreaView, TextInput, View, Pressable, Text} from 'react-native';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {addUserStyles} from '../styles/addUserStyles';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeColors} from '../theme';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const AddUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is mandatory'),
  // email: Yup.string().email().required('Email is mandatory'),
  location: Yup.string().required('Input at least one location'),
  // password: Yup.string()
  //   .min(8, 'Password must be grater 8 Character')
  //   .max(16, 'Password must not be grater 16 Character')
  //   .required('Password is mandatory'),
});

const AddUser = ({navigation}) => {
  //User Add
  const SignUpUser = async values => {
    const url = 'https://reitriver-render-api.onrender.com/addEmployee';

    const userData = {
      name: values.name,
      employeeId: values.employeeId,
      locations: [values.location],
    };

    console.log('This is user data:', userData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        console.error('Error details:', responseBody);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Formik
          initialValues={{name: '', location: '', employeeId: ''}}
          validationSchema={AddUserSchema}
          onSubmit={values => SignUpUser(values)}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <View style={addUserStyles.appContainer}>
              <View style={addUserStyles.formContainer}>
                <TextInput
                  style={addUserStyles.inputStyle}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Your Name"
                />
                {errors.name && touched.name && (
                  <Text style={addUserStyles.errorText}>{errors.name}</Text>
                )}
              </View>
              {/* <View style={addUserStyles.formContainer}>
                <TextInput
                  style={addUserStyles.inputStyle}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Your Email"
                />
                {errors.email && touched.email && (
                  <Text style={addUserStyles.errorText}>{errors.email}</Text>
                )}
              </View> */}
              {/* <View style={addUserStyles.formContainer}>
                <TextInput
                  style={addUserStyles.inputStyle}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Your Password"
                  // keyboardType="numeric"
                />
                {errors.password && touched.password && (
                  <Text style={addUserStyles.errorText}>{errors.password}</Text>
                )}
              </View> */}
              <View style={addUserStyles.formContainer}>
                <TextInput
                  style={addUserStyles.inputStyle}
                  value={values.password}
                  onChangeText={handleChange('employeeId')}
                  placeholder="Your Employee Id"
                  // keyboardType="numeric"
                />
                {errors.employeeId && touched.employeeId && (
                  <Text style={addUserStyles.errorText}>
                    {errors.employeeId}
                  </Text>
                )}
              </View>
              <View style={addUserStyles.formContainer}>
                <TextInput
                  style={addUserStyles.inputStyle}
                  value={values.location}
                  onChangeText={handleChange('location')}
                  placeholder="Your Locations"
                  // keyboardType="numeric"
                />
                {errors.location && touched.location && (
                  <Text style={addUserStyles.errorText}>{errors.location}</Text>
                )}
              </View>
              {React.useEffect(() => {
                navigation.setOptions({
                  headerRight: () => (
                    <Pressable onPress={handleSubmit} style={{marginRight: 15}}>
                      <Icon
                        name="check"
                        size={25}
                        color={themeColors.bgLight}
                      />
                    </Pressable>
                  ),
                });
              }, [navigation])}
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddUser;
