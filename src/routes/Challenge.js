import React from 'react';
import GeneratedWords from '../components/GeneratedWords';
import RestartButton from '../components/RestartButton';
import Results from '../components/Results';
import UserTypings from '../components/UserTypings';
import useEngine from '../hooks/useEngine';
import { calculateAccuracyPercentage } from '../utils/helpers';

const Challenge = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } =
    useEngine();

  // calculateAccuracyPercentage에 필요한 매개변수를 props 객체로 전달
  const accuracyPercentage = calculateAccuracyPercentage({
    errors,
    total: totalTyped,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[35vh]">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings
          className="absolute inset-0 text-yellow-500 font-mono text-4xl"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className={'mx-auto mt-10 text-slate-500'}
        onRestart={restart}
      />
      <Results
        className="mt-10  text-yellow-500"
        state={state}
        errors={errors}
        total={totalTyped}
        accuracyPercentage={accuracyPercentage}
      />
    </div>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }) => {
  return (
    <h2 className="text-primary-400 text-2xl font-mono text-yellow-500">
      Time: {timeLeft}
    </h2>
  );
};

export default Challenge;
