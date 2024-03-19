import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const {note, update} = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    //delete function
    const notedelete = () => {
        deleteNote(note._id);
        props.showAlert("Deleted Successfully", "success");
    }


    return (

        <div className="col-md-4 my-3">

            <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={notedelete}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{update(note)}}></i>
                </div>
            </div>
        </div>
    )
}
