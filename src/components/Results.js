import { motion } from 'framer-motion';
import { formatPercentage } from '../utils/helpers';

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className = '',
}) => {
  if (state !== 'finish') {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage({ percentage: accuracyPercentage })}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
