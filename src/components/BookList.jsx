import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchMyBooks, createBook, addComment } from "../redux/actions/booksActions";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

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

  if (loading) return <p style={{ textAlign: "center", color: "gray" }}>Loading books...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={styles.heading}>Welcome, {user.name}</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      {user.role === "author" && (
        <div style={styles.formBox}>
          <h3 style={{ marginBottom: "10px" }}>Create a new book</h3>
          <form onSubmit={handleCreateBook}>
            <input
              type="text"
              placeholder="Book title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Book description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Book content"
              value={newBook.content}
              onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="date"
              placeholder="Publish Date"
              value={newBook.published_at || ""}
              onChange={(e) => setNewBook({ ...newBook, published_at: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Create Book</button>
          </form>
        </div>
      )}

      <div>
        <h3 style={{ marginBottom: "15px" }}>Books</h3>
        {books.map((book) => (
          <div key={book.id} style={styles.bookCard}>
            <h4 style={styles.bookTitle}>{book.title}</h4>
            <p style={styles.bookDesc}><strong>Description:</strong> {book.description}</p>
            <p style={styles.bookDesc}><strong>Content:</strong> {book.content}</p>
            {book.published_at && (
              <p style={styles.bookDesc}>
                <strong>Published At:</strong> {new Date(book.published_at).toLocaleDateString()}
              </p>
            )}
            <p style={styles.author}>By {book.author_name}</p>

            <div style={styles.commentsBox}>
              <h5 style={{ marginBottom: "5px" }}>Comments</h5>
              {book.comments?.map((c) => (
                <p key={c.id} style={styles.commentText}>
                  <span style={styles.commentUser}>{c.user_name}:</span> {c.body}
                </p>
              ))}
              <div style={styles.commentRow}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comments[book.id] || ""}
                  onChange={(e) => handleInputChange(book.id, e.target.value)}
                  style={styles.commentInput}
                />
                <button
                  onClick={() => handleAddComment(book.id)}
                  style={styles.buttonSmall}
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
 
 const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    logoutButton: {
      padding: "8px 12px",
      background: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      float: "right",
    },
    formBox: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      padding: "10px 15px",
      background: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonSmall: {
      padding: "6px 12px",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
    },
    bookCard: {
      background: "#f9f9f9",
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "20px",
    },
    bookTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#222",
      marginBottom: "5px",
    },
    bookDesc: { fontSize: "14px", color: "#555", marginBottom: "5px" },
    author: { fontSize: "12px", color: "#666" },
    commentsBox: {
      marginTop: "10px",
      padding: "10px",
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "6px",
    },
    commentText: { fontSize: "13px", margin: "4px 0", color: "#333" },
    commentUser: { fontWeight: "bold", marginRight: "5px" },
    commentInput: {
      flex: 1,
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "13px",
    },
    commentRow: { display: "flex", gap: "8px", marginTop: "8px" },
  };