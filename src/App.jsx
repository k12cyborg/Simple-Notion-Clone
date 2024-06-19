import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./pages/Nav";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import Profile from "./pages/Profile";

import { NotesProvider } from "./context/NotesContext";

const App = () => {
  return (
    <NotesProvider>
      <BrowserRouter>
        <NavBar>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/notes"} element={<Notes />} />
            <Route path={"/note/:title"} element={<Note />} />
          </Routes>
        </NavBar>
      </BrowserRouter>
    </NotesProvider>
  );
};

export default App;
