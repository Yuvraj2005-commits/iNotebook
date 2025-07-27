import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "6886058e88db405c9c360533",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:10.703Z",
      "__v": 0
    },
    {
      "_id": "6886059588db405c9c360535",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:17.821Z",
      "__v": 0
    },
    {
      "_id": "6886059688db405c9c360537",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:18.362Z",
      "__v": 0
    },
    {
      "_id": "6886059688db405c9c360539",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:18.793Z",
      "__v": 0
    },
    {
      "_id": "6886059788db405c9c36053b",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:19.073Z",
      "__v": 0
    },
    {
      "_id": "6886059788db405c9c36053d",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:19.305Z",
      "__v": 0
    },
    {
      "_id": "6886059788db405c9c36053f",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:19.505Z",
      "__v": 0
    },
    {
      "_id": "6886059788db405c9c360541",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy",
      "description": "i am farebi yidf xfgdrhd d",
      "tag": "testsdvs",
      "date": "2025-07-27T10:55:19.688Z",
      "__v": 0
    }
  ];


  const [notes, setNote] = useState(notesInitial);


  // Add a notes
  const addNote=(title,description,tag)=>{
     notes={
        "_id": "6886059788db405c9c360541",
      "user": "6883b96380f3136a79a6d5cc",
      "title": "Yo buddy added",
      "description": "i am farebi koi problem h yidf xfgdrhd d",
      "tag": "test add",
      "date": "2025-07-27T10:55:19.688Z",
      "__v": 0 
     }
     setNote(notes.concat(notes));
  }

  // Delete a notes
  const deleteNote=()=>{
      
  }


  // Edit a Y
  const editNote=()=>{
      
  }
  return (
    <NoteContext.Provider value={{ notes, setNote,addNote,deleteNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
