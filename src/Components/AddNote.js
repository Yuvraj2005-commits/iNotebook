import React, { useContext, useState } from 'react';
import NoteContext from '../Context/Notes/NoteContext';

const AddNote = () => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault(); // Fixed: was preventdefault()
    addNote(note.title, note.description, note.tag);
    // Clear the form after adding
    setNote({ title: "", description: "", tag: "" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name='title' 
              value={note.title} // Added controlled input
              onChange={onChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input 
              type="text" 
              className="form-control" 
              id="description" 
              name="description" 
              value={note.description} // Added controlled input
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input 
              type="text" 
              className="form-control" 
              id="tag" 
              name="tag" 
              value={note.tag} // Added controlled input
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote;