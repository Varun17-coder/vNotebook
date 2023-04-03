// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // const s1={
  //     "name":"devil",
  //     "class":"cse"
  // }
  // const [state,setState]=useState(s1);
  // we can use this already updated state (i.e. update function) in any component, like used in About component
  // const update=()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"evil",
  //             "class":"ece"
  //         })
  //     }, 1000);
  // }
  
  const host="http://localhost:5000"
  const notesInitial = []
  

  const [notes, setnotes] = useState(notesInitial);

  // ---------Get all notes
  const getNotes = async() => {

    // addnote API call using fetch()
    const response=await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });

    const json=await response.json();
    console.log(json)
    setnotes(json)
  }

  // ---------Add note
  const addNote = async(title, description, tag) => {

    // addnote API call using fetch()
    const response=await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
   const note= await response.json();
    // console.log(json);

    console.log("adding note");
    
    setnotes(notes.concat(note));
  }

  // Delete note

  const deleteNote =async (id) => {
    // API call for deleting the notes 
    const response=await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('token')
      } 
    });

    const json=response.json();
    console.log(json)

    console.log("delete noteeee " + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote);
  }

  //Edit note
  const editNote =async (id, title, description, tag) => {
    // fetch API call

    const response=await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=response.json();
    console.log(json)

    const NewNote=JSON.parse(JSON.stringify(notes))
    // logic for editing
    for (let index = 0; index < NewNote.length; index++) {
      const element = NewNote[index];
      if (element._id === id) {
        NewNote[index].title = title;
        NewNote[index].description = description;
        NewNote[index].tag = tag;
        break;
      }
    }
    setnotes(NewNote);
  }
  return (
    //we can pass update in contextAPI
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>

      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;