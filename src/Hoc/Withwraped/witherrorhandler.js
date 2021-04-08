import React, { useState, useEffect } from "react";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import Aux from "../Auxiliary";
import usehttpclient from "../../Container/hooks/hookserror";
const withErrorhandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearerror] = usehttpclient(axios);

    return (
      <Aux>
        <Modal ordered={error} clickedbackdrop={clearerror}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorhandler;
