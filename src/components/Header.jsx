import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import PropTypes from 'prop-types';
import Button from './Button';
import { HiOutlinePlusCircle } from 'react-icons/all';


const Header = ({ title }) => {

    const { openNewModal } = useContext(NoteContext);

    return (
        <header className="flex m-8">
            <h1 className="text-5xl mr-4">{title}</h1>
            <Button onClick={ () => openNewModal() }><HiOutlinePlusCircle /></Button>
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