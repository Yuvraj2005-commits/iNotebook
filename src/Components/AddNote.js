import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (note.title.length >= 3 && note.description.length >= 5) {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      setIsExpanded(false);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-note-section">
      <div className="add-note-card">
        <div className="card-header">
          <h4>
            <i className="fas fa-plus-circle me-2"></i>
            Create New Note
          </h4>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control modern-input title-input"
                name="title"
                value={note.title}
                onChange={onChange}
                placeholder="Note title..."
                onFocus={() => setIsExpanded(true)}
              />
            </div>
            
            {(isExpanded || note.title || note.description) && (
              <div className="expanded-form">
                <div className="mb-3">
                  <textarea
                    className="form-control modern-input"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                    rows="4"
                    placeholder="Start writing your note..."
                  />
                </div>
                
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control modern-input"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                    placeholder="Add a tag (optional)..."
                  />
                </div>
                
                <div className="form-actions">
                  <button
                    disabled={note.title.length < 3 || note.description.length < 5}
                    type="submit"
                    className="btn btn-primary me-2"
                  >
                    <i className="fas fa-save me-1"></i>
                    Save Note
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setNote({ title: "", description: "", tag: "" });
                      setIsExpanded(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;