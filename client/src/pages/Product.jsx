import React, { useEffect, useState } from "react";
import { getProduct , productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct.jsx";
import { useDispatch, useSelector } from "react-redux";


const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  // const [star, setStar] = useState(0);
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(false)
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const { slug } = match.params;

  // const handleBidding = async (bidding) => {
  //   try {
  //     localStorage.setItem("bid", JSON.stringify(bidding));
  //     dispatch({
  //       type: "ADD_BID",
  //       payload: bidding,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const loadSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(slug);
      setLoading(false);
      if (res.success && res.data) {
        setProduct(res.data);

        // const relatedData = await getRelated(res.data._id);
        // setRelated(relatedData.data);

      
      } else {
        console.error("Invalid product data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [product.ratings, user]);

  // useEffect(() => {
  //   // Retrieve bidding data from localStorage on component mount
  //   const bidData = JSON.parse(localStorage.getItem("bid"));
  //   console.log(bidData)
  //   if (bidData) {
  //     setBidding(bidData);
  //   }
  // }, []);
  
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          // bidding = {bidding}
          loadSingleProduct = {loadSingleProduct}
        />
      </div>

      {/* <div className="row">
        <div className="col text-center pb-5" style={{paddingTop : "200px"}}>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div> */}
    </div>
  );
};

export default Product;