import mongoose from "mongoose";
import Todo from "../models/todos.models.js";


// add todo

const addTodo = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
  
      const todo = await Todo.create({
        title,
        description,
      });
      res.status(201).json({
        message: "Todo added to database successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding todo" });
    }
  };

  // get todos

  const getTodos = async (req, res) => {
    const todos = await Todo.find({})
    res.json(todos)
  }


  // get Single Todo
const getTodoById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "Not find this todo" });
  }
  const singleTodo = await Todo.findById(id);
  res.json(singleTodo);
};

// Update Todo 
const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID"
    })
    return;
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }
  const todo = await Todo.findOneAndUpdate({ _id: id }, {
    title,
    description
  })
  if (!todo) {
    res.status(404).json({
      message: `No todo with id : ${id}`
    })
    return;
  }
  res.status(200).json({
    message: "Todo Updated Successfully",
    todo: todo,
  })
}


// Delete Todo 
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID"
    })
    return;
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });
  if (!todo) {
    res.status(404).json({
      message: `No todo with id : ${id}`
    })
    return;
  }

  res.status(200).json({
    message: "Todo deleted successfully",
    todo: todo,
  })
}

export { addTodo, getTodos, getTodoById , updateTodo , deleteTodo};