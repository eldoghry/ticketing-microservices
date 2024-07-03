import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

const Signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <h3>Signing out... </h3>;
};

export default Signout;
