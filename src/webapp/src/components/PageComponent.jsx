import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      isNavOpen: true,
    };
    this.onNavToggle = () => {
      this.setState({
        isNavOpen: !this.state.isNavOpen,
      });
    };
  }

  render() {
    const { isNavOpen } = this.state;

    const logoProps = {
      href: "/",
      onClick: () => console.log("clicked logo"),
    };
    const Header = (
      <PageHeader
        logo="Webshop"
        logoProps={logoProps}
        headerTools={<PageHeaderTools>Sign-In</PageHeaderTools>}
        showNavToggle
        isNavOpen={isNavOpen}
        onNavToggle={this.onNavToggle}
      />
    );
    const Sidebar = <PageSidebar nav={<Navigation />} isNavOpen={isNavOpen} />;

    return (
      <Page header={Header} sidebar={Sidebar} id="page">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/articles" component={Articles} />
          </Switch>
        </Router>
      </Page>
    );
  }
}

export default PageComponent;
