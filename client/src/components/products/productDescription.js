import React, { Fragment } from "react";

//
const ProductDescription = ({ product }) => {
  
  return (
    <Fragment>
      <div className="productContainer">
        <div className="productHeader">
          <a href={product.image}>
            <img
              src={product.image}
              alt={product.name}
              className="productImage"
            />
          </a>
          <div className="productName">{product.name}</div>
          <div
            id="ProductInfo"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div id="ProductInfoTop" style={{ width: "50%", margin: "auto" }}>
              <div id="productPrice">
                <p>
                  {new Intl.NumberFormat("fr-BE", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>
              </div>
            </div>
            <div id="ProductInfoBottom" style={{ margin: "auto" }}>
              <div className="productVendor">
                <p>
                {product.vendor_avatar === "null" && (
                    <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    className="user-img-card"
                    alt={product.author}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline-block",
                      marginBottom: "0",
                    }}
                  ></img>
                 )}
                 {product.vendor_avatar !== "null" && ( <img
                    src={product.vendor_avatar}
                    className="user-img-card"
                    alt={product.author}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline-block",
                      marginBottom: "0",
                    }}
                  ></img>)
                 }
                  <b>{product.vendor}</b>
                </p>
              </div>
              <div className="productDate">
                <p>
                  <b>
                    Since &nbsp;
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(Date.parse(product.createdAt))}
                  </b>
                </p>
              </div>

              {product.status === false && (
                <div className="productStatus">
                  <p>
                    <b>Waiting </b>
                    <i className="fas fa-circle" id="ProductStatusFalse"></i>
                  </p>
                </div>
              )}

              {product.status === true && (
                <div className="productStatus">
                  <p>
                    <b>On Sale </b>
                    <i className="fas fa-circle" id="ProductStatusTrue"></i>
                  </p>
                </div>
              )}
              <div className="productStock">
                <p style={{ color: "rgb(204, 7, 7)" }}>
                  <b>
                    {product.quantity}{" "}
                    <span style={{ color: "black" }}>pcs left</span>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="productBody">
          <div className="productDescription">
          <div
            className="productDescription"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDescription;
