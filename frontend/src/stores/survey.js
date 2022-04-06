/* eslint-disable no-param-reassign */
import create from 'zustand';

const useStore = create(set => ({
  surveyResult: {
    age: null,
    feeling: null,
    category: null,
    amount: null,
    job: null,
    interest: [],
  },
  addSurveyResult: (key, value) =>
    set(state => {
      state.surveyResult[key] = value;
    }),
  addInterest: interest =>
    set(state => {
      const interests = state.surveyResult.interest;
      interests.push(interest);
    }),
  removeInterest: interest =>
    set(state => {
      state.surveyResult.interest.splice(
        state.surveyResult.interest.indexOf(interest),
        1,
      );
    }),
}));

export default useStore;
