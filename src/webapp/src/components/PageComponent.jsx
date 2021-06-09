import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Home from "./Home";
import Articles from "./Articles";
import Customers from "./Customers";
import Orders from "./Orders";

import "./stylesheet.css";

import {
  Page,
  PageHeader,
  PageHeaderTools,
  PageSidebar,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.onNavToggle = () => {
      this.setState({
        isNavOpen: !this.state.isNavOpen,
      });
    };
  }

  render() {
    const { isNavOpen } = this.state;

    const Header = (
      <PageHeader
        logo={
          <Link to="/" className="webshopLink">
            Webshop
          </Link>
        }
        headerTools={<PageHeaderTools>Sign-In</PageHeaderTools>}
        showNavToggle
        isNavOpen={isNavOpen}
        onNavToggle={this.onNavToggle}
      />
    );
    const Sidebar = <PageSidebar nav={<Navigation />} isNavOpen={isNavOpen} />;

    return (
      <Router>
        <Page header={Header} sidebar={Sidebar} id="page">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/articles" component={Articles} />
          </Switch>
        </Page>
      </Router>
    );
  }
}

export default PageComponent;
