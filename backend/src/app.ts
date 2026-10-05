import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import postsRouter from "./routes/posts";
import { notFound } from "./controllers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Главная страница — краткая справка по API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API ленты постов",
    endpoints: {
      posts: "/posts",
      postComments: "/posts/:id/comments",
      likePost: "POST /posts/:id/like",
    },
  });
});

app.use("/posts", postsRouter);
app.use(notFound);

app.listen(port, () => {
  console.log(`сервер запущен на http://localhost:${port}`);
});
