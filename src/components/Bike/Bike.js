import './Bike.scss';
import { useState } from 'react';
import classnames from 'classnames';
import bikesAction from '../../redux/bikes/bikes-action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { STATUS_TYPES } from '../../constants/statusTypes';
import CloseBtn from '../CloseBtn';

export default function Bike({ bikeInfo }) {
  const dispatch = useDispatch();
  const { name, type, color, id, price, status: bikeStatus } = bikeInfo;

  const [status, setStatus] = useState(bikeStatus || 'Available');

  const handleOptionChange = e => {
    setStatus(e.target.value);
  };

  const deleteBike = () => {
    dispatch(bikesAction.deleteBike(id));
  };

  useEffect(() => {
    dispatch(bikesAction.addBikeStatus(status, id));
  }, [dispatch, status, id]);

  return (
    <div
      className={classnames('bike-list__item', {
        'bike-list__item_available': status === STATUS_TYPES.AVAILABLE,
        'bike-list__item_busy': status === STATUS_TYPES.BUSY,
        'bike-list__item_unavailable': status === STATUS_TYPES.UNAVAILABLE,
      })}
    >
      <p className="bike-list__item__text">
        <span>{name}</span> - {type} ({color})
      </p>
      <p className="bike-list__item__id">ID: {id}</p>
      <div className="bike-list__item__status-wrapper">
        <p className="bike-list__item__text">Status:</p>

        <select
          className="bike-list__item__select"
          id={id}
          value={status}
          onChange={handleOptionChange}
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <p className="bike-list__item__price">
          {Number(price).toFixed(2)} UAH/hr.
        </p>
      </div>
      <CloseBtn deleteBike={deleteBike} />
    </div>
  );
}
