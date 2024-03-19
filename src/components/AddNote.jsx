import React,{ useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {
  const context = useContext(noteContext);
    const {addNote} = context;
  
    const [note, setNote] = useState({title:"", description:"", tag:""});
    
    const onChange = (e)=>{
      setNote({...note,[e.target.name]: e.target.value});
    }
  
    const handleClick = (e)=>{
      e.preventDefault();
      addNote(note.title, note.description,note.tag);
      props.showAlert("Added Successfully", "success");
    }
  
    return (
      <>
      <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" name="tag" className="form-control" id="tag"  onChange={onChange}/>
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </>
  )
}

