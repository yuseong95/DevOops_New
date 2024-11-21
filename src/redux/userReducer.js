import dummyUsers from '../data/dummyUsers';
const initiState = {
  users: dummyUsers.map((user) => ({
    ...user,
    errorGameScore: -1,
    typingGameScore: -1,
  })),
};

const userReducer = (state = initiState, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                errorGameScore: action.payload.score,
              }
            : user
        ),
      };
    case 'UPDATE_Typing_Game_SCORE':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                typingGameScore: action.payload.typingGameScore,
              }
            : user
        ),
      };
    case 'RESET_SCORES':
      return {
        ...state,
        users: state.users.map((user) => ({
          ...user,
          errorGameScore: -1,
          typingGameScore: -1,
        })),
      };
    case 'SYNC_USERS':
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
