require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utils");
const User = require("./models/user.model");
const Note = require("./models/note.model");
const { TbRulerMeasure } = require("react-icons/tb");

mongoose.connect(process.env.CONNECTION_STRING);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Please Enter your Name." });
  }
  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Please Enter your Email." });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Please Enter your Password." });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful!",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Please Enter your Email" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Please Enter your Password" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful!",
      email,
      accessToken,
    });
  } else {
    return res.json({
      error: true,
      message: "Incorrect Password",
    });
  }
});

app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Please Enter a Title",
    });
  }
  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Please Enter some Content",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully!",
    });
  } catch (err) {
    return res.json({
      error: true,
      message: "Internal Server Error!",
    });
  }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {

    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;
    const {user} = req.user;

    if (!title && !content && !tags){
        return res.status(400).json({
            error: true,
            message: "No changes provided"
        })
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note) {
            return res.status(400).json({
                error: true,
                message: "Note not found"
            })
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note updated successfully!"
        })
    }

    catch (err) { 
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }

})  

app.listen(8000);

module.exports = app;
