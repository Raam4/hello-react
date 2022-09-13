import { useContext, useState, useEffect } from "react";
import Note from "./Note";
import { NoteContext } from '../context/NoteContext';
import Button from './Button';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Notes = () => {

    const { notes, modalNote, modalIsOpen, closeModal, onAdd, onEdit } = useContext(NoteContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect( () => {
        setTitle(modalNote.title);
        setContent(modalNote.content)
    }, [modalNote]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(modalNote.id){
            try{
                await onEdit(modalNote.id, {title, content});
                closeModal();
            }catch(error){
                alert(error);
            }
        }else{
            try{
                await onAdd({title, content});
                closeModal();
            }catch(error){
                alert(error);
            }
        }
    };

    return (
        <>
            {notes.map((note, index) => (
                <Note key={index} note={note} />
            ))}
            <Modal
                isOpen={modalIsOpen}
                /* onAfterOpen={afterOpenModal} */
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    content: {
                      position: 'absolute',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      maxWidth: '520px',
                      maxHeight: '410px',
                      top: '40px',
                      left: '40px',
                      right: '40px',
                      bottom: '40px',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '20px'
                    }
                  }}
            >
                <div className='flex justify-between p-4'>
                    <h2 className='text-3xl'>Create/Edit note</h2>
                    <Button color="bg-red-500" onClick={() => closeModal()}>X</Button>
                </div>
                <div className="block p-8 w-4/5 mx-auto">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-6">
                            <input type="text" className="form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-black
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                                placeholder="Title"
                                value={title}
                                onChange={ (e) => setTitle(e.target.value) }
                            />
                        </div>
                        <div className="form-group mb-6">
                            <textarea className="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-black
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlTextarea13"
                                rows="3"
                                placeholder="Content"
                                value={content}
                                onChange={ (e) => setContent(e.target.value) }
                            ></textarea>
                        </div>
                        <button type="submit" className="
                            w-full
                            px-6
                            py-2.5
                            bg-blue-600
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out">Save
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Notes;