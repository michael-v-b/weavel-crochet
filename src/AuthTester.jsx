import {useEffect} from "react";
import useGlobalStore from "./globalStore";
import supabase from "./supabase";
import {useNavigate} from "react-router";

const AuthTester = ({reverse = false, reroute}) => {

  const navigate = useNavigate();

  const auth = useGlobalStore((state)=>state.auth);
  const setAuth = useGlobalStore((state)=>state.setAuth);
  const setAuthData = useGlobalStore((state)=>state.setAuthData);


  const checkSession = async() => {
    const {data,error} = await supabase.auth.getSession();
    console.log("data: ")
    console.dir(data);
    if(data.session) {
      setAuth(data.session.user.aud == "authenticated");
      setAuthData(data.session);

      if(reverse) {
        navigate(reroute);
      }

      //if not authenticated reroute to location in reroute
    } else if(!reverse) {

      navigate(reroute);
      setAuth(false);
      setAuthData(null);
    }
    if(error) {
      console.log("error: " + error);
    }
  }

  
  useEffect(()=>{
    checkSession();

  },[])
  
};

export default AuthTester;
