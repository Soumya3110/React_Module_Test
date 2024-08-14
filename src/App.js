import React, { useContext, useEffect, useState } from 'react';
import NotesContext, { Provider } from './Context/NotesContext';
import DesktopView from './Components/View/DesktopView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileView from './Components/View/MobileView';
import MobileNotesPage from './Components/MobileComponents/MobileNotesPage';

export default function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { setSelected } = useContext(NotesContext);

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
  }, [setSelected]);

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <Provider>
      <div>
        {screenSize > 500 ? (
          <DesktopView />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MobileView />} />
              <Route path="/notes" element={<MobileNotesPage />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </Provider>
  );
}
