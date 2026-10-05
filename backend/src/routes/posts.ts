import { Router } from "express";
import {
  getAllPosts,
  getPost,
  createNewPost,
  removePost,
  getPostComments,
  likePost,
  unlikePost,
  addComment,
} from "../controllers.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createNewPost);
router.get("/:id", getPost);
router.delete("/:id", removePost);

router.get("/:id/comments", getPostComments);
router.post("/:id/comments", addComment);

router.post("/:id/like", likePost);
router.delete("/:id/like", unlikePost);

export default router;
