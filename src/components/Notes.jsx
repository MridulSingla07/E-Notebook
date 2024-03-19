import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, fetchNotes,editNote } = context;
  
  const navigate = useNavigate(); // navigate to certain page

  const [note, setNote] = useState({id: "",title:"", description:"", tag:""});
  const [input, setInput] = useState("");

  // useeffect for starting mount so that fectch is not rendered again and again adter every render
  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      fetchNotes();
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null); // for launching modal
  const refClose = useRef(null);


// for using edit icon in the notes card
  const update = (note) => {
    ref.current.click();
    setNote(note);
  }

    // to edit note using save changes in modal
    const onChange = (e)=>{
      setNote({...note,[e.target.name]: e.target.value});
    }
    
    // to edit note using save changes in modal
    const handleClick = (e)=>{
      refClose.current.click();
      editNote(note._id,note.title, note.description,note.tag);
      props.showAlert("Updated Successfully", "success");
    }


    // used to filter using input
    const handleChange = (e)=>{
      setInput(e.target.value.toLowerCase());
    }

    //filtered array
    const filterNotes = notes.filter((note) => (note.title.includes(input) || note.description.includes(input)));



  return (

    <>
      <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" >Title</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp"  value={note.title}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" name="description" className="form-control" id="desc" onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" name="tag" className="form-control" id="tag" onChange={onChange}  value={note.tag}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <input type="text" className="form-control w-50 border-dark my-2" id="search" name="search"  placeholder="Search" onChange={handleChange}/>
      <div className="row my-3">
        {filterNotes.map((note) => {
          return <Noteitem key={note._id} note={note} update={update} showAlert={props.showAlert} />;
        })}
      </div>

    </>
  )
}
