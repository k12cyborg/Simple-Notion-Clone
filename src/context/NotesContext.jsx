import { createContext, useContext, useState, useEffect } from "react";
import {
  getNotesRequest,
  deleteNoteRequest,
  getNoteRequest,
  newNoteRequest,
  updateNoteRequest,
} from "../api/notes";


const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useTask must be used within a NotesProvider");
  }

  return context;
};

export const NotesProvider = ({ children }) => {
  const [openNotes, setOpenNotes] = useState([]);
  const [notes, setNotes] = useState([]);

  const deleteNote = async (note) => {
    try {
      const res = await deleteNoteRequest(note);
      console.log(res)
    } catch (error) {
      console.log(error);
    } finally {
      setOpenNotes(openNotes.filter(n=>n !== note))
      await getNotes();
    }
  };
  const getNotes = async () => {
    try {
      const res = await getNotesRequest();
      setNotes(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getNote = async (title) => {
    let res;
    try {
      res = await getNoteRequest(title);
    } catch (error) {
      console.log(error.response);
    }
    await getNotes();
    return res?.data;
  };

  const newNote = async (title) => {
    let res;
    try {
      res = await newNoteRequest(title);
      await getNotes();
    } catch (error) {
      throw new Error(error);
    }
    return res.data;
  };

  const updateNote = async (title, content) => {
    try {
      const res = await updateNoteRequest(title, content);
      await getNotes();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        openNotes,
        setOpenNotes,
        deleteNote,
        getNotes,
        getNote,
        newNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
