import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

function PaymentScreen(props) {
  //alternative to props.history.push
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    // avoid refresh
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate("/placeorder");
  };

  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id);
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                {" "}
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
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

export default PaymentScreen;
