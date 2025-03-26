import { useRouteError } from 'react-router-dom';
import LinkButton from './linkButton';

function Error() {

  const error = useRouteError();


  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to='-1'>&larr; Go back</LinkButton>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
