import { useState, useEffect, createContext } from 'react';

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [modalNote, setModalNote] = useState({
        title: '',
        content: ''
    });

    useEffect( () => {
        const getNotes = async () => {
          const notesFromServer = await fetchNotes();
          setNotes(notesFromServer);
        }
        getNotes();
    }, []);

    const openNewModal = () => {
        setIsOpen(true);
    }

    const openEditModal = async (id) => {
        const noteToEdit = await fetchNote(id);
        setModalNote({
            id: noteToEdit.id,
            title: noteToEdit.title,
            content: noteToEdit.content
        })
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        setModalNote({
            title: '',
            content: ''
        });
    }

    const fetchNotes = async () => {
        const res = await fetch('http://localhost:5000/notes');
        const data = await res.json();
        return data;
    }

    const fetchNote = async (id) => {
        const res = await fetch(`http://localhost:5000/notes/${id}`);
        const data = await res.json();
        return data;
    }

    const addNote = async (note) => {
        const noteToSave = {
            ...note,
            lastEdited: new Date(Date.now()).toLocaleString()
        }
        const res = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteToSave)
        });

        const data = await res.json();
        setNotes([...notes, data]);
    }

    const deleteNote = async (id) => {
        const res = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE'
        });
        console.log(res);
        res.status === 200 ? setNotes(notes.filter((note) => note.id !== id )) : alert('Error deleting this note');
    }

    const editNote = async (id, editedNote) => {
        const noteToSave = {
            ...editedNote,
            lastEdited: new Date(Date.now()).toLocaleString()
        }
        const res = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteToSave)
        });
        const data = await res.json();
        setNotes(
            notes.map((note) =>
                note.id === id ? data : note
            )
        );
    }

    const toggleArchived = async (id) => {
        const noteToToggle = await fetchNote(id);
        const updNote = { ...noteToToggle, archived: !noteToToggle.archived };
        const res = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updNote)
        });
        const data = await res.json();
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, archived: data.archived } : note
            )
        );
    }

    return (
        <NoteContext.Provider value={{
            notes,
            onAdd: addNote,
            onDelete: deleteNote,
            onEdit: editNote,
            onToggle: toggleArchived,
            modalNote,
            modalIsOpen,
            openNewModal,
            openEditModal,
            closeModal
        }}>
            {children}
        </NoteContext.Provider>
    )
}