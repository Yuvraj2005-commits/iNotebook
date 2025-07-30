import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const NotesItem = ({ note, updateNote, viewMode }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (viewMode === 'list') {
    return (
      <div className="note-item list-item">
        <div className="note-content">
          <div className="note-header">
            <h5 className="note-title">{note.title}</h5>
            {note.tag && <span className="note-tag">{note.tag}</span>}
          </div>
          <p className="note-description">{truncateText(note.description, 150)}</p>
          <div className="note-meta">
            <small className="text-muted">
              <i className="fas fa-calendar me-1"></i>
              {formatDate(note.date)}
            </small>
          </div>
        </div>
        <div className="note-actions">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => updateNote(note)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h5 className="note-title">{truncateText(note.title, 40)}</h5>
        <div className="note-actions">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => updateNote(note)}
            title="Edit note"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
            title="Delete note"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div className="note-card-body">
        <p className="note-description">{truncateText(note.description, 120)}</p>
      </div>
      
      <div className="note-card-footer">
        <div className="note-meta">
          {note.tag && <span className="note-tag">{note.tag}</span>}
          <small className="note-date">
            <i className="fas fa-calendar me-1"></i>
            {formatDate(note.date)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;