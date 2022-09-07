import { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { NoteContext } from '../context/NoteContext';
import PropTypes from 'prop-types';
import Button from './Button';
import { HiOutlinePlusCircle } from 'react-icons/all';


const Header = ({ title }) => {

    const { openNewModal } = useContext(NoteContext);
    const location = useLocation();
    const linkClass = "m-2 underline text-lg text-blue-800"

    return (
        <header className="flex m-8">
            <h1 className="text-5xl mr-4">{title}</h1>
            <Button onClick={ () => openNewModal() }><HiOutlinePlusCircle /></Button>
            {
                location.pathname === '/archived' ?
                    <Link className={linkClass} to="/">MyNotes</Link> : <Link className={linkClass} to="/archived">Archived</Link>
            }
        </header>
    );
}

Header.defaultProps = {
    title: 'My Notes',
}
  
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;