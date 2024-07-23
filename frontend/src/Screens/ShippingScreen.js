import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShipping } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

function ShippingScreen(props) {
  //alternative to props.history.push
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalcode, setPostalCode] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    // avoid refresh
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalcode, country }));
    navigate("/payment");
  };

  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id);
  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="postalcode">Postal Code</label>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </li>

            <li>
              <button className="button primary" type="submit">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
