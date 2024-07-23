import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signin } from "../actions/userActions";

function SigninScreen(props) {
  //alternative to props.history.push
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      if (redirect === "/") navigate(redirect);
      else navigate("/" + redirect);
    }
    return () => {
      //
    };
  }, [dispatch, navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    // avoid refresh
    e.preventDefault();
    dispatch(signin(email, password));
  };

  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id);
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>} {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button className="button primary" type="submit">
              Sign In
            </button>
          </li>
          <li>New to Amazon?</li>
          <li>
            <Link
              to={
                redirect === "/"
                  ? "/register"
                  : "/register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create your Amazon account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
