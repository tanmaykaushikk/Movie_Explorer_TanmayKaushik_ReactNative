import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const SeeAll: React.FC<{ route: any }> = ({ route }) => {
  const { title, movies } = route.params || {};
  const navigation = useNavigation();
  if (!movies) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No movies available</Text>
      </View>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 2;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginateMovies = (page: number) => {
    const start = (page - 1) * moviesPerPage;
    const end = page * moviesPerPage;
    return movies.slice(start, end);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={paginateMovies(currentPage)}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            {/* <Text style={styles.movieTitle}>{item.title}</Text> */}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Movie", { movie: item })}
            >
              <Image source={{ uri: item.poster_url }} style={styles.movieImage} />
            </TouchableWithoutFeedback>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationButton}>Previous</Text>
        </TouchableOpacity>
        <Text
          style={styles.pageNumber}
        >{`${currentPage} / ${totalPages}`}</Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.paginationButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  listContainer: {
    paddingBottom: 50,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
  },
  movieItem: {
    height: height * 0.4,
    width: width * 0.8,
    backgroundColor: "black",
    marginBottom: 10,
    padding: 10,
    // borderRadius: 50,
    marginLeft: 25,
    overflow: "hidden",
  },
  movieTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    bottom: 2,
    left: "35%",
    zIndex: 1,
  },
  movieImage: {
    height: height * 0.4,
    width: width * 0.8,
    marginTop: 10,
    position: "absolute",
    resizeMode: "contain",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  paginationButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    backgroundColor: "blue",
    height: 40,
    borderRadius: 20,
    paddingVertical: 5,
  },
  pageNumber: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SeeAll;
