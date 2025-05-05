// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { LinearGradient } from "expo-linear-gradient";
// import TrendingMoviesCarousel from "../components/TrendingMoviesCarousel";
// import MovieList from "../components/MovieList";
// import { DrawerActions , useNavigation } from "@react-navigation/native";
// import MenuModal from "../components/MenuModal";
// const { width, height } = Dimensions.get("window");

// const wp = (percent: number) => (width * percent) / 100;
// const hp = (percent: number) => (height * percent) / 100;

// const AdminScreen = () => {
//   const navigation = useNavigation();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(true);

//   const dummyMovies = [
//     {
//       id: 1,
//       title: "Batman",
//       genre: "Sci-Fi",
//       releaseYear: 2022,
//       rating: 8.5,
//       director: "Jane Doe",
//       duration: "2h 15m",
//       description: "In a future where sound is forbidden, a rebel group fights to bring back music.",
//       posterImage: require("../assets/Images/poster1.jpg"),
//     },
//     {
//       id: 2,
//       title: "Psycho",
//       genre: "Thriller",
//       releaseYear: 2021,
//       rating: 7.8,
//       director: "John Smith",
//       duration: "1h 50m",
//       description: "A detective unravels dark secrets in a small town haunted by unsolved murders.",
//       posterImage: require("../assets/Images/poster2.jpg"),
//     },
//     {
//       id: 3,
//       title: "Deadpool",
//       genre: "Drama",
//       releaseYear: 2023,
//       rating: 8.2,
//       director: "Anna Lee",
//       duration: "2h 5m",
//       description: "A heart-warming story about a young artist chasing dreams through hardships.",
//       posterImage: require("../assets/Images/poster3.jpg"),
//     },
//     {
//       id: 4,
//       title: "John Wick",
//       genre: "Action",
//       releaseYear: 2024,
//       rating: 8.9,
//       director: "Chris Nolan",
//       duration: "2h 30m",
//       description: "Master thieves plot the greatest heist across parallel universes.",
//       posterImage: require("../assets/Images/poster4.jpg"),
//     },
//     {
//       id: 5,
//       title: "Joker",
//       genre: "Fantasy",
//       releaseYear: 2020,
//       rating: 7.5,
//       director: "Ella Stone",
//       duration: "1h 45m",
//       description: "A young girl discovers a hidden world within an ancient forest.",
//       posterImage: require("../assets/Images/poster5.jpg"),
//     },
//   ]
//   const [trending, setTrending] = useState(dummyMovies);
//   const [upcomping, setUpcomping] = useState(dummyMovies);
//   const [topRated, setTopRated] = useState(dummyMovies);

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={["rgba(28, 28, 28, 0.94)", "rgb(0, 3, 6)"]}
//         style={styles.gradient}
//       >
//         <SafeAreaView>
//           <StatusBar style="light" />
//           <View style={styles.headerBar}>
//             <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
//               <Image
//                 source={require("../assets/Images/user.png")}
//                 style={styles.userImage}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//             <View style={styles.searchBar}>
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Ready for a movie adventure?"
//                 placeholderTextColor="silver"
//               />
//             </View>
//             <TouchableOpacity onPress={()=> navigation.navigate("Edit")}>
//               <Image
//                 source={require("../assets/Images/pen.png")}
//                 style={styles.menuImage}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//           </View>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: hp(5) }}
//           >
//             {/*Trending Movies Carousel */}
//             <View style={{ marginBottom: hp(-10) }}>
//               <TrendingMoviesCarousel isAdmin={isAdmin} data={trending} handleClick={(item) => navigation.navigate('Movie',{movie:item})}/>
//             </View>
//             {/* upcomping movies*/}
//             <MovieList title="Upcoming Movies" isAdmin={isAdmin} data={upcomping} handleClick={(item) => navigation.navigate('Movie',{movie:item})}/>

//              {/* top-rated movies*/}
//              <MovieList title="Top-Rated Movies" isAdmin={isAdmin}  data={topRated} handleClick={(item) => navigation.navigate('Movie',{movie:item})}/>
//           </ScrollView>
//         </SafeAreaView>
//           <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
//       </LinearGradient>
//     </View>
//   );
// };

// export default AdminScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//     paddingHorizontal: wp(5),
//     paddingTop: hp(5),
//   },
//   headerBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: wp(100),
//     marginBottom: hp(3),
//     height: hp(8),
//   },
//   userImage: {
//     width: wp(10),
//     height: hp(10),
//     borderRadius: wp(10) / 2,
//   },
//   searchBar: {
//     width: wp(60),
//     height: hp(6),
//     borderRadius: wp(15),
//     borderWidth: 1,
//     borderColor: "silver",
//   },
//   searchInput: {
//     flex: 1,
//     paddingHorizontal: wp(4),
//     color:"silver"
//   },
//   menuImage: {
//     width: wp(10),
//     height: hp(10),
//     borderRadius: wp(10) / 2,
//     marginRight: wp(8),
//   },
// });
