import express from "express"

import { createPost, deletePost, getAllPosts, getPostDetail, updatePost } from "../controllers/post.controller.js"

const router = express.Router()

router.route("/").get(getAllPosts);
router.route("/:id").get(getPostDetail);
router.route("/").post(createPost);
router.route("/:id").patch(updatePost);
router.route("/:id").delete(deletePost);

export default router