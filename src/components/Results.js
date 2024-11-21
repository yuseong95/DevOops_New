import { motion } from 'framer-motion';
import { formatPercentage, formatScore } from '../utils/helpers';
import { IoCloseCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateTypingGameScore } from '../redux/userActions'; // Redux 액션 가져오기

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className = '',
  calScore,
  onClose, // 모달 닫기 핸들러
}) => {
  const dispatch = useDispatch(); // Redux dispatch 가져오기
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // 현재 로그인된 사용자 정보

  // 상태가 'finish'인 경우 점수 저장
  useEffect(() => {
    if (state === 'finish' && loggedInUser.id) {
      dispatch(updateTypingGameScore(loggedInUser.id, calScore));
    } else if (state === 'finish' && !loggedInUser.id) {
      console.error('User ID not found in loggedInUser');
    }
  }, [state, loggedInUser.id, calScore, dispatch]);

  // 애니메이션 설정
  const initial = { opacity: 0, y: -50 };
  const animate = { opacity: 1, y: 0 };
  const exit = { opacity: 0, y: 50 };

  // 상태가 'finish'가 아니면 아무것도 렌더링하지 않음
  if (state !== 'finish') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.3 }}
        className={`bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-2xl ${className}`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Results
        </h2>
        <ul className="space-y-5 text-lg text-center">
          <li className="text-yellow-500">
            Accuracy: {formatPercentage({ percentage: accuracyPercentage })}
          </li>
          <li className="text-red-600">Errors: {errors}</li>
          <li className="text-yellow-500">Typed: {total}</li>
          <li className="text-green-500 font-bold">
            Score: {formatScore({ score: calScore })}
          </li>
        </ul>

        <div className="flex justify-center mt-6">
          <IoCloseCircle
            onClick={onClose}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            size={50}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
