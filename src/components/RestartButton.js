import { useRef } from 'react';
import { MdRefresh } from 'react-icons/md';

const RestartButton = ({ onRestart, className = '' }) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    onRestart();
  };

  return (
    <>
      <br></br>
      <br></br>
      <MdRefresh
        className="w-10 h-10"
        tabIndex={-1} // to prevent focus
        ref={buttonRef}
        onClick={handleClick}
      />
    </>
  );
};

export default RestartButton;
