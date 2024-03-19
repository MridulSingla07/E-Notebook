const express = require("express");
const router = express.Router();
var fetchuser = require("../middlewares/fetchusers");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Get notes endpoint 1 = "/api/notes/getnotes" get details of user from database

router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.body.user.data });
    res.json(notes);
  } catch (error) {
    // to give Error instead of crashing
    console.log(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//ADD endpoint 2 = "/api/notes/addnotes" add notes to database

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body(
      "description",
      "Password must have a minimum of 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {

      const {title,description,tag} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


      const notes = new Notes({ 
        title,description,tag, user: req.body.user.data 
    });
      const savedNotes = await notes.save();
      res.json(savedNotes);  

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
  }
);

// Update endpoint 3 = "/api/notes/updatenote" Update notes to database

router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {

      const {title,description,tag} = req.body;
      const newNote = {};
      if(title) {newNote.title = title;}
      if(description) {newNote.description = description;}
      if(tag) {newNote.tag = tag;}

        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")};
      
        if(note.user.toString() !== req.body.user.data) {
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote}, {new:true});
        
        res.json({note});  

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
  }
);


// Delete endpoint 4 = "/api/notes/deletenote" delete notes to database

router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {

        // find by id and delete note
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")};
      
        // check if the user is authenticated
        if(note.user.toString() !== req.body.user.data) {
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        
        res.json({success: "Deleted", note: note});

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
  }
);

module.exports = router;
