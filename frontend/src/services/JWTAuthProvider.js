import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import { authData } from 'store/slices/authSlice';
import Loading from 'components/shared-components/Loading';
const JWTAuthAuthProvider = ({ children }) => {
  const { userData, token } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      dispatch(authData())
    }
  }, []);

  if (userData || !token) {
    setTimeout(() => {
      if (window.clarity && userData?.email) {
        console.log("ms clarity email: ", userData.email)
        window.clarity("set", "email", userData.email);
      }
    }, 3000);
    return children;
  } else {
    return <Loading cover="content" />
  }
};
export default JWTAuthAuthProvider;