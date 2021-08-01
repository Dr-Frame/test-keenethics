import './Statistics.scss';
import { useSelector } from 'react-redux';
import bikesSelectors from '../../redux/bikes/bikes-selectors';
import { STATUS_TYPES } from '../../constants/statusTypes';

export default function Statistics() {
  const bikesDatabase = useSelector(bikesSelectors.getBikesDatabase);

  function getAvaragePrice(bikes) {
    return (
      bikes.reduce((total, bike) => (total += Number(bike.price)), 0) /
      bikes.length
    ).toFixed(2);
  }

  const availabilityStats = bikesDatabase.reduce(
    (acc, bike) => {
      if (bike.status === STATUS_TYPES.AVAILABLE) {
        acc.availalble++;
      } else if (bike.status === STATUS_TYPES.BUSY) {
        acc.busy++;
      }
      /* acc[bike.status]++ */
      return acc;
    },
    { availalble: 0, busy: 0 },
  );

  return (
    <section className="statistic">
      <div className="statistic__inner">
        <h2 className="statistic__title">Statistics</h2>
        <ul className="statistic__list">
          <li className="statistic__item">
            Total Bikes: <span>{bikesDatabase.length}</span>
          </li>
          <li className="statistic__item">
            Available Bikes: <span>{availabilityStats.availalble}</span>
          </li>
          <li className="statistic__item">
            Booked Bikes: <span>{availabilityStats.busy}</span>
          </li>
          <li className="statistic__item">
            Average bike cost:{' '}
            <span>{getAvaragePrice(bikesDatabase)} UAH/hr</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
