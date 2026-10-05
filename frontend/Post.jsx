import { useState, useEffect } from "react";

export default function Post({
  id,
  content,
  author,
  createdAt,
  likes: initialLikes,
}) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const formattedDate = new Date(createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    if (!showComments) return;
    fetch(`http://localhost:3000/posts/${id}/comments`)
      .then((res) => res.json())
      .then((response) => setComments(response.data.comments))
      .catch((err) => console.error(err));
  }, [showComments, id]);

  const handleLike = () => {
    const userId = "user-1";
    const method = liked ? "DELETE" : "POST";

    fetch(`http://localhost:3000/posts/${id}/like`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((response) => {
        setLikes(response.data.likes);
        setLiked(!liked);
      })
      .catch((err) => console.error(err));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    fetch(`http://localhost:3000/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "Пользователь", content: commentText }),
    })
      .then((res) => res.json())
      .then((response) => {
        setComments([...comments, response.data]);
        setCommentText("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <article className="card">
      <header className="header">
        <div className="avatar">{author?.[0]?.toUpperCase() || "?"}</div>
        <div className="authorInfo">
          <div className="authorName">{author || "Аноним"}</div>
          <div className="authorHandle">
            @{author || "anon"} · {formattedDate}
          </div>
        </div>
      </header>

      <p className="content">{content}</p>

      <footer className="actions">
        <button
          onClick={handleLike}
          className="actionButton"
          style={{ color: liked ? "#e0245e" : undefined }}
        >
          {liked ? "❤" : "🤍"} {likes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="actionButton"
        >
          💬 {comments.length}
        </button>

        <button className="actionButton">🔁 0</button>
      </footer>

      {showComments && (
        <div className="commentsBlock">
          {comments.map((c) => (
            <div key={c.id} className="comment">
              <div className="commentAuthor">{c.author}</div>
              <div className="commentContent">{c.content}</div>
            </div>
          ))}

          <form onSubmit={handleAddComment} className="commentForm">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Написать комментарий..."
              className="commentInput"
            />
            <button type="submit" className="commentSubmit">
              Отправить
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
