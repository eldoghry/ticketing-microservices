import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, error } = useRequest({
    method: "post",
    url: "/api/users/signup",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="signupInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="signupInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="signupInputPassword1"
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

export default Signup;
