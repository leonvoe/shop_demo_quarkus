import React, { Component } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";

import SearchIcon from "@patternfly/react-icons/dist/js/icons/search-icon";

import {
  PageSection,
  TextContent,
  Text,
  PageSectionVariants,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Pagination,
  PaginationVariant,
} from "@patternfly/react-core";

import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
} from "@patternfly/react-table";

import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/order" });

class Orders extends Component {
  constructor(props) {
    super(props);
    this.getLength();

    this.state = {
      orders: [],
      columns: [
        { title: "Shipping", transforms: [sortable] },
        { title: "Notes", transforms: [sortable] },
        { title: "Status", transforms: [sortable] },
        { title: "Customer", transforms: [sortable] },
        { title: "Articles", transforms: [sortable] },
      ],
      sortBy: {},
      page: "0",
      perPage: "10",
      length: 0,
    };
    this.onSort = this.onSort.bind(this);

    this.onSetPage = (_event, value) => {
      this.fetch(value - 1, this.state.perPage);
      this.setState({
        page: value,
      });
    };
    this.onPerPageSelect = (_event, value) => {
      this.setState({
        perPage: value,
      });
      this.fetch(0, value);
    };
  }

  getLength = () => {
    api.get("/length").then((res) => {
      this.setState({ length: res.data });
    });
  };

  fetch = (pageParameter, perPageParameter) => {
    const params = {
      page: pageParameter,
      size: perPageParameter,
    };

    api.get("/paginated", { params }).then((res) => {
      this.setState({ orders: res.data });
    });
  };

  componentDidMount() {
    this.fetch("0", "10");
    console.log(this.state.length);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.orders.sort((a, b) =>
      a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0
    );
    this.setState({
      sortBy: {
        index,
        direction,
      },
      orders:
        direction === SortByDirection.asc ? sortedRows : sortedRows.reverse(),
    });
  }

  render() {
    const toolbarItems = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="textInput1"
              id="textInput1"
              type="search"
              aria-label="search input example"
            />
            <Button
              variant={ButtonVariant.control}
              aria-label="search button for search input"
            >
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarItem>
        <ToolbarItem variant="separator" />
        <ToolbarItem>
          <Button variant="primary">Add Order</Button>
        </ToolbarItem>
        <ToolbarItem>
          <Pagination
            id={"pagination"}
            itemCount={this.state.length}
            widgetId="pagination-options-menu-top"
            perPage={this.state.perPage}
            page={this.state.page}
            variant={PaginationVariant.top}
            onSetPage={this.onSetPage}
            onPerPageSelect={this.onPerPageSelect}
            isCompact
          />
        </ToolbarItem>
      </React.Fragment>
    );

    const { columns, orders, sortBy } = this.state;

    return (
      <div>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Orders</Text>
            <Text component="p">Shows every listed order.</Text>
          </TextContent>
          <Toolbar id="toolbar">
            <ToolbarContent>{toolbarItems}</ToolbarContent>
          </Toolbar>
        </PageSection>
        <PageSection>
          <Table
            aria-label="Sortable Table"
            sortBy={sortBy}
            onSort={this.onSort}
            cells={columns}
            rows={orders.map((order, index) => [
              order.shipping,
              order.notes,
              order.status,
              order.customer.first_name || order.customer.last_name,
              order.articles
                .map(function (e) {
                  return e.name;
                })
                .join(", "),
            ])}
          >
            <TableHeader />
            <TableBody />
          </Table>
        </PageSection>
      </div>
    );
  }
}

export default Orders;
