import React, { Fragment, Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import BlogHome from "../components/blog/blogHome";
import BlogCateg from "../components/blog/blogCateg";
import BlogId from "../components/blog/blogId";
import "../assets/css/blog.css";

export default class Blog extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Router>
            <Switch>
              <Route exact path={["/", "/blog"]} component={BlogHome}></Route>
              <Route exact path="/:category" component={BlogCateg} />
              <Route exact path="/:category/:id/:title" component={BlogId} />
              {/*  <Route exact path="/blog/BackEnd/:id/:title" component={BlogId} />
              <Route
                exact
                path="/blog/FrontEnd/:id/:title"
                component={BlogId}
              />
              <Route exact path="/blog/Life/:id/:title" component={BlogId} />
              <Route exact path="/blog/Others/:id/:title" component={BlogId} />
            */}
            </Switch>
          </Router>
        </HashRouter>
      </Fragment>
    );
  }
}
