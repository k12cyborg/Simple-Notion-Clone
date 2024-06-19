import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

const NoteBlock = ({ note }) => {
  const {deleteNote} = useNotes();
  const handleDelete = (note) => (e) => {
    e.preventDefault()
    deleteNote(note);
  };


  return (
    <div className="bg-neutral-700 px-3 py-2 rounded-r-md rounded-l-sm flex justify-between">
      <Link className="px-2 py-1" to={"/note/" + note}>
        {note}
      </Link>
      <button
        className="hover:bg-neutral-600 rounded-sm px-3"
        onClick={handleDelete(note)}
      >
        Borrar
      </button>
    </div>
  );
};

export default NoteBlock;
