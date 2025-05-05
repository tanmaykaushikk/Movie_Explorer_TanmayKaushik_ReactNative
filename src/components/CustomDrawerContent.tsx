import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

const CustomDrawerContent = (props: any) => {
const{navigation} = props;

  return (
    <LinearGradient
      colors={['rgba(28, 28, 28, 0.94)', 'rgb(0, 3, 6)']}
      style={styles.gradient}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginPage')}
            testID="login-button"
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignupPage')}
               testID="signup-button"
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Premium")}
             testID="premium-button"
          >
            <Text style={styles.buttonText}>Premium</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: wp(5),
    justifyContent: 'center',
  },
  button: {
    paddingVertical: hp(2),
    marginVertical: hp(1),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: 'bold',
  },
});
