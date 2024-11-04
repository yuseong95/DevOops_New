import { useCallback, useEffect, useState } from 'react';
import { countErrors, debug } from '../utils/helpers';
import useCountdown from './useCountDown';
import useTypings from './useTypings';
import useWords from './useWords';

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState('start');
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== 'finish'
  );
  const [errors, setErrors] = useState(0);

  const isStarting = state === 'start' && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    debug('restarting...');
    resetCountdown();
    resetTotalTyped();
    setState('start');
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors(
      (prevErrors) =>
        prevErrors + countErrors({ actual: typed, expected: wordsReached })
    );
  }, [typed, words, cursor]);

  // Starts countdown as soon as typing begins
  useEffect(() => {
    if (isStarting) {
      setState('run');
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // Sets state to 'finish' when time runs out
  useEffect(() => {
    if (!timeLeft && state === 'run') {
      debug('time is up...');
      setState('finish');
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  // Checks if all words are completed and generates new words
  useEffect(() => {
    if (areWordsFinished) {
      debug('words are finished...');
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return { state, words, typed, errors, restart, timeLeft, totalTyped };
};

export default useEngine;
