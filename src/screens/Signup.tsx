import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../utils/Api";

const { width, height } = Dimensions.get("window");

const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

const Signup: React.FC = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [errors,setErrors] = useState<any>({});

  const dummyUser = {
    email: "test@gmail.com",
    password: "test@123",
  };

  const handleSignup =  async() => {
    let formErrors:any = {};
   
    if(!fullName)formErrors.fullName = "Full Name is required";
    if(!email) formErrors.email = "Email is required"
    if(!email.includes("@")) formErrors.email = "Please enter a valid email address"
    if(!password) formErrors.password = "Password is required"
    if(password.length < 8) formErrors.password = "Password must be at least 8 characters long"
    if(!phoneNumber) formErrors.phoneNumber = "Phone Number is required"
    if(phoneNumber.length < 10) formErrors.phoneNumber = "Phone Number must be at least 10 characters long"

    if(Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    try{
      const response = await signup({
        name:fullName,
        email,
        password,
        mobile_number:phoneNumber,
      });
      alert("User created successfully!");
     navigation.navigate("LoginPage");
    }catch(error:any){
      if (error.message.includes("Email")) {
        setErrors({ email: error.message });
      } else {
        alert(error.message || "Signup failed");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/loginbackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgb(56,53,53)", "rgba(9,43,56,0.75)"]}
        style={styles.gradient}
      >
        <View style={styles.signup}>
          <Text style={styles.signupText}>Create Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="silver"
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="silver"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="silver"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="silver"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

          {errors.userExists && <Text style={styles.errorText}>{errors.userExists}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => {
                navigation.navigate("LoginPage");
              }}
            >
              Log in
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Signup;

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
  signup: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(4),
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp(6.5),
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
    height: hp(6),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    fontSize: wp(4),
    marginBottom: hp(2),
    color: "white",
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
  },
  buttonText: {
    color: "white",
    fontSize: wp(4),
    fontWeight: "600",
  },
  loginRedirect: {
    marginTop: hp(2),
    alignItems: "center",
  },
  loginText: {
    color: "silver",
    fontSize: wp(3.8),
  },
  loginLink: {
    color: "#00BFFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: wp(3.5),
    marginBottom: hp(1),
  },
});
