import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { createMovie } from "../utils/Api"; 
import { useRoute } from "@react-navigation/native";
import { deleteMovie } from "../utils/Api";

const { height, width } = Dimensions.get("window");

const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

const EditScreen = () => {

  const route = useRoute();
const { id } = (route.params || {}) as { id: number };

  const [form, setForm] = useState({
    // id:"",
    title: "",
    genre: "",
    release_year: "",
    director: "",
    duration: "",
    description: "",
    main_lead: "",
    streaming_platform: "",
    rating: "",
    posterPreview: "",
    posterFile: null as any,
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const fileUri = image.uri;
      const fileName = fileUri.split("/").pop() || "image.jpg";
      const fileType = fileName.split(".").pop();

      const file = {
        uri: fileUri,
        name: fileName,
        type: `image/${fileType}`,
      };

      setForm((prev) => ({
        ...prev,
        posterPreview: fileUri,
        posterFile: file,
      }));
    }
  };


  // const handleDelete = async (id: number) => {
  //   const confirmed = confirm("Are you sure you want to delete this movie?");
  //   if (!confirmed) return;
  
  //   const success = await deleteMovie(id);
  //   if (success) {
  //     alert("Movie deleted successfully.");
  //     // Possibly navigate away or refresh list, if needed.
  //   }
  // };
  
  
  

  const handleAdd = async () => {
    try {
      const movieFormData = {
        title: form.title,
        genre: form.genre,
        release_year: form.release_year,
        director: form.director,
        duration: form.duration,
        description: form.description,
        main_lead: form.main_lead,
        streaming_platform: form.streaming_platform,
        rating: form.rating,
        isPremium: false,
        poster: form.posterFile,
        banner: null,
      };

      const newMovie = await createMovie(movieFormData as any);
      if (newMovie) {
        alert("Movie added successfully!");
        setForm({
                  // id: "",
                  title: "",
                  genre: "",
                  release_year: "",
                  director: "",
                  duration: "",
                  description: "",
                  main_lead: "",
                  streaming_platform: "",
                  rating: "",
                  posterPreview: "",
                  posterFile: null,
                });
      }
    } catch (error) {
      console.error("Add Movie Error:", error);
      alert("Failed to add movie");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/loginbackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(108, 115, 118, 0.83)", "rgb(1, 25, 35)"]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Edit Movie Details</Text>

          {[
            { key: "title", placeholder: "Title" },
            { key: "genre", placeholder: "Genre" },
            { key: "release_year", placeholder: "Release Year", keyboardType: "numeric" },
            { key: "director", placeholder: "Director" },
            { key: "duration", placeholder: "Duration (e.g., 2h 15m)" },
            { key: "description", placeholder: "Description", multiline: true },
            { key: "main_lead", placeholder: "Main Lead Actor" },
            { key: "streaming_platform", placeholder: "Streaming Platform" },
            { key: "rating", placeholder: "Rating (e.g., 8.5)", keyboardType: "decimal-pad" },
          ].map((field) => (
            <TextInput
              key={field.key}
              style={[styles.input, field.multiline && styles.multilineInput]}
              placeholder={field.placeholder}
              placeholderTextColor="silver"
              value={form[field.key]}
              onChangeText={(text) => handleChange(field.key, text)}
              keyboardType={field.keyboardType || "default"}
              multiline={field.multiline || false}
            />
          ))}

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Pick Poster Image</Text>
            {form.posterPreview ? (
              <Image
                source={{ uri: form.posterPreview }}
                style={{ width: 100, height: 150, marginTop: 10 }}
              />
            ) : null}
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Movie</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Movie</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
    justifyContent: "center",
  },
  scrollContainer: {
    paddingBottom: hp(10),
  },
  heading: {
    fontSize: wp(6),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: hp(3),
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    fontSize: wp(4),
    marginBottom: hp(2),
    color: "white",
    height: hp(6),
  },
  multilineInput: {
    height: hp(12),
    textAlignVertical: "top",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: wp(2),
    alignItems: "center",
    marginBottom: hp(2),
  },
  imagePickerText: {
    color: "white",
    fontSize: wp(4),
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
    marginTop: hp(2),
  },
  buttonText: {
    color: "white",
    fontSize: wp(4),
    fontWeight: "600",
  },
});

