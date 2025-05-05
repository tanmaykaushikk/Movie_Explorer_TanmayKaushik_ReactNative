import React, { useState , useEffect, useRef } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationProp,ParamListBase } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  GenreMovies : {genre:string};
  [key: string]: any | undefined;
}


type MenuModalProps = {
  visible: boolean;
  onClose: () => void;
  navigation: NavigationProp<RootStackParamList>;
};

const MenuModal: React.FC<MenuModalProps>= ({ visible, onClose , navigation }) => {
  const translateY = useRef(new Animated.Value(height)).current;

  const handleGenrePress = (genre: string) => {
    onClose();
    setTimeout(() => {
      navigation.navigate("GenreMovies", { genre });
    }, 100);
    // console.log("calleddddddddddddddddddddddddddddddd");
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(height);
      Animated.timing(translateY, {
        toValue: height * 0.2,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const genres = [
    "Si-Fi",
    "Action", "Thriller", "Comedy",
    "Romance",
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay} pointerEvents="box-none">
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          {/* Add LinearGradient here */}
          <LinearGradient
            colors={["rgb(56,53,53)", "rgba(1, 11, 15, 0.95)"]}
            style={styles.gradient}
          />
          
          <Text style={styles.modalTitle}>What types of genre are you most interested in?</Text>
          <Text style={styles.subtitle}>This will help us provide accurate recommendations</Text>

          <View style={styles.gridContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.gridItem}
                onPress={() => handleGenrePress(genre)}
                // onPress={() => navigation.navigate("GenreMovies", { genre: "Action" })}
              >
                <Text style={styles.gridText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: width,
    height: height * 0.8,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: "hidden", 
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", 
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 25,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "45%",
    height: 60,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  gridText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF", 
    textAlign: "center",
  },
});

export default MenuModal;