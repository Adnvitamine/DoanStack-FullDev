import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import ShopProductsCateg from "./shopProductsCateg";

class shopCateg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <Fragment>
        <div className="BrowserNavbar">
          <p>
            All our best {this.props.match.params.category}'s deals -
            DoanStack.be
          </p>
        </div>
        <div id="TitleLink">
          <h1>{this.props.match.params.category}</h1>
        </div>
        <div id="ShopBody">
          <div id="ShopNav">
            <ul>
              <li>
                <Link to="/">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "Cosmetic" && (
                  <Link to="/Cosmetic" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Cosmetic</b>
                  </Link>
                )) || (
                  <Link to="/Cosmetic">
                    <b>Cosmetic</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Fashion" && (
                  <Link to="/Fashion" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Fashion</b>
                  </Link>
                )) || (
                  <Link to="/Fashion">
                    <b>Fashion</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Food" && (
                  <Link to="/Food" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Food</b>
                  </Link>
                )) || (
                  <Link to="/Food">
                    <b>Food</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Grocery" && (
                  <Link to="/Grocery" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Grocery</b>
                  </Link>
                )) || (
                  <Link to="/Grocery">
                    <b>Grocery</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "PC" && (
                  <Link to="/PC" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>PC</b>
                  </Link>
                )) || (
                  <Link to="/PC">
                    <b>PC</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Property" && (
                  <Link to="/Property" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Property</b>
                  </Link>
                )) || (
                  <Link to="/Property">
                    <b>Property</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Service" && (
                  <Link to="/Service" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Service</b>
                  </Link>
                )) || (
                  <Link to="/Service">
                    <b>Service</b>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div id="ShopHome">
            <div id="ShopHomeProducts">
              <ShopProductsCateg category={this.props.match.params.category} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default shopCateg;
