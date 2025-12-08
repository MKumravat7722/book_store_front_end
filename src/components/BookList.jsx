import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchMyBooks, createBook, addComment } from "../redux/actions/booksActions";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import "./BookList.css";

export default function BookList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: books, loading, error } = useSelector((state) => state.books);

  const [newBook, setNewBook] = useState({ title: "", description: "", content: "" });
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (!user) return navigate("/login");
    user.role === "author" ? dispatch(fetchMyBooks()) : dispatch(fetchBooks());
  }, [user, dispatch, navigate]);

  const handleCreateBook = async (e) => {
    e.preventDefault();
    await dispatch(createBook(newBook));
    setNewBook({ title: "", description: "", content: "" });
    dispatch(fetchMyBooks());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddComment = async (bookId) => {
    if (!comments[bookId]) return;
    await dispatch(addComment(bookId, comments[bookId]));
    setComments((prev) => ({ ...prev, [bookId]: "" }));
  };

  const handleInputChange = (bookId, value) => {
    setComments((prev) => ({ ...prev, [bookId]: value }));
  };

  if (loading) return <p className="booklist-loading">Loading books...</p>;
  if (error) return <p className="booklist-error">{error}</p>;

  return (
    <div className="booklist-container">
      <div className="booklist-header">
        <h2 className="booklist-heading">Welcome, {user.name}</h2>
        <button className="booklist-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {user.role === "author" && (
        <div className="booklist-form-box">
          <h3 className="booklist-form-title">Create a new book</h3>
          <form onSubmit={handleCreateBook}>
            <input
              type="text"
              placeholder="Book title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="booklist-input"
              required
            />
            <textarea
              placeholder="Book description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className="booklist-input booklist-textarea"
              required
            />
            <textarea
              placeholder="Book content"
              value={newBook.content}
              onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
              className="booklist-input booklist-textarea"
              required
            />
            <input
              type="date"
              placeholder="Publish Date"
              value={newBook.published_at || ""}
              onChange={(e) => setNewBook({ ...newBook, published_at: e.target.value })}
              className="booklist-input"
            />
            <button type="submit" className="booklist-btn">
              Create Book
            </button>
          </form>
        </div>
      )}

      <div>
        <h3 className="booklist-section-title">Books</h3>
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h4 className="book-title">{book.title}</h4>
            <p className="book-text">
              <strong>Description:</strong> {book.description}
            </p>
            <p className="book-text">
              <strong>Content:</strong> {book.content}
            </p>
            {book.published_at && (
              <p className="book-text">
                <strong>Published At:</strong>{" "}
                {new Date(book.published_at).toLocaleDateString()}
              </p>
            )}
            <p className="book-author">By {book.author_name}</p>

            <div className="comments-box">
              <h5 className="comments-title">Comments</h5>
              {book.comments?.map((c) => (
                <p key={c.id} className="comment-text">
                  <span className="comment-user">{c.user_name}:</span> {c.body}
                </p>
              ))}
              <div className="comment-row">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comments[book.id] || ""}
                  onChange={(e) => handleInputChange(book.id, e.target.value)}
                  className="comment-input"
                />
                <button
                  onClick={() => handleAddComment(book.id)}
                  className="comment-btn"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

