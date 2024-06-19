import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNotes } from "../context/NotesContext";

const Note = () => {
  const [content, setContent] = useState("");

  const title = useLocation().pathname.split("/")[2];

  const { openNotes, setOpenNotes, getNote, updateNote } = useNotes();

  useEffect(() => {
    const noteInitialized = () => {
      if (openNotes?.length == 0) {
        setOpenNotes([title]);
      } else {
        let res;
        openNotes.map((n) => (n == title ? (res = true) : null));
        if (!res) setOpenNotes(openNotes.concat([title]));
      }
    };
    console.log("se ejecuto")
    noteInitialized();
    (async () => {
      const content = await getNote(title);
      setContent(content);
    })();
  }, [title]);

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data  = e.target.childNodes[1].value;
    try {
      const res = await updateNote(title, data)
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setContent(data)
    }
  };
  return (
    <div className="w-full h-full">
      <form onSubmit={handleUpdate} className="w-full h-full relative pb-8">
        <button
          className="bg-neutral-700 px-2 py-1 rounded-md absolute left-full"
          type="submit"
        >
          Actualizar
        </button>
        <textarea
          placeholder={title}
          name="content"
          defaultValue={content}
          className="block  px-3 py-5 h-full w-full resize-none outline-none bg-black bg-opacity-0 mb-8 overflow-y-auto"
        />
      </form>
    </div>
  );
};

export default Note;
