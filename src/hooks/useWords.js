import { faker } from '@faker-js/faker';
import { useCallback, useState } from 'react';

const generateWords = (count) => {
  // count를 사용하여 지정된 단어 수 생성
  return faker.lorem.words(count);
};

const useWords = (count) => {
  const [words, setWords] = useState(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
};

export default useWords;
