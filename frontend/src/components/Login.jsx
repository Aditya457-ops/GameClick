import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { setToken, setUsername } from '../reduxSetup/Slices/logSlice';
import { setHaveAcc } from '../reduxSetup/Slices/signSlice';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const LogIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, logged, token } = useSelector((state) => state.login);

  useEffect(() => {
    if(logged && token) {
      navigate('/feed');
    }
  }, [logged, token, navigate])
  
  function handleChange(e) {
    e.preventDefault();
    dispatch(setHaveAcc());
  }


  const [uname, setMail] = useState('');
  const [pass, setPass] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); 
    dispatch(setUsername(uname));
    dispatch(setToken({username: uname, password: pass}));
  }

  return (
    <div className='log-background'>
      <h1 className='website-logo'>GameClick</h1>
      <div className='log-bg'>
        <form onSubmit={handleSubmit}>
          <div className='loginform'>
            <p>Login</p>
            <br/>
            <input type='text' required={true} value={uname} onChange={(e) => {setMail(e.target.value)}} placeholder='Username' />
            <br/>
            <input type='password' required={true} value={pass} onChange={(e) => {setPass(e.target.value)}} placeholder='Password' />
            <br/>
          </div>
          <button className='log-button' type='submit' disabled={loading}> {loading ? `Loading` : `Login`} </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <p onClick={handleChange}> new ..? signup </p>
      </div>
    </div>
  )

}

export default LogIn