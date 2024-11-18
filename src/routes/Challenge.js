import React, { useEffect, useState } from 'react';
import GeneratedWords from '../components/GeneratedWords';
import RestartButton from '../components/RestartButton';
import Results from '../components/Results';
import UserTypings from '../components/UserTypings';
import useEngine from '../hooks/useEngine';

const Challenge = () => {
  const {
    state,
    currentLine,
    nextLineText,
    typed,
    errors,
    totalTyped,
    accuracyPercentage,
    restart,
    timeLeft,
    calScore,
  } = useEngine();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 게임이 끝나면 모달을 표시
    if (state === 'finish') {
      setIsModalOpen(true);
    }
  }, [state]);

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[35vh] ">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <div className="w-full max-w-4xl">
          <div className="relative font-mono text-2xl">
            <GeneratedWords key={currentLine} words={currentLine} />
            <UserTypings
              className="absolute inset-0 text-yellow-500 font-mono text-4xl"
              words={currentLine}
              userInput={typed}
            />
          </div>
        </div>
      </WordsContainer>
      <NextLinePreview
        className="font-mono text-2xl opacity-50"
        nextLineText={nextLineText}
      />
      <RestartButton
        className={'mx-auto mt-10 text-slate-500'}
        onRestart={restart}
      />
      {/* 모달을 isModalOpen 상태로 제어 */}
      {isModalOpen && (
        <Results
          className="mt-10 text-yellow-500"
          state={state}
          errors={errors}
          total={totalTyped}
          accuracyPercentage={accuracyPercentage}
          calScore={calScore}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div className="w-full max-w-5xl mt-4">
      <p className="text-xl mb-2">Current Line:</p>
      <div
        className={`relative font-mono text-2xl bg-gray-700 p-4 rounded overflow-x-auto`}
      >
        {children}
      </div>
    </div>
  );
};

const NextLinePreview = ({ nextLineText, className = '' }) => {
  return (
    <div className="w-full max-w-5xl mt-4">
      <p className="text-xl mb-2 opacity-50">Next Line:</p>
      <div
        className={`relative font-mono text-2xl bg-gray-700 p-4 rounded opacity-30 overflow-x-auto`}
      >
        {nextLineText}
      </div>
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
