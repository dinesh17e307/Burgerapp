import React, { useState, useEffect } from "react";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import Aux from "../Auxiliary";
const withErrorhandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, seterror] = useState(null);
    const [ismodal, setismodal] = useState(false);

    axios.interceptors.request.use((req) => {
      seterror(null);
      setismodal(false);
      return req;
    });
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        seterror(err);
        setismodal(true);
      }
    );

    const errorconfirmhandler = () => {
      seterror(null);
      setismodal(false);
    };

    return (
      <Aux>
        <Modal ordered={ismodal} clickedbackdrop={errorconfirmhandler}>
          {ismodal ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorhandler;
