import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  
  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    } else {
      navigate('/login');
    }
  }, [getNotes, navigate]);

  const updateNote = (note) => {
    ref.current.click();
    setCurrentNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  // Get unique tags for filter
  const uniqueTags = [...new Set(notes.map(note => note.tag).filter(tag => tag))];

  // Filter notes based on search and tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === "" || note.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="notes-container">
      <AddNote />
      
      {/* Search and Filter Controls */}
      <div className="notes-controls">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select filter-select"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {uniqueTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <div className="view-toggle">
              <button
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
          <div className="col-md-2">
            <div className="notes-count">
              <span className="badge bg-primary">{filteredNotes.length} notes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Modal Trigger */}
      <button
        ref={ref}
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      />

      {/* Enhanced Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content modern-modal">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-edit me-2"></i>
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control modern-input"
                    id="title"
                    name="title"
                    value={currentNote.title}
                    onChange={onChange}
                    placeholder="Enter note title..."
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control modern-input"
                    id="description"
                    name="description"
                    rows="5"
                    value={currentNote.description}
                    onChange={onChange}
                    placeholder="Write your note content..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control modern-input"
                    id="tag"
                    name="tag"
                    value={currentNote.tag}
                    onChange={onChange}
                    placeholder="Add a tag..."
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={currentNote.title.length < 3 || currentNote.description.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                <i className="fas fa-save me-1"></i>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Display */}
      <div className="notes-section">
        <div className="section-header">
          <h2>
            <i className="fas fa-sticky-note me-2"></i>
            Your Notes
          </h2>
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-clipboard-list empty-icon"></i>
            <h4>No notes found</h4>
            <p className="text-muted">
              {notes.length === 0 
                ? "Start by creating your first note!" 
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className={`notes-grid ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
            {filteredNotes.map((note) => (
              <NotesItem
                key={note._id}
                updateNote={updateNote}
                note={note}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;