import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://movie-explorer-ror-aalekh-2ewg.onrender.com"; // Replace with your actual API base URL

interface UserResponse {
  id: number;
  email: string;
  role: string;
  token: string;
}

interface UserPayload {
  email: string;
  password: string;
}

export const loginAPI = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  try {
    const response = await axios.post(
      `${BASE_URL}/users/sign_in`,
      { user: { email, password } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const userData: UserResponse = { ...response.data };
    console.log("heloooooooooooooooooooooooooo", userData)

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("token", userData.token);
    return userData;
  } catch (error) {
    console.log("Error Occurred while Signing In: ", error);
    throw new Error("Login failed.");
  }
};

export const signup = async (payload: {
  name: string;
  email: string;
  password: string;
  mobile_number: string;
}) => {
  const { name, email, password, mobile_number } = payload;

  try {
    const response = await axios.post(
      `${BASE_URL}/users`,
      { user: { name, email, password, mobile_number } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const newUser = response.data;
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  } catch (error: any) {
    console.error("Error Occurred while Signing Up:", error);
    const errorMessage = error.response?.data?.errors;
    console.log("ERROR MESSAGE: ", error.response?.data?.errors);
  }
};

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

export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/movies`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const movies: Movie[] = response.data;
    console.log("fetched movies", movies);

    return movies;
  } catch (error: any) {
    console.log("error ", error.message);
  }
};

export const getMoviesById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const movie: Movie = response.data;
    console.log("Fetched movie by ID:", movie);
    return movie;
  } catch (error: any) {
    console.error(`Error fetching movie with ID ${id}:`, error.message);
    return null;
  }
};

export const getMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/movies`, {
      params: {
        genre,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const movies: Movie[] = response.data.movies || [];
    console.log(`Fetched movies for genre ${genre}:`, movies);
    return movies;
  } catch (error: any) {
    console.error(Error`fetching movies for genre ${genre}:`, error.message);
    return [];
  }
};



export const searchMovies = async (title: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/movies`, {
      params: {
        title,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const movies: Movie[] = response.data.movies || [];
    console.log(`Fetched movies for genre ${title}:`, movies);
    return movies;
  } catch (error: any) {
    console.error(Error`fetching movies for genre ${title}:`, error.message);
    return [];
  }
};


interface MovieFormData {
  title: string;
  genre: string;
  release_year: string;
  director: string;
  duration: string;
  description: string;
  main_lead: string;
  streaming_platform: string;
  rating: string;
  poster_url: File ;
  banner_url: File ;
  isPremium: boolean;
}


export const createMovie = async (formData: MovieFormData): Promise<Movie | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Retrieved token:", token); 
    if (!token) {
      alert("You need to sign in first.");
      throw new Error("No authentication token found");
    }

    const movieFormData = new FormData();
    movieFormData.append("movie[title]", formData.title);
    movieFormData.append("movie[genre]", formData.genre);
    movieFormData.append("movie[release_year]", formData.release_year);
    movieFormData.append("movie[director]", formData.director);
    movieFormData.append("movie[duration]", formData.duration);
    movieFormData.append("movie[description]", formData.description);
    movieFormData.append("movie[main_lead]", formData.main_lead);
    movieFormData.append("movie[streaming_platform]", formData.streaming_platform);
    movieFormData.append("movie[rating]", formData.rating);
    movieFormData.append("movie[premium]", String(formData.isPremium));
    if (formData.poster_url) {
      movieFormData.append("movie[poster]", formData.poster_url);
    }
    if (formData.banner_url) {
      movieFormData.append("movie[banner]", formData.banner_url);
    }

    const response = await axios.post(`${BASE_URL}/api/v1/movies`, movieFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    const movie: Movie = response.data.movie;
    console.log("Movie created successfully:", movie);
    return movie;
  } catch (error: any) {
    console.error("Error creating movie:", error.message, error.response?.data);
    const errorMessage = error.response?.data?.error || "Failed to create movie";
    console.error(errorMessage);
    return null;
  }
};




export const deleteMovie = async (id: number): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Retrieved token:", token);
    if (!token) {
      alert("You need to sign in first.");
      throw new Error("No authentication token found");
    }

    await axios.delete(`${BASE_URL}/api/v1/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log(`Movie with ID ${id} deleted successfully`);
    alert("Movie deleted successfully!");
    return true;
  } catch (error: any) {
    console.error("Error deleting movie:", error.message, error.response?.data);
    const errorMessage = error.response?.data?.error || "Failed to delete movie";
    alert(errorMessage);
    return false;
  }
};