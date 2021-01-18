import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ShopViewImage from "./shopViewImage";
import ProductRatings from "./productRatings/productRatings";
import ProductCreateRating from "./productRatings/productCreateRating";
import ProductCreateReview from "./productComs/productCreateReview";
import ProductReadReviews from "./productComs/productReadReviews";
import ShopLogin from "./shopLogin";

const ShopIdProduct = ({ productId, currentUser }) => {
  //const id =
  const history = useHistory();
  const [user] = useState(currentUser);
  const [product, setProduct] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [click1, setClick1] = useState();
  const [click2, setClick2] = useState();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/${productId}`
        );
        const jsonData = await response.json();
        setProduct(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/shop/${product.category}`
        );
        const jsonData = await response.json();
        setListProducts(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getListProducts();
  }, [product.category]);

  const back = () =>{
    history.goBack();
  }

  const activeClick1 = () =>{
    setClick1("true");
    setClick2("false");
  }

  const activeClick2 = () =>{
    setClick2("true");
    setClick1("false");
  }
  let clickStatus1;
  let clickStatus2;
  if(click1==="true"){
    clickStatus1 = <Fragment>
    <div className="BrowserNavbar">
        <p>Sign in to rate this product</p>
    </div><ShopLogin></ShopLogin></Fragment>;
  }
  if(click2==="true"){
    clickStatus2 = <Fragment>
    <div className="BrowserNavbar">
        <p>Sign in to review this product</p>
    </div><ShopLogin></ShopLogin></Fragment>;
  }

  return (
    <Fragment>
    <div id="TitleLink">
      <h2>{product.name}</h2>
    </div>
      <div className="BrowserNavbar">
        {user === "Visitor" && (
          <p>
            "By{" "}
            {product.vendor_avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {product.vendor_avatar !== "null" && (
              <img
                src={product.vendor_avatar}
                className="profile-img-card"
                alt={product.vendor}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {product.vendor}. Sign in to rate or review product"
          </p>
        )}
        {user.username && (
          <p>
            "By{" "}
            {product.vendor_avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {product.vendor_avatar !== "null" && (
              <img
                src={product.vendor_avatar}
                className="profile-img-card"
                alt={product.vendor}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {product.vendor}. Logged as  {!user.avatar && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="guest"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.username}
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}>
                </img>
            )}{user.username}."
          </p>
        )}
      </div>
      <div id="ShopBody">
        <div id="ShopNav">
          <ul>
            <li>
              <Link to="/shop">
                <b>All</b>
              </Link>
            </li>
            <li>
              {(product.category === "Cosmetic" && (
                <Link to="/shop/Cosmetic" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
                  <b>Cosmetic</b>
                </Link>
              )) || (
                <Link to="/Cosmetic">
                  <b>Cosmetic</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Fashion" && (
                <Link to="/shop/Fashion" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
                  <b>Fashion</b>
                </Link>
              )) || (
                <Link to="/shop/Fashion">
                  <b>Fashion</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "PC" && (
                <Link to="/shop/PC" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
                  <b>Pc</b>
                </Link>
              )) || (
                <Link to="/shop/PC">
                  <b>Pc</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Estate" && (
                <Link to="/shop/Estate" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
                  <b>Estate</b>
                </Link>
              )) || (
                <Link to="/shop/Estate">
                  <b>Estate</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Services" && (
                <Link to="/shop/Services" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
                  <b>Services</b>
                </Link>
              )) || (
                <Link to="/shop/Services">
                  <b>Services</b>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div id="ShopHome">
          <div className="backbutton" style={{ marginBottom: "10px" }}>
          <button type="button" className="btn btn-warning" onClick={back} style={{ color: "white", textDecoration: "none"}}>Back</button>
          </div>
          <div id="ShopHomeProduct">
            <div className="productSoloHeader">
              <div id="ImageFrame">
                <ShopViewImage product={product} productImage={product.image} />
                <img
                  src={product.image}
                  alt={product.name}
                ></img>
              </div>
                <div className="productSoloInfo">
                <div className="productSoloName">
                  <p>{product.name}</p>
                </div>
                <div className="productSoloRating">
                  <ProductRatings productId={productId} />
                </div>
                <div className="productSoloPrice">
                  <p>€{product.price}</p>
                </div>
                {product.quantity !== 0 && (
                  <div className="productSoloQuantity">
                    {(product.quantity === 1 && (
                      <p style={{ color: "black" }}>
                        <span className="warning" style={{ color: "#b12704" }}>
                          <b>Last piece !!!</b>
                        </span>
                      </p>
                    )) || (
                      <p style={{ color: "black" }}>
                        <span
                          className="noWarning"
                          style={{ color: "##018b08" }}
                        >
                          {product.quantity} pcs left
                        </span>
                      </p>
                    )}
                  </div>
                )}
                <div className="productSoloAdd">
                  <button type="button" className="btn btn-warning">
                    <i className="fas fa-cart-plus"></i>
                    <p>Add to cart</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="productSoloContent">
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className="relatedProducts">
            <div className="ComponentTitle">
                <div>
                  <h1>Same category</h1>
                </div>
              </div>
              <ul>
                  {listProducts.map((listproduct)=>(
                    <Link to={`/shop/${listproduct.category}/${listproduct.id}/${listproduct.name}`} style={{ textDecoration: "none"}}>
                        { listproduct.id !== product.id && (
                          <li><p>{listproduct.name}</p></li>
                        )}
                    </Link>
                  ))}
                </ul>
            </div>
            <div className="rateThisProduct">
              <div className="ComponentTitle">
                <div>
                  <h1>Rate this product</h1>
                </div>
              </div>
              {user === "Visitor" && (
                <p>To rate this product, please: &nbsp;
                  <button type="button" className="btn btn-warning" onClick={activeClick1}>Sign in</button>
                </p>
              )}
              {user.username && (
                <ProductCreateRating productId={productId} userId={user.id} />
              )}
              {clickStatus1}
            </div>
            <div className="reviewProduct">
              <div className="ComponentTitle">
                <div>
                  <h1>Write a review</h1>
                </div>
              </div>
              {user === "Visitor" && (
                <p>To write a review, please: &nbsp;
                  <button type="button" className="btn btn-warning" onClick={activeClick2}>Sign in</button> 
                </p>
              )}
              {user.username && (
                <ProductCreateReview productId={productId} user={user} />
              )}
              {clickStatus2}
            </div>
              <ProductReadReviews
                productId={productId}
                productName={product.name}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopIdProduct;
