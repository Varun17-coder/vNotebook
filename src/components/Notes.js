import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import {useNavigate} from 'react-router-dom'
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;// destructuring
  let Navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
     Navigate('/login')
    }
    // eslint-disable-next-line 
  }, [])

  const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const refClose = useRef(null);// for closing modal by close ref button
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
//from AddNote file

  const HandleSubmit=(e)=>{
    console.log("updating the note...",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }
  const Onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value}) //spread operator(...) here we are adding after note(got assigned as empty) to the 'name' in the input tag to the value that is changing
   }

  return (
    <>

      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"> 
              {/* //form for update */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle"
                  value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={Onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription"  value={note.edescription} name="edescription" onChange={Onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={Onchange} minLength={5} required  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              {/* by clicking update button close button will be refered using useRef */}
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={HandleSubmit} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5" style={{ margin: "32px" }}>
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note,_id) => {
          return <Noteitem key={_id} updateNote={updateNote} note={note} />;
        })
        }
      </div>
    </>
  )
}

export default Notes
