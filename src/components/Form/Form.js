import './Form.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import bikesAction from '../../redux/bikes/bikes-action';
import bikesSelectors from '../../redux/bikes/bikes-selectors';
import { STATUS_TYPES } from '../../constants/statusTypes';

const inputMessage = {
  requiredMessage: 'This fild is required!',
  minLengthErrorMessage: 'This field must exceed 4 characters',
  numberOnlyErrorMessage: 'This input is number only',
};

export default function Form() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const bikesDatabase = useSelector(bikesSelectors.getBikesDatabase);
  const { requiredMessage, minLengthErrorMessage, numberOnlyErrorMessage } =
    inputMessage;

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

  const handleErrors = messages => {
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <p className="form__input-error" key={type}>
            {message}
          </p>
        ))
      : null;
  };

  return (
    <section>
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
                  required: requiredMessage,
                  minLength: {
                    value: 5,
                    message: minLengthErrorMessage,
                  },
                })}
                placeholder="Name"
                className="form__input form__input_with-margin"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>

            <div className="form__item">
              <input
                type="text"
                {...register('color', {
                  required: requiredMessage,
                  minLength: {
                    value: 5,
                    message: minLengthErrorMessage,
                  },
                })}
                placeholder="Color"
                className="form__input"
              />
              <ErrorMessage
                errors={errors}
                name="color"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>

            <div className="form__item">
              <input
                {...register('price', {
                  required: requiredMessage,
                  pattern: {
                    value: /^\d+$/,
                    message: numberOnlyErrorMessage,
                  },
                })}
                placeholder="Price"
                className="form__input form__input_with-margin"
              />
              <ErrorMessage
                errors={errors}
                name="price"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>
          </div>

          <div className="form__inputs-wrapper_right">
            <div className="form__item">
              <input
                type="text"
                {...register('type', {
                  required: requiredMessage,
                  minLength: {
                    value: 5,
                    message: minLengthErrorMessage,
                  },
                })}
                placeholder="Type"
                className="form__input"
              />
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>

            <div className="form__item">
              <input
                {...register('size', {
                  required: requiredMessage,
                  pattern: {
                    value: /^\d+$/,
                    message: numberOnlyErrorMessage,
                  },
                })}
                placeholder="Wheel size"
                className="form__input form__input_with-margin"
              />
              <ErrorMessage
                errors={errors}
                name="size"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>

            <div className="form__item">
              <input
                {...register('id', {
                  required: requiredMessage,
                  pattern: {
                    value: /^\d+$/,
                    message: numberOnlyErrorMessage,
                  },
                  validate: isIdUnique,
                })}
                placeholder="ID (slug):xxxxxxxxxx"
                className="form__input"
              />

              {errors.id && errors.id.type === 'validate' && (
                <p className="form__input-error">This id is already exsist</p>
              )}
              <ErrorMessage
                errors={errors}
                name="id"
                render={({ messages }) => handleErrors(messages)}
              />
            </div>
          </div>

          <div className="form__item">
            <input
              type="text"
              {...register('description', {
                required: requiredMessage,
                minLength: {
                  value: 5,
                  message: minLengthErrorMessage,
                },
              })}
              placeholder="Description"
              className="form__input form__input_large"
            />
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ messages }) => handleErrors(messages)}
            />
          </div>
        </div>
        <button type="submit" className="form__btn form__btn_left">
          Save
        </button>
        <button type="button" onClick={handleReset} className="form__btn">
          Clear
        </button>
      </form>
    </section>
  );
}
