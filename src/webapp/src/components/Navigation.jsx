import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import "./stylesheet.css";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 3,
    };
    this.onSelect = (result) => {
      this.setState({
        activeItem: result.itemId,
      });
    };
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Nav onSelect={this.onSelect} aria-label="Nav">
        <NavList>
          <NavItem id="orders-link" itemId={0} isActive={activeItem === 0}>
            <Link to="/orders">Orders</Link>
          </NavItem>
          <NavItem id="articles-link" itemId={1} isActive={activeItem === 1}>
            <Link to="/articles">Articles</Link>
          </NavItem>
          <NavItem id="customers-link" itemId={2} isActive={activeItem === 2}>
            <Link to="/customers">Customers</Link>
          </NavItem>
        </NavList>
      </Nav>
    );
  }
}

export default Navigation;
