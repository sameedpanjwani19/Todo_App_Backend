import express from "express";
import { addTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todos.controllers.js";

const router = express.Router();

// addTodo route
router.post("/todo", addTodo);

// getTodos route
router.get("/todo", getTodos);

// get single Todo route
router.get("/:id", getTodoById);

// updateTodo route
router.put("/:id", updateTodo);

// deleteTodo route
router.delete("/:id", deleteTodo);



export default router;