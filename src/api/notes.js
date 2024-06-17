import axios from "./axios.js";

export const getNotesRequest = () => axios.get("/notes");

export const getNoteRequest = (title) => axios.get(`/note/${title}`);

export const updateNoteRequest = (title, content) =>
  axios.put(`/note/${title}`, { content: content });

export const newNoteRequest = (title) => axios.post("/notes", { title: title });

export const deleteNoteRequest = (title) => axios.delete(`/note/${title}`);
