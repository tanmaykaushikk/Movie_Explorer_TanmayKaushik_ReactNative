// store/moviesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllMovies, getMoviesByGenre } from '../utils/Api';

interface Movie {
  // Your existing Movie interface
  
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

interface MoviesState {
  allMovies: Movie[];
  trending: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  allMovies: [],
  trending: [],
  upcoming: [],
  topRated: [],
  status: 'idle',
  error: null,
};

export const fetchAllMovies = createAsyncThunk('movies/fetchAll', async () => {
  const response = await getAllMovies();
  return response.movies;
});

export const fetchGenreMovies = createAsyncThunk(
  'movies/fetchByGenre',
  async (genre: string) => {
    const response = await getMoviesByGenre(genre);
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.allMovies = action.payload;
        state.trending = action.payload.slice(0, 5);
        state.upcoming = action.payload.slice(5, 10);
        state.topRated = action.payload.slice(5, 10);
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default moviesSlice.reducer;