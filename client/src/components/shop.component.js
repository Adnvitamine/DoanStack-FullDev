import React, { Fragment, Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import ShopHome from "../components/shop/shopHome";
import ShopCateg from "../components/shop/shopCateg";
import ShopId from "../components/shop/shopId";
import "../assets/css/shop.css";

export default class Shop extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Router>
            <Switch>
              <Route exact path={["/", "/shop"]} component={ShopHome}></Route>
              <Route exact path="/:category" component={ShopCateg} />
              <Route exact path="/:category/:id/:title" component={ShopId} />
              {/*
              <Route
                exact
                path="/shop/:category/:id/:title"
                component={ShopId}
              />*/}
            </Switch>
          </Router>
        </HashRouter>
      </Fragment>
    );
  }
}
