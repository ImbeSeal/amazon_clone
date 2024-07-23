import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

function RegisterScreen(props) {
  //alternative to props.history.push
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/" + redirect);
    }
    return () => {
      //
    };
  }, [dispatch, navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    // avoid refresh
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id);
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>} {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <label htmlFor="repassword">Retype Password</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button className="button primary" type="submit">
              Create Account
            </button>
          </li>
          <li>Already have an Account?</li>
          <li>
            <Link
              to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              Sign-in
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
