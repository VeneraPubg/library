import { useState, useEffect } from "react";
import Post from "./Post.jsx";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить посты");
        return res.json();
      })
      .then((response) => {
        if (!response.success) throw new Error("API вернул ошибку");
        setPosts(response.data.posts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (posts.length === 0) return <p>Постов пока нет</p>;

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          author={post.author}
          createdAt={post.createdAt}
          likes={post.likes}
        />
      ))}
    </div>
  );
}
