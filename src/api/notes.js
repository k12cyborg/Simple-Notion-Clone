import axios from "./axios.js";

export const getNotesRequest = () => axios.get("/notes");

export const getNoteRequest = (title) => axios.get(`/note/${title}.txt`);

export const updateNoteRequest = (title, content) => axios.put(`/note/${title}.txt`, { content: content });

export const newNoteRequest = (title) => axios.post("/notes", { title: title+".txt" });

export const deleteNoteRequest = (title) => axios.delete(`/note/${title}.txt`);