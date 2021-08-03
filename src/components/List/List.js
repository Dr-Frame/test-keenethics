import './List.scss';
import bikesSelectors from '../../redux/bikes/bikes-selectors';
import { useSelector } from 'react-redux';
import Bike from '../Bike';

export default function List() {
  const bikesDatabase = useSelector(bikesSelectors.getBikesDatabase);

  return (
    <div className="bikes-info">
      {bikesDatabase.length ? (
        <ul className="bike-list">
          {bikesDatabase.map(bike => {
            return (
              <li className="bike-list__item" key={bike.id}>
                <Bike bikeInfo={bike} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="bike-list-empty">
          Your bike garage is empty! Please add one via form in the right!
        </p>
      )}
    </div>
  );
}
