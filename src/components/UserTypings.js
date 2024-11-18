import cn from 'classnames';
import Caret from './Caret';
import { useEffect } from 'react';

const UserTypings = ({ userInput, words, className = '' }) => {
  const sanitizedWords = words.trim(); // 앞뒤 공백 제거
  const typedCharacters = userInput.split('');
  useEffect(() => {
    console.log('userInput:', userInput);
    console.log('words:', words);
  }, [userInput, words]);

  return (
    <div className={`${className} whitespace-nowrap`}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={sanitizedWords[index]}
        />
      ))}
      <Caret className={className} />
    </div>
  );
};

const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === ' ';

  return (
    <span
      className={cn({
        'text-red-500': !isCorrect && !isWhiteSpace,
        'text-primary-400': isCorrect && !isWhiteSpace,
        'bg-red-500/50': !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
