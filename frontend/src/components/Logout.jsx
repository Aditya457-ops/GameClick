import { useDispatch } from "react-redux"
import { setState } from "../reduxSetup/Slices/logSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';


const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        dispatch(setState());
        navigate('/');
    }

    return (
        <div>
            <button onClick={handleClick}> <FiLogOut size={25}/> </button>
        </div>
    )
}

export default Logout