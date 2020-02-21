import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode"
import {GET_ERRORS,SET_CURRENT_USER,USER_LOADING} from "./types"

//register user

export const registerUser = (userData, history) => dispatch => {
    
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  //login user
  export const loginUser = userData =>
      dispatch=>{
            dispatch({type: 'USER_LOADING'})
          axios.post("/api/users/login",userData).then(res=>{
            const {token} = res.data;  
            localStorage.setItem("jwtToken",token);
            setAuthToken(token)
            const decode = jwt_decode(token)
          
            dispatch(setCurrentUser(decode))
         
          }).catch(err=>{
              dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
              })
          })
      }
  
  
//Set logged in user 

export const setCurrentUser = decode =>{
    return{
        type:SET_CURRENT_USER,
        payload:decode
    }
}

//USER LODING

export const setUserLoading = ()=>{
    return{
        type:USER_LOADING
    }
}
// Log user out

export const logoutUser = () =>
    dispatch =>{
        localStorage.removeItem("jwtToken")
        setAuthToken(false)
        dispatch(setCurrentUser({}))
    }
