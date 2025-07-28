import React, { useContext,useEffect } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes,getNotes } = context; // Removed addNote since it's not used here
  useEffect(() => {
    return () => {
      getNotes();
    };
  }, []);
  console.log(context);
  return (
    <>
      <AddNote />
      <div className="row my-3 mx-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <NotesItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;