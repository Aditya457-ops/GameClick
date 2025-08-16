import Logout from './Logout'
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Upload from './Upload';
import { useDispatch } from 'react-redux';
import { setMode } from '../reduxSetup/Slices/userPostSlice';
import '../style/profileheader.css'
import { FiUpload } from 'react-icons/fi';
import {AiOutlineArrowLeft} from 'react-icons/ai';

const ProfileHeader = ({username}) => {

    const dispatch = useDispatch();

    function handleClick(mode) {

        dispatch(setMode(mode));
    }

    return (
        <div className='profile-header'>

            <div className='name-upload'>
                <div className='profile-salute'>
                    <div className='profile-avatar'>
                    {username.charAt(0).toUpperCase()}
                    </div>
                    <p className='welcome-username'>{username}</p>
                </div>
                <div className='logout-upload'>
                    <Popup trigger={<button> <FiUpload size={25}/></button>} position="left top">
                        <div>
                            <Upload/>
                        </div>
                    </Popup>
                    <Logout />
                </div>
            </div>


            <div className='feed-log'>
                <NavLink to="/feed"> <AiOutlineArrowLeft size={25}/></NavLink>
                <div className="post-filter">
                    <input type="radio" id="uploads" name="filter" defaultChecked onClick={() => handleClick("user")}/>
                    <label htmlFor="uploads">uploads </label>

                    <input type="radio" id="liked" name="filter" onClick={() => handleClick("like")}/>
                    <label htmlFor="liked">liked</label>
                </div>
                
            </div>
            

        </div>
    )
}

export default ProfileHeader