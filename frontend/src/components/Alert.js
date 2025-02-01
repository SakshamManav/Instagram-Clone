import React,{useContext} from "react";
import { UserContext } from "../Context/Usercontext";

export default function Alert() {
  const context = useContext(UserContext);
  const {alertMsg,showAlert} = context;
  
  return (
    showAlert &&
    <div class={`alert alert-${alertMsg.type}`} role="alert">
      {alertMsg.msg}
    </div>
  );
}
