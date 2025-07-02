import { useNavigate } from 'react-router-dom';
import '../style/profileicon.css'
import '../style/feedheader.css'

const FeedHeader = ({username}) => {

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate('/profile')
  }

  return (
    <div className='feedheader'>
      <p>Welcome, {username}</p>
      <div className='profile-icon-pos'>
        <a onClick={handleClick} title="Go to about me page" className="profile-icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>

  )
}

export default FeedHeader