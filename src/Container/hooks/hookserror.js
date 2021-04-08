import { useState } from "react";

export default (httpclient) => {
  const [error, seterror] = useState(null);
  const [ismodal, setismodal] = useState(false);

  httpclient.interceptors.request.use((req) => {
    seterror(null);
    setismodal(false);
    return req;
  });
  httpclient.interceptors.response.use(
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
  return [error, errorconfirmhandler];
};
