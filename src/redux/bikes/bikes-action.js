import { createAction } from '@reduxjs/toolkit';

const addBike = createAction('bikes/addBike', bike => ({
  payload: bike,
}));

const deleteBike = createAction('bikes/deleteBike', id => ({ payload: id }));

const changeBikeStatus = createAction(
  'bikes/changeBikeStatus',
  (status, id) => ({
    payload: { status, id },
  }),
);

export default {
  addBike,
  deleteBike,
  changeBikeStatus,
};
