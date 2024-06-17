import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getNoteRequest, updateNoteRequest } from "../api/notes";

const Note = () => {
  const [content, setContent] = useState("");
  
  const { title } = useParams();

  useEffect(() => {
    async function getNote(title) {
      let res;
      res = await getNoteRequest(title);
      setContent(res.data);
    }
    getNote(title);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = "";
    data = e.target.children[1].value;
    try {
      const res = await updateNoteRequest(title, data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setContent(data);
    }
  };
  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="w-full h-full relative pb-8">
        <button
          className="bg-neutral-700 px-2 py-1 rounded-md absolute left-full"
          type="submit"
        >
          Actualizar
        </button>
        <textarea
          name="content"
          defaultValue={content}
          className="block  px-3 py-5 h-full w-full resize-none outline-none bg-black bg-opacity-0 mb-8 overflow-y-auto"
        />
      </form>
    </div>
  );
};

export default Note;
