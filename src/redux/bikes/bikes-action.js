import { createAction } from '@reduxjs/toolkit';

const addBike = createAction('bikes/addBike', bike => ({
  payload: bike,
}));

const deleteBike = createAction('bikes/deleteBike', id => ({ payload: id }));

const addBikeStatus = createAction('bikes/addBikeStatus', (status, id) => ({
  payload: { status, id },
}));

export default {
  addBike,
  deleteBike,
  addBikeStatus,
};
