import './Form.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import bikesAction from '../../redux/bikes/bikes-action';
import bikesSelectors from '../../redux/bikes/bikes-selectors';
import { STATUS_TYPES } from '../../constants/statusTypes';
import { INPUT_ERROR_MESSAGE } from '../../constants/inputErrorMessages';

export default function Form() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const bikesDatabase = useSelector(bikesSelectors.getBikesDatabase);
  const {
    IS_REQUIRED,
    MIN_LENGTH,
    IS_EXIST,
    ID_MIN_LENGTH,
    ID_MAX_LENGTH,
    MAX_WHEEL_SIZE,
    MIN_WHEEL_SIZE,
    MAX_WHEEL_SIZE_EXCEED,
    MIN_WHEEL_SIZE_EXCEED,
  } = INPUT_ERROR_MESSAGE;

  const onSubmit = data => {
    data.status = STATUS_TYPES.AVAILABLE;
    dispatch(bikesAction.addBike(data));
    reset();
  };

  const handleReset = () => {
    reset();
  };

  const isIdUnique = id => {
    let idArr = [];
    bikesDatabase.forEach(bike => {
      idArr.push(bike.id);
    });

    return idArr.includes(id) === false;
  };

  return (
    <div className="form-wrapper">
      <form
        id="form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="form__inputs-wrapper">
          <div className="form__inputs-wrapper_left">
            <div className="form__item">
              <input
                type="text"
                {...register('name', {
                  required: IS_REQUIRED,
                  minLength: {
                    value: 5,
                    message: MIN_LENGTH,
                  },
                })}
                placeholder="Name"
                className="form__input form__input_with-margin"
              />
              {errors.name && (
                <p className="form__input-error">{errors.name.message}</p>
              )}
            </div>

            <div className="form__item">
              <input
                type="text"
                {...register('color', {
                  required: IS_REQUIRED,
                  minLength: {
                    value: 5,
                    message: MIN_LENGTH,
                  },
                })}
                placeholder="Color"
                className="form__input"
              />
              {errors.color && (
                <p className="form__input-error">{errors.color.message}</p>
              )}
            </div>

            <div className="form__item">
              <input
                type="number"
                {...register('price', {
                  required: IS_REQUIRED,
                })}
                placeholder="Price"
                className="form__input form__input_with-margin"
              />
              {errors.price && (
                <p className="form__input-error">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="form__inputs-wrapper_right">
            <div className="form__item">
              <input
                type="text"
                {...register('type', {
                  required: IS_REQUIRED,
                  minLength: {
                    value: 5,
                    message: MIN_LENGTH,
                  },
                })}
                placeholder="Type"
                className="form__input"
              />
              {errors.type && (
                <p className="form__input-error">{errors.type.message}</p>
              )}
            </div>

            <div className="form__item">
              <input
                type="number"
                {...register('size', {
                  required: IS_REQUIRED,
                  max: {
                    value: MAX_WHEEL_SIZE,
                    message: MAX_WHEEL_SIZE_EXCEED,
                  },
                  min: {
                    value: MIN_WHEEL_SIZE,
                    message: MIN_WHEEL_SIZE_EXCEED,
                  },
                })}
                placeholder="Wheel size"
                className="form__input form__input_with-margin"
              />
              {errors.size && (
                <p className="form__input-error">{errors.size.message}</p>
              )}
            </div>

            <div className="form__item">
              <input
                type="number"
                {...register('id', {
                  required: IS_REQUIRED,
                  minLength: {
                    value: 8,
                    message: ID_MIN_LENGTH,
                  },
                  maxLength: {
                    value: 8,
                    message: ID_MAX_LENGTH,
                  },
                  validate: isIdUnique,
                })}
                placeholder="ID (slug):xxxxxxxxxx"
                className="form__input"
              />

              {errors.id && errors.id.type === 'validate' && (
                <p className="form__input-error">{IS_EXIST}</p>
              )}
              {errors.id && (
                <p className="form__input-error">{errors.id.message}</p>
              )}
            </div>
          </div>

          <div className="form__item">
            <input
              type="text"
              {...register('description', {
                required: IS_REQUIRED,
                minLength: {
                  value: 5,
                  message: MIN_LENGTH,
                },
              })}
              placeholder="Description"
              className="form__input form__input_large"
            />
            {errors.description && (
              <p className="form__input-error">{errors.description.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className="form__btn form__btn_left">
          Save
        </button>
        <button type="button" onClick={handleReset} className="form__btn">
          Clear
        </button>
      </form>
    </div>
  );
}