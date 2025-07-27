import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import NotesItem from './NotesItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context;

  return (
    <div className="row my-3 mx-3">
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <NotesItem key={note._id} note={note} />
      ))}
    </div>
  );
};

export default Notes;
