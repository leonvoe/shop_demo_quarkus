import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import "./stylesheet.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
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
          <NavItem
            id="orders-link"
            to="/orders"
            itemId={0}
            isActive={activeItem === 0}
          >
            Orders
          </NavItem>
          <NavItem
            id="articles-link"
            to="/articles"
            itemId={1}
            isActive={activeItem === 1}
          >
            Articles
          </NavItem>
          <NavItem
            id="customers-link"
            to="customers"
            itemId={2}
            isActive={activeItem === 2}
          >
            Customers
          </NavItem>
        </NavList>
      </Nav>
    );
  }
}

export default Navigation;
