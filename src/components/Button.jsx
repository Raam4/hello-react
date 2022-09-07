const Button = ({ color, children, onClick }) => {
    return (
        <button className={`rounded-md ${color} px-5 py-2 shadow-md`} onClick={onClick}>
            {children}
        </button>
    );
}

Button.defaultProps = {
    color: 'bg-green-600'
}

export default Button;