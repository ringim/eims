import { get } from 'lodash';

const ErrorMessage = ({ touched, errors, name }) => {
  let isTouched = get(touched, name);
  let errorMess = get(errors, name);
  return (
    <p style={{ color: 'red', fontWeight: '400', fontSize: '14px' }}>
      {isTouched && Boolean(errorMess) ? isTouched && errorMess : null}
    </p>
  );
};

export default ErrorMessage;
