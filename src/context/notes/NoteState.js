import { useState } from "react";
import NoteContext from "./noteContext";

const NotesState = (props)=>{

    const host = "http://localhost:5000";
    const n1 = [];

      const [notes, setNotes] = useState(n1);

      //ADD Note 
      const addNote = async (title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : sessionStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json = await response.json();

        const note = json;
        setNotes(notes.concat(note));
      }


      //Fetch Notes
      const fetchNotes = async ()=>{

        const response = await fetch(`${host}/api/notes/getnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : sessionStorage.getItem('token')
          }
        });

        const json = await response.json();
        console.log(json);

        setNotes(json);
      }
      
      // Delete Note
      const deleteNote = async (id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : sessionStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);

        const newNote = notes.filter((note) => {return (note._id !== id)});
        setNotes(newNote);
      }

      // Edit Note
      const editNote =  async (id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : sessionStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json = await response.json();
        console.log(json);
        
        let newNote = JSON.parse(JSON.stringify(notes)) ;

        for(let i=0; i<newNote.length; i++) {
          const element = newNote[i];
          if(element._id === id) {
            newNote[i].title = title;
            newNote[i].description = description;
            newNote[i].tag = tag;
            break;
          }

        }
        setNotes(newNote)

      }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;