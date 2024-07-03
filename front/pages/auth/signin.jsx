import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, error } = useRequest({
    method: "post",
    url: "/api/users/signin",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="signinInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="signinInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signinInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="signinInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {error}
      </form>
    </>
  );
};

export default Signin;
