import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;// destructuring

    const [note,setnote]=useState({title:"",description:"",tag:""})
    const HandleSubmit=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setnote({title:"",description:"",tag:""});
    }
    const Onchange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value}) //spread operator(...) here we are adding after note(got assigned as empty) to the 'name' in the input tag to the value that is changing
     }
  return (
    
      <div className="container" style={{margin:"32px"}}>
      <h2>Add a note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title"  name="title" value={note.title} aria-describedby="emailHelp" onChange={Onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" value={note.description} name="description" onChange={Onchange} minLength={5} required/>
        </div>
         <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={Onchange} minLength={5} required/>
        </div>
        
        <button disabled={note.title.length<5 && note.description.length<5 } type="submit" className="btn btn-primary" onClick={HandleSubmit}>Add Note</button>
      </form>
      </div>
    
  )
}

export default AddNote
