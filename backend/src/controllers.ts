import { Request, Response } from "express";
import { posts, comments } from "./data.js";

// ─── Посты ────────────────────────────────────────────
export const getAllPosts = (req: Request, res: Response) => {
  res.json({ success: true, data: { posts } });
};

export const getPost = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const post = posts.find((p) => p.id === id);

  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }
  res.json({ success: true, data: post });
};

export const createNewPost = (req: Request, res: Response) => {
  const { content, author, title, tags } = req.body;

  if (!content) {
    res.status(400).json({ success: false, error: "Не передан контент" });
    return;
  }

  const newPost = {
    id: String(posts.length + 1),
    title: title || "",
    content,
    author: author || "Аноним",
    tags: tags || [],
    views: 0,
    likes: 0,
    isPublished: true,
    createdAt: new Date(),
    likedBy: [],
  };

  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
};

export const removePost = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  posts.splice(index, 1);
  res.status(204).send();
};

// ─── Лайки ────────────────────────────────────────────
export const likePost = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ success: false, error: "Не передан userId" });
    return;
  }

  const post = posts.find((p) => p.id === id);
  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  if (!post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likes = post.likedBy.length;
  }

  res.json({
    success: true,
    data: { likes: post.likes, likedBy: post.likedBy },
  });
};

export const unlikePost = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { userId } = req.body;

  const post = posts.find((p) => p.id === id);
  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  post.likedBy = post.likedBy.filter((u) => u !== userId);
  post.likes = post.likedBy.length;

  res.json({
    success: true,
    data: { likes: post.likes, likedBy: post.likedBy },
  });
};

// ─── Комментарии ──────────────────────────────────────
export const getPostComments = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const post = posts.find((p) => p.id === id);

  if (!post) {
    res.status(404).json({ success: false, error: "Пост не найден" });
    return;
  }

  const postComments = comments.filter((c) => c.postId === id);
  res.json({ success: true, data: { comments: postComments } });
};

export const addComment = (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { author, content } = req.body;

  if (!content) {
    res.status(400).json({ success: false, error: "Не передан контент" });
    return;
  }

  const post = posts.find((p) => p.id === id);
  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  const newComment = {
    id: String(comments.length + 1),
    postId: id,
    author: author || "Аноним",
    content,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  res.status(201).json({ success: true, data: newComment });
};

// ─── 404 ──────────────────────────────────────────────
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Маршрут ${req.method} ${req.path} не найден`,
  });
};
