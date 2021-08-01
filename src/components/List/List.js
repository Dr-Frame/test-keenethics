import './List.scss';
import bikesSelectors from '../../redux/bikes/bikes-selectors';
import { useSelector } from 'react-redux';
import Bike from '../Bike';

export default function List() {
  const bikesDatabase = useSelector(bikesSelectors.getBikesDatabase);

  console.log('bikesDatabase', bikesDatabase);
  return (
    <section className="bikes-info">
      {bikesDatabase.length !== 0 ? (
        <ul className="bike-list">
          {bikesDatabase.map(bike => {
            return (
              <li key={bike.id}>
                <Bike bikeInfo={bike} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="bike-list_empty">
          Your bike garage is empty! Please add one via form above
        </p>
      )}
    </section>
  );
}
