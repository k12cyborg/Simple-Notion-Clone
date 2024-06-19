import { useEffect } from "react";
import NoteBlock from "../components/NoteBlock";
import { useNotes } from "../context/NotesContext";

const Notes = () => {
  const {notes, getNotes} = useNotes()

  useEffect(()=>{
    getNotes()
  }, [])

  return (
    <div className="relative flex flex-col h-full gap-2 w-full pb-20">
      <ul className="max-h-min flex flex-col gap-2 overflow-y-auto">
        {notes.map((note, i) => (
          <NoteBlock key={i} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
