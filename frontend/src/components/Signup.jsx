import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setHaveAcc, setUser } from '../reduxSetup/Slices/signSlice';
import '../style/signup.css';

const Signup = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.signup);

  const [usern, setUsern] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  function handleChange(e) {
    e.preventDefault();
    dispatch(setHaveAcc());
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUser({ username: usern, email: mail, password: pass }));
  }

  return (
    <div className='sign-background'>
      <h1 className='website-logo'>GameClick</h1>

      <div className='sign-bg'>
        <form onSubmit={handleSubmit}>
          <div className='signupform'>
            <p>Signup</p>
            <input
              type='text'
              required
              value={usern}
              onChange={(e) => setUsern(e.target.value)}
              placeholder='Username'
            />
            <br />
            <input
              type='email'
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder='Email'
            />
            <br />
            <input
              type='password'
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder='Password'
            />
            <br />
          </div>

          <button className='sign-button' type='submit' disabled={loading}>
            {loading ? 'Loading' : 'Signup'}
          </button>
        </form>

        {/* Error message */}
        {error && <p className='error-text'>{error}</p>}

        {/* Toggle to login */}
        <p onClick={handleChange} className='switch-form'>
          already registered..? login
        </p>
      </div>
    </div>
  );
};

export default Signup;
