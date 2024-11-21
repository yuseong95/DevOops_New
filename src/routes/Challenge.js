import React, { useEffect, useState } from 'react';
import GeneratedWords from '../components/GeneratedWords';
import RestartButton from '../components/RestartButton';
import { useNavigate } from 'react-router-dom';
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
  const [showToast, setShowToast] = useState(true); // Control toast visibility
  const navigate = useNavigate();
  useEffect(() => {
    // Hide the toast after 3 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  useEffect(() => {
    // Show modal when the game ends
    if (state === 'finish') {
      setIsModalOpen(true);
    }
  }, [state]);

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // 비로그인 상태라면 로그인 페이지로 이동
    if (!loggedInUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-[35vh] ">
      <br />
      <br />
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
      {/* Toast message */}
      {showToast && (
        <div className="mt-2 p-2 font-sans font-bold text-yellow-500 rounded shadow">
          타이핑시 챌린지가 시작됩니다.
        </div>
      )}
      {/* Modal controlled by isModalOpen */}
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
