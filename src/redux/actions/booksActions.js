import axios from 'axios';
import { 
  fetchBooksBegin, fetchBooksSuccess, fetchBooksFailure,
  commentOnBookSuccess
} from '../slices/booksSlice';

const BASE_API_URL = 'http://localhost:3000';
const getToken = () => localStorage.getItem('token');

export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksBegin());
  try {
    const response = await axios.get(`${BASE_API_URL}/books`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    dispatch(fetchBooksSuccess(response.data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.response?.data?.errors || ['Failed to fetch books']));
  }
};

export const fetchMyBooks = () => async (dispatch) => {
  dispatch(fetchBooksBegin());
  try {
    const response = await axios.get(`${BASE_API_URL}/my_books`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    dispatch(fetchBooksSuccess(response.data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.response?.data?.errors || ['Failed to fetch my books']));
  }
};


export const addComment = (bookId, body) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/books/${bookId}/comments`,
      { body },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    dispatch(commentOnBookSuccess({ bookId, comment: response.data }));
  } catch (error) {
    console.error('Failed to add comment:', error);
  }
};

export const createBook = (bookData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/books`, bookData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
