import { useSelector } from 'react-redux'
import LogIn from './LogIn'
import Signup from './Signup'

const UserForm = () => {

    const { haveAcc } = useSelector((state) => state.signup)

    if(haveAcc) {
        return (
            <LogIn/>
        )
    } else {
        return (
            <Signup/>
        )
    }

}

export default UserForm