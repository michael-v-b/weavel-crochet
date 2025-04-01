import {useEffect} from "react";
import useGlobalStore from "./globalStore";
import supabase from "./supabase";
import {useNavigate} from "react-router";

const AuthTester = ({reroute}) => {

  const navigate = useNavigate();

  const auth = useGlobalStore((state)=>state.auth);
  const setAuth = useGlobalStore((state)=>state.setAuth);
  const setAuthData = useGlobalStore((state)=>state.setAuthData);


  const checkSession = async() => {
    const {data,error} = await supabase.auth.getSession();
    if(data.session) {
      setAuth(data.session.user.aud == "authenticated");
      setAuthData(data.session);

      //if not authenticated reroute to location in reroute
    } else {;
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
