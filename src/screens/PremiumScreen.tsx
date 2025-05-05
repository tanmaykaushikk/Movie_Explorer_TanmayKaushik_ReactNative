import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

const PremiumScreen = () => {
  return (
    <ImageBackground style={styles.container} source={require("../assets/Images/loginbackground.jpg")}>
      <LinearGradient
        colors={["rgb(37, 36, 36)", "rgba(2, 16, 22, 0.92)"]}
        style={styles.gradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Go Premium</Text>
          <Text style={{color:"white"}}>No Commitment. Cancel Anytime</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.planContainer}>
            <View style={styles.planName}>
              {/* <Text style={styles.planTitle}>Normal Plan</Text> */}
            </View>
            <View style={styles.priceContainer}>
              {/* <Text style={styles.price}> $9.99</Text> */}
              {/* <Text style={styles.permonth}>/month</Text> */}
            </View>
            <View style={styles.planBox}>
              <Text style={styles.planDetails}>Basic Features Access</Text>
              <Text style={styles.planDetails}>Standard Quality </Text>
              <Text style={styles.planDetails}>Add-free experience</Text>
              <Text style={styles.planDetails}>Single Device Support</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity>
                  <Text style={styles.choosePlan}>Subscribe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.planContainer}>
            <View style={styles.planName}>
              {/* <Text style={styles.planTitle}>Super Plan</Text> */}
            </View>
            <View style={styles.priceContainer}>
              {/* <Text style={styles.price}> $19.99</Text> */}
              {/* <Text style={styles.permonth}>/month</Text> */}
            </View>
            <View style={styles.planBox}>
            <Text style={styles.planDetails}>All Basic Features</Text>
              <Text style={styles.planDetails}>Premium Quality</Text>
              <Text style={styles.planDetails}>Multi-Device Support</Text>
              <Text style={styles.planDetails}>Priority Services</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity>
                  <Text style={styles.choosePlan}>Subscribe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode:"cover",
    justifyContent:"center"
  },
  gradient: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop:hp(5),
    marginBottom: hp(1),
    textAlign: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  planContainer: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    height: hp(50),
    margin: 5,
    marginBottom: hp(2),
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: hp(2),
    // backgroundColor:"yellow",
  },
  planTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: hp(2),
  },
  price: {
    fontSize: 30,
    color: "white",
  },
  priceContainer: {
    // backgroundColor: "red",
    borderRadius: 10,
    height: hp(10),
    width: wp(50),
    flexDirection: "row",
    top: -hp(3),
  },
  permonth: {
    marginTop: hp(1),
    color:"white"
  },
  planBox: {
    height: hp(40),
    width: wp(70),
    borderRadius: 10,
    top: -hp(7),
    left: wp(3),
    // borderWidth: 1,
    borderColor: "white",
    backgroundColor:"black"
  },
  planDetails: {
    fontSize: 18,
    color: "white",
    marginBottom: hp(1),
    marginLeft: wp(2),
    left: wp(10),
    top: hp(2),
  },
  btnContainer: {
    backgroundColor: "transparent",
    height: hp(8),
    width: wp(60),
    left: wp(5),
    top: hp(3),
    borderRadius: 10,
    borderWidth:1,
    borderColor:"white",
    justifyContent: "center", 
    alignItems: "center",
    marginTop:hp(5)
  },
  choosePlan: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
