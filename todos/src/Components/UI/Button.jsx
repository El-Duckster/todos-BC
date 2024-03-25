import './Button.css';
const ReusableButton = ({onClick,children,className='', type='button',...props}) => {
 
 
    return (
        <button
        className={`reusable-btn ${className}`} // Apply default class and any custom class
        onClick={onClick} // Function to call when the button is clicked
        type={type} // Button type (submit, reset, button)
        {...props} // Spread any other prop passed to the button
      >
        {children} 
      </button>
    );
  
}

export default ReusableButton