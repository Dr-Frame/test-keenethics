import './Bike.scss';
import classnames from 'classnames';
import bikesAction from '../../redux/bikes/bikes-action';
import { useDispatch } from 'react-redux';
import { STATUS_TYPES } from '../../constants/statusTypes';
import CloseBtn from '../CloseBtn';

export default function Bike({ bikeInfo }) {
  const dispatch = useDispatch();
  const { name, type, color, id, price, status } = bikeInfo;

  const handleStatusChange = e => {
    const changedStatus = e.target.value;
    dispatch(bikesAction.changeBikeStatus(changedStatus, id));
  };

  const handleDeleteBike = () => {
    dispatch(bikesAction.deleteBike(id));
  };

  const bikePrice = Number(price).toFixed(2);

  return (
    <div
      className={classnames('bike', {
        'bike--available': status === STATUS_TYPES.AVAILABLE,
        'bike--busy': status === STATUS_TYPES.BUSY,
        'bike--unavailable': status === STATUS_TYPES.UNAVAILABLE,
      })}
    >
      <p className="bike__text">
        <span>{name}</span> - {type} ({color})
      </p>
      <p className="bike__id">ID: {id}</p>
      <div className="bike__status-wrapper">
        <p className="bike__text">Status:</p>

        <select
          className="bike__select"
          id={id}
          value={status}
          onChange={handleStatusChange}
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <p className="bike__price">{bikePrice} UAH/hr.</p>
      </div>
      <CloseBtn onClick={handleDeleteBike} />
    </div>
  );
}
