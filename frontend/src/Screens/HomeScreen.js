import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import axios from "axios";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  console.log(products);
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, [dispatch]);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <div className="product__image__container">
              <Link to={"/product/" + product._id}>
                <img
                  src={product.image}
                  alt="product"
                  className="product__image"
                />
              </Link>
            </div>

            <div className="product__name">
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </div>
            <div className="product__brand">{product.brand}</div>
            <div className="product__price">{product.price}</div>
            <div className="product__rating">
              {product.rating} ({product.numReviews} reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeScreen;
