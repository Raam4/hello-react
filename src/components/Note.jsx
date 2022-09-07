import Button from "./Button";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { MdOutlineArchive, MdOutlineUnarchive, BsFillPencilFill, BsFillTrashFill} from 'react-icons/all';

const Note = ({ note }) => {

    const { onToggle, onDelete, openEditModal } = useContext(NoteContext);

    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex border border-black rounded-md bg-white">
            <div className="flex justify-center align-middle">
                <div className="grid place-items-center w-full h-32 lg:w-32 lg:h-auto bg-yellow-200">
                    <span className="text-4xl font-bold">{note.title.charAt(0)}</span>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{note.title}</div>
                    <p className="text-gray-700 text-sm">Last edited: {note.lastEdited}</p>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <Button color={note.archived ? "bg-blue-500" : "bg-gray-500"} onClick={() => onToggle(note.id)}>
                        { note.archived ? <MdOutlineUnarchive /> : <MdOutlineArchive /> }
                    </Button>
                    <Button color="bg-green-500" onClick={() => openEditModal(note.id)}><BsFillPencilFill /></Button>
                    <Button color="bg-red-500" onClick={() => onDelete(note.id)}><BsFillTrashFill /></Button>
                </div>
            </div>
        </div>
    );
}

export default Note;