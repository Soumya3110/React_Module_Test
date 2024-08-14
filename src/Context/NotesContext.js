import { createContext, useState } from "react";

const NotesContext = createContext({
    notes: [],
    setNotes: () => { },
    selected: "",
    setSelected: () => { }
});

export const Provider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState("");


    return (
        <NotesContext.Provider value={{ notes, setNotes, selected, setSelected }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;
