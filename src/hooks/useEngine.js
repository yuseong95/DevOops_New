import { useCallback, useEffect, useState, useRef } from 'react';
import { countErrors, calculateAccuracyPercentage } from '../utils/helpers';
import useCountdown from './useCountdown';
import useWords from './useWords';

const COUNTDOWN_SECONDS = 10;

const useEngine = () => {
  const [state, setState] = useState('start');
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);
  const { currentLine, nextLineText, nextLine, resetLines } = useWords();
  const [typed, setTyped] = useState(''); // UI 업데이트용 상태
  const totalTyped = useRef(0); // 총 입력된 문자 수
  const [errors, setErrors] = useState(0); // 에러 수
  const typedRef = useRef(''); // 동기적으로 입력 상태를 관리
  const stateRef = useRef(state);
  const currentLineRef = useRef(currentLine);

  // 최신 상태를 ref에 저장
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    currentLineRef.current = currentLine;
  }, [currentLine]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      e.preventDefault();

      if (stateRef.current === 'finish') return;

      if (stateRef.current === 'start' && key.length === 1 && key !== 'Enter') {
        setState('run');
        startCountdown();
      }

      if (key === 'Enter') {
        const expected = currentLineRef.current;
        const actual = typedRef.current;
        const lineErrors = countErrors({ actual, expected });

        setErrors((prevErrors) => prevErrors + lineErrors);

        // 입력 초기화 및 다음 줄 이동
        typedRef.current = '';
        setTyped(''); // UI 업데이트
        nextLine();
      } else if (key === 'Backspace') {
        typedRef.current = typedRef.current.slice(0, -1);
        setTyped(typedRef.current); // UI 동기화
        totalTyped.current = Math.max(0, totalTyped.current - 1);
      } else if (key.length === 1) {
        typedRef.current += key;
        setTyped(typedRef.current); // UI 동기화
        totalTyped.current += 1;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startCountdown, nextLine]);

  useEffect(() => {
    if (timeLeft <= 0 && state === 'run') {
      setState('finish');
    }
  }, [timeLeft, state]);

  const accuracyPercentage = calculateAccuracyPercentage({
    errors,
    total: totalTyped.current,
  });

  const restart = useCallback(() => {
    resetCountdown();
    setState('start');
    setErrors(0);
    resetLines();
    typedRef.current = ''; // 입력 초기화
    setTyped(''); // UI 초기화
    totalTyped.current = 0;
  }, [resetCountdown, resetLines]);

  return {
    state,
    currentLine,
    nextLineText,
    typed,
    errors,
    totalTyped: totalTyped.current,
    accuracyPercentage,
    restart,
    timeLeft,
  };
};

export default useEngine;
