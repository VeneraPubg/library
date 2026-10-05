import { posts, Post, comments, Comment } from "./data.js";

export function getPosts(): Post[] {
  return posts;
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function createPost(
  title: string,
  content: string,
  author: string,
  tags: string[]
): Post {
  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    author,
    tags,
    views: 0,
    likes: 0,
    isPublished: true,
    createdAt: new Date(),
    likedBy: [], // ← ДОБАВИЛИ
  };
  posts.push(newPost);
  return newPost;
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}

export function getCommentsByPostId(postId: string): Comment[] {
  return comments.filter((c) => c.postId === postId);
}

// ─── Лайки ────────────────────────────────────────────
export function likePost(id: string, userId: string): Post | undefined {
  const post = posts.find((p) => p.id === id);
  if (!post) return undefined;

  if (!post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likes = post.likedBy.length;
  }
  return post;
}

export function unlikePost(id: string, userId: string): Post | undefined {
  const post = posts.find((p) => p.id === id);
  if (!post) return undefined;

  post.likedBy = post.likedBy.filter((u) => u !== userId);
  post.likes = post.likedBy.length;
  return post;
}

// ─── Комментарии ──────────────────────────────────────
export function addComment(
  postId: string,
  author: string,
  content: string
): Comment | undefined {
  const post = posts.find((p) => p.id === postId);
  if (!post) return undefined;

  const newComment: Comment = {
    id: Date.now().toString(),
    postId,
    author,
    content,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  return newComment;
}
