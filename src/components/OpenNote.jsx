import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OpenNote = ({ to, note }) => {
  const navigate = useNavigate();

  const { openNotes, setOpenNotes } = useNotes();

  const handleDeleteTab = (note) => (e) => {
    e.preventDefault();
    const notes = openNotes.filter((n) => {
      if (n != note) return true;
    });
    setOpenNotes(notes);

    navigate("/notes")
  };
  
  return (
    <li className="flex hover:bg-neutral-400 bg-neutral-600 min-w-min max-w-40 rounded-sm relative w-48 h-6 items-center justify-between">
      <Link to={to} className="px-2 text-base leading-normal">
        {note}
      </Link>
      <button
        type="button"
        onClick={handleDeleteTab(note)}
        className="h-full text-2xl"
      >
        <IoCloseSharp className="" />
      </button>
    </li>
  );
};

export default OpenNote;
