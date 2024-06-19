import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

import OpenNote from "../components/OpenNote";

const Aside = ({ isToggled, isMouseOver, handleMouseOver }) => {
  const navigate = useNavigate();

  const { newNote } = useNotes();

  const handleNewNote = async (e) => {
    e.preventDefault();
    const title = e.target.childNodes[0].value.trim();
    (async () => {
      try {
        await newNote(title).then(()=>navigate("/note/"+title.trim().replaceAll(" ", "_")));
      } catch (error) {
        console.log(error);
      } finally {
      }
    })();
    e.target.childNodes[0].value = "";
  };
  const preventInputEnter = (e) => {
    if (
      e.keyIdentifier == "U+000A" ||
      e.keyIdentifier == "Enter" ||
      e.keyCode == 13
    ) {
      if (e.target.nodeName == "INPUT" && e.target.type == "text") {
        e.preventDefault();
      }
    }
  };

  return (
    <aside
      className={
        "inline-block h-full w-1/6 shrink-0 z-50 " +
        (isToggled ? "absolute top-12" : "relative")
      }
      onMouseEnter={handleMouseOver(true)}
      onMouseLeave={handleMouseOver(false)}
    >
      <div
        className={
          "transition-transform ease-out duration-300 relative bg-neutral-800 rounded-r-lg flex flex-col gap-4 " +
          (isToggled
            ? "h-4/6" + (!isMouseOver ? " -translate-x-full" : "")
            : "h-full pt-12 ")
        }
      >
        <section className="px-2 text-white flex-col">
          <div className="flex align-middle items-center">
            <h3 className="text-lg font-bold hover:bg-neutral-700 p-1 rounded-md">
              <Link to={"/profile"}>Perfil</Link>
            </h3>
          </div>
          <ul className="font-medium text-sm flex flex-col">
            <li className="hover:bg-neutral-700 p-1 rounded-md flex items-center">
              <FaSearch /> Buscar
            </li>
            <li className="hover:bg-neutral-700 p-1 rounded-md">
              <Link to={"/notes"}>Notas</Link>
            </li>
          </ul>
        </section>

        <section className="px-2">
          <h3 className="font-bold text-sm mb-2">Páginas</h3>
          <ul className="text-base flex flex-col">
            <li className="hover:bg-neutral-700 px-3 py-2 rounded-md">Cosas</li>
            <li className="hover:bg-neutral-700 px-3 py-2 rounded-md">Cosas</li>
            <li className="hover:bg-neutral-700 px-3 py-2 rounded-md">Cosas</li>
            <li className="hover:bg-neutral-700 px-3 py-2 rounded-md">Cosas</li>
            <li className="hover:bg-neutral-700 px-3 py-2 rounded-md">Cosas</li>
          </ul>
        </section>
        <div className=" px-2 flex w-full">
          <form
            onSubmit={handleNewNote}
            className="flex justify-center flex-wrap items-center align-middle"
          >
            <input
              placeholder={"Titulo"}
              required
              onKeyDown={preventInputEnter}
              type="text"
              className="w-full bg-opacity-0 bg-black border border-neutral-600 rounded-sm py-1 px-2"
            />
            <button
              type="submit"
              className="relative inline-block text-center my-2 rounded-md hover:bg-neutral-700 border py-1 px-2 border-neutral-600 font-bold "
            >
              Nueva nota
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};

const Nav = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { openNotes } = useNotes();

  const handleToggled = () => {
    isToggled ? setIsToggled(false) : setIsToggled(true);
  };
  const handleMouseOver = (type) => () => {
    type && isToggled ? setIsMouseOver(true) : setIsMouseOver(false);
  };
  return (
    <>
      <Aside
        isMouseOver={isMouseOver}
        isToggled={isToggled}
        handleMouseOver={handleMouseOver}
      />

      <div className="relative inline-block h-full grow">
        <div className="flex flex-col h-full">
          {/* Nav */}
          <nav className="">
            <div className="flex h-12">
              <button
                onClick={handleToggled}
                className="text-white rounded-md text-3xl p-3"
              >
                <FaBars />
              </button>
            </div>
            <ul className="flex flex-nowrap justify-end gapx-2">
              {openNotes.map((note, i) => {
                return <OpenNote note={note} to={"/note/" + note} key={i} />;
              })}
            </ul>
          </nav>

          {/* Main */}
          <div className="h-full px-52">
            <main className="relative h-full">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
