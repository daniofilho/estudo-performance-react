import React, { useMemo, useState, useCallback } from "react";
import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import Navbar from "./Components/Navbar";
import { RepositoryList } from "./Components/RepositoryList";

import { likesCounter } from "./Services/expensiveCalculation";

const SEARCH = "http://localhost:3001/repositories/";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  const getRepositories = useCallback(
    (query) => fetch(`${SEARCH}?q=${query}`),
    []
  );

  const likes = useMemo(() => likesCounter(totalLikes), [totalLikes]);

  const theme = useMemo(
    () => ({
      color: dark ? "#fff" : "#333",
      navbar: dark ? "#1a202c" : "#e5e7eb",
      backgroundColor: dark ? "#333" : "#fff",
    }),
    [dark]
  );

  const toogleDarkmode = () => setDark(!dark);

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <RepositoryList getRepositories={getRepositories} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
    </div>
  );
}

export default App;
