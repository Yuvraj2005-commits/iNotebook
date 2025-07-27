import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context; // Removed addNote since it's not used here

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