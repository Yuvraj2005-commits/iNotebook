import React,{useContext} from 'react';
import NoteContext from '../Context/Notes/NoteContext';

const NotesItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, editNote } = context;
  const { note } = props;

  return (
    <div className='col-md-3 my-3'>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
           <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
           <i
  className="fa-solid fa-pen-to-square mx-2"
  onClick={() => {
    const newTitle = prompt("Edit Title", note.title);
    const newDescription = prompt("Edit Description", note.description);
    const newTag = prompt("Edit Tag", note.tag);
    if (newTitle && newDescription) {
      editNote(note._id, newTitle, newDescription, newTag);
    }
  }}
></i>

        </div>
      </div>
    </div>
  );
};

export default NotesItem;
