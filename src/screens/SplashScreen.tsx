import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

const SplashScreen:React.FC = () => {
    const navigation = useNavigation();

    const handleStart = async() => {
      try{
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
      }
      catch(error){
        console.log("failed to clear the storage",error);
      }
      navigation.navigate("HomePage");
    };

  return (
    <ImageBackground
      source={require("../assets/Images/loginbackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgb(56, 53, 53)", "rgba(9, 43, 56, 0.3)"]}
        style={styles.gradient}
      >
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={handleStart}>
                    Let's Start
                </Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(10),
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(60),
  },
  
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: hp(2),
    paddingHorizontal: wp(10),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: 'white',
  },
  
  buttonText: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
