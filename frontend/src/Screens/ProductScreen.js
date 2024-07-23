import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";

function ProductScreen(props) {
  //alternative to props.history.push
  let navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const { product, loading, error } = productDetails;
  const { id } = useParams();

  useEffect(() => {
    dispatch(detailsProduct(id));
    return () => {
      //
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    navigate("/cart/" + id + "?qty=" + qty);
  };

  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id);
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img
              src={
                product.image && product
                  ? product.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihnCpEEHh_1RibMy7fjYaYNQDK7SZh8V5TpCnBp1NBw&s"
              }
              alt="product"
            />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: ${product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Out of stock"}
              </li>
              <li>
                Qty:{" "}
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) =>
                    x < 10 ? (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ) : null
                  )}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button className="button primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
