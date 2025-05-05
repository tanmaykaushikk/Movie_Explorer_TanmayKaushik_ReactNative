import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import TrendingMoviesCarousel from "../components/TrendingMoviesCarousel";
import MovieList from "../components/MovieList";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMovies, getMoviesByGenre, searchMovies } from "../utils/Api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");
const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

export type RootStackParamList = {
  Movie: { movie: any };
  GenreMovies: { genre: string };
  Edit: undefined;
  [key: string]: any | undefined;
};

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  interface Movie {
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

  const [trending, setTrending] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const genres = ["Action", "Comedy", "Drama", "Thriller", "Si-Fi"];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          setIsAdmin(user?.role === "supervisor");
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsAdmin(false);
      }

      const allMovies: any = await getAllMovies();
      if (allMovies && Array.isArray(allMovies.movies)) {
        setMovies(allMovies.movies);
        setTrending(allMovies.movies.slice(0, 5));
        setUpcoming(allMovies.movies.slice(5, 10));
        setTopRated(allMovies.movies.slice(5, 10));
      }

      const genreResults: Record<string, Movie[]> = {};
      for (const genre of genres) {
        const moviesForGenre = await getMoviesByGenre(genre);
        genreResults[genre] = moviesForGenre;
      }
      setGenreMovies(genreResults);

      setLoading(false);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setMenuVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text.length > 1) {
      const results = await searchMovies(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="silver" />
        <Text style={styles.loaderText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(28, 28, 28, 0.94)", "rgb(0, 3, 6)"]}
        style={styles.gradient}
      >
        <SafeAreaView>
          <StatusBar style="light" />
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image
                source={require("../assets/Images/user.png")}
                style={styles.userImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Ready for a movie adventure?"
                placeholderTextColor="silver"
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>

            {isAdmin ? (
              <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
                <Image
                  source={require("../assets/Images/pen.png")}
                  style={styles.editIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("Premium")}
              >
                <Image
                  source={require("../assets/Images/icons8-subscription-64.png")}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp(5) }}
          >
            {searchText.length > 1 ? (
              <MovieList
                title={`Search Results for "${searchText}"`}
                isAdmin={isAdmin}
                data={searchResults}
                handleClick={(item) =>
                  navigation.navigate("Movie", { movie: item })
                }
              />
            ) : (
              <>
                {/*Trending Movies Carousel */}
                <View style={{ marginBottom: hp(-10) }}>
                  <TrendingMoviesCarousel
                    isAdmin={isAdmin}
                    data={trending}
                    handleClick={(item) =>
                      navigation.navigate("Movie", { movie: item })
                    }
                  />
                </View>

                {/* Upcoming Movies */}
                <MovieList
                  title="Upcoming Movies"
                  isAdmin={isAdmin}
                  data={upcoming}
                  handleClick={(item) =>
                    navigation.navigate("Movie", { movie: item })
                  }
                />

                {/* Top-Rated Movies */}
                <MovieList
                  title="Top-Rated Movies"
                  isAdmin={isAdmin}
                  data={topRated}
                  handleClick={(item) =>
                    navigation.navigate("Movie", { movie: item })
                  }
                />

                {/* For You */}
                <MovieList
                  title="For You"
                  isAdmin={isAdmin}
                  data={topRated}
                  handleClick={(item) =>
                    navigation.navigate("Movie", { movie: item })
                  }
                />

                {/* Genre-based lists */}
                {Object.entries(genreMovies).map(([genre, movies]) => (
                  <MovieList
                    key={genre}
                    title={`${genre} Movies`}
                    isAdmin={isAdmin}
                    data={movies}
                    handleClick={(item) =>
                      navigation.navigate("Movie", { movie: item })
                    }
                  />
                ))}
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(100),
    height: hp(8),
  },
  userImage: {
    width: wp(10),
    height: hp(10),
    borderRadius: wp(10) / 2,
  },
  searchBar: {
    width: wp(60),
    height: hp(6),
    borderRadius: wp(15),
    borderWidth: 1,
    borderColor: "silver",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    color: "silver",
  },
  menuImage: {
    width: wp(15),
    height: hp(15),
    borderRadius: wp(10) / 2,
    marginRight: wp(8),
  },
  editIcon: {
    width: wp(8),
    height: hp(8),
    tintColor: "silver",
    marginRight: wp(8),
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: hp(2),
    color: "silver",
    fontSize: 16,
  },
  moviePosterContainer: {
    position: "relative",
  },
  moviePoster: {
    width: wp(40),
    height: hp(25),
    borderRadius: 10,
  },
  premiumIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    width: wp(8),
    height: hp(8),
  },
});

