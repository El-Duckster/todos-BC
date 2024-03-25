import './Button.css';
const ReusableButton = ({onClick,children,className='', type='button',...props}) => {
 
 
    return (
        <button
        className={`reusable-btn ${className}`} 
        onClick={onClick} 
        type={type} 
        {...props} 
      >
        {children} 
      </button>
    );
  
}

export default ReusableButton