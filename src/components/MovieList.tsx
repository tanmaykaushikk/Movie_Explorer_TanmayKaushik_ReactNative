import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const { width, height } = Dimensions.get("window");

interface MovieItem {
  // id: number;
  // title: string;
  // genre: string;
  // release_year: number;
  // rating: number;
  // director: string;
  // duration: string;
  // description: string;
  // poster_url: any;

  id: number;
    title: string;
    genre: string;
    release_year: number;
    rating: number;
    director: string;
    duration: number;
    description: string;
    premium: boolean;
    main_lead: string;
    streaming_platform: string;
    poster_url: string;
    banner_url: string;
}

interface MovieListProps {
  title: string;
  data: MovieItem[];
  handleClick: (item: MovieItem) => void;
  isAdmin:boolean;
}


type NavigationParamList = {
  SeeAll: { title: string; movies: MovieItem[] };
  Movie: { movie: MovieItem };
};



const MovieList: React.FC<MovieListProps> = ({ title, data ,handleClick,isAdmin}) => {
  const movieName = "Movie Name";
  const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("SeeAll" , {title,movies:data})}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      >
        {data.map((item) => {
          return (
            <TouchableWithoutFeedback key={item.id} onPress={() => handleClick(item)}>
              <View style={styles.movieImageContainer}>
                <Image source={{ uri: item.poster_url }} style={styles.movieImage}/>

                {item.premium && (
      <Image
        source={require("../assets/Images/crown.png")}
        style={styles.premiumIcon}
        resizeMode="contain"
      />
    )}
                {isAdmin && (
                <Image style={styles.edit} source={require("../assets/Images/pen.png")} />
              )}
                <Text style={styles.movieName}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
    paddingVertical: 8,
  },
  titleText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  seeAll: {
    color: "silver",
    fontSize: 12,
    fontWeight: "bold",
  },
  movieName: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 4,
  },
  movieImageContainer: {
    marginRight: 15,
    width: width * 0.3,
    height: width * 0.55,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  movieImage:{
    width: 120,
    height: 170,
  },
  edit: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  premiumIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    zIndex: 2,
  },
});
