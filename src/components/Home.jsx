import Notes from './Notes'
import AddNote from './AddNote'
import React from 'react'

export default function Home(props) {
  
    return (
      <>
      <AddNote showAlert={props.showAlert}/>
      <div className="container">
        <h1>Your Notes</h1>

        <div className="d-flex flex-column">
          <Notes showAlert={props.showAlert}/>
        </div>

      </div>
    </>
  )
}
