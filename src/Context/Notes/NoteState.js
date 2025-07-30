import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // ✅ Fixed: removed extra quotes
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Fetched notes:", json);
        setNotes(json);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch notes:", errorData);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    console.log(title, description, tag);

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // ✅ Fixed: added quotes around "token"
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });

      const json = await response.json();
      console.log("Adding a new note", json);

      if (response.ok) {
        // If API call is successful, add the returned note
        setNotes(notes.concat(json));
      } else {
        console.error("Failed to add note:", json);
        // Optionally, still add to local state for better UX
        const newNote = {
          _id: Math.random().toString(36).substring(2, 15),
          user: "6883b96380f3136a79a6d5cc",
          title: title,
          description: description,
          tag: tag,
          date: new Date().toISOString(),
          __v: 0,
        };
        setNotes(notes.concat(newNote));
      }
    } catch (error) {
      console.error("Error adding note:", error);
      // Fallback: add to local state
      const newNote = {
        _id: Math.random().toString(36).substring(2, 15),
        user: "6883b96380f3136a79a6d5cc",
        title: title,
        description: description,
        tag: tag,
        date: new Date().toISOString(),
        __v: 0,
      };
      setNotes(notes.concat(newNote));
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    console.log("Deleting note with id:", id);

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // ✅ Fixed: added quotes around "token"
        },
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        // Remove from local state only if API call is successful
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Failed to delete note:", json);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // ✅ Fixed: added quotes around "token"
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        // Update local state only if API call is successful
        const newNotes = notes.slice(); // Create a copy of the array

        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      } else {
        console.error("Failed to update note:", json);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;