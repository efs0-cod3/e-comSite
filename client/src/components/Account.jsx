import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/features/userSlice'
function Account() {
  const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer)
    const handleLogout = () => {
      dispatch(logOut());
    };
  return (
    <div>
            <h2>{user.username}</h2>
            <h3>{user.name}</h3>
            <Link to={"/logout"} onClick={handleLogout}>Log out</Link>
            
    </div>
  )
}

export default Account