import { useEffect, useState } from "react";
import { getNotesRequest, deleteNoteRequest } from "../api/notes";
import NoteBlock from "../components/NoteBlock";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const handleDelete = (note) => async () => {
    try {
      console.log(note);
      const res = await deleteNoteRequest(note);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setNotes(notes.filter((n) => n !== note));
    }
  };

  useEffect(() => {
    async function getNotes() {
      try {
        await getNotesRequest().then((res) => setNotes(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    getNotes();
  }, []);

  return (
    <div className="relative flex flex-col h-full gap-2 w-full pb-20">
      <ul className="max-h-min flex flex-col gap-2 overflow-y-auto">
        {notes.map((note, i) => (
          <NoteBlock key={i} note={note} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
