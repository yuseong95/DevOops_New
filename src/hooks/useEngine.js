import { useCallback, useEffect, useState, useRef } from 'react';
import {
  countErrors,
  calculateAccuracyPercentage,
  calcutateScore,
} from '../utils/helpers';
import useCountdown from './useCountdown';
import useWords from './useWords';

const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState('start');
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);
  const { currentLine, nextLineText, nextLine, resetLines } = useWords();
  const [typed, setTyped] = useState('');
  const totalTyped = useRef(0);
  const [errors, setErrors] = useState(0);
  const inputBuffer = useRef(''); // 키 입력을 즉시 처리하기 위한 버퍼

  const stateRef = useRef(state);
  const currentLineRef = useRef(currentLine);
  useEffect(() => {
    console.log('Typed state updated:', typed);
  }, [typed]);
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

      // 타이핑 시작 시 상태 변경
      if (stateRef.current === 'start' && key.length === 1 && key !== 'Enter') {
        setState('run');
        startCountdown();
      }

      if (stateRef.current != 'start' && key === 'Enter') {
        const expected = currentLineRef.current;
        const actual = inputBuffer.current; // 버퍼에서 현재 입력된 내용 가져오기
        const lineErrors = countErrors({ actual, expected });
        setErrors((prevErrors) => prevErrors + lineErrors);

        // 입력 초기화 및 다음 줄 이동
        inputBuffer.current = ''; // 입력 버퍼 초기화
        setTyped('');
        nextLine();
      } else if (key === 'Backspace') {
        // 입력 버퍼에서 마지막 문자 제거
        inputBuffer.current = inputBuffer.current.slice(0, -1);
        setTyped(inputBuffer.current); // UI 동기화
        totalTyped.current = Math.max(0, totalTyped.current - 1);
      } else if (key.length === 1) {
        // 입력 버퍼에 문자 추가
        inputBuffer.current += key;
        setTyped(inputBuffer.current); // UI 동기화
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
      const expected = currentLineRef.current;
      const actual = inputBuffer.current; // 버퍼에서 현재 입력된 내용 가져오기
      const maxLength = actual.length;
      let errors = 0;
      for (let i = 0; i < maxLength; i++) {
        if (actual[i] !== expected[i]) {
          errors++;
        }
      }
      setErrors((prevErrors) => prevErrors + errors);
    }
  }, [timeLeft, state]);

  const accuracyPercentage = calculateAccuracyPercentage({
    errors,
    total: totalTyped.current,
  });

  const calScore = calcutateScore({
    errors,
    total: totalTyped.current,
  });
  console.log('Calculated Score:', calScore);

  const restart = useCallback(() => {
    resetCountdown();
    setState('start');
    setErrors(0);
    resetLines();
    inputBuffer.current = ''; // 입력 버퍼 초기화
    setTyped(''); // 상태 초기화
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
    calScore,
  };
};

export default useEngine;
