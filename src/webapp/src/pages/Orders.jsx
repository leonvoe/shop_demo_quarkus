import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  wrappable,
  cellWidth,
  info,
} from "@patternfly/react-table";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/order" });

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      columns: [
        { title: "Shipping", transforms: [sortable] },
        { title: "Notes", transforms: [sortable] },
        { title: "Status", transforms: [sortable] },
        { title: "Customer", transforms: [sortable] },
        { title: "Articles", transforms: [sortable] },
      ],
      rows: [],
      sortBy: {},
    };
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    api.get("/").then((res) => {
      this.setState({ orders: res.data });
    });
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) =>
      a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0
    );
    this.setState({
      sortBy: {
        index,
        direction,
      },
      rows:
        direction === SortByDirection.asc ? sortedRows : sortedRows.reverse(),
    });
  }

  render() {
    const { columns, rows, sortBy } = this.state;

    return (
      <Table
        aria-label="Sortable Table"
        sortBy={sortBy}
        onSort={this.onSort}
        cells={columns}
        rows={this.state.orders.map((order) => [
          order.shipping,
          order.notes,
          order.status,
          order.customer.first_name + " " + order.customer.last_name,
          JSON.stringify(order.articles.map((article) => [article.name])),
        ])}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default Orders;
