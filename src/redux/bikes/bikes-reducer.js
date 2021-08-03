import { createReducer, combineReducers } from '@reduxjs/toolkit';
import bikesActions from './bikes-action';

const bikesData = createReducer([], {
  [bikesActions.addBike]: (state, { payload }) => [payload, ...state],
  [bikesActions.deleteBike]: (state, { payload }) =>
    state.filter(bike => bike.id !== payload),

  [bikesActions.changeBikeStatus]: (state, { payload }) =>
    state.map(bike => {
      return {
        ...bike,
        status: bike.id === payload.id ? payload.status : bike.status,
      };
    }),
});

export default combineReducers({
  bikesData,
});
