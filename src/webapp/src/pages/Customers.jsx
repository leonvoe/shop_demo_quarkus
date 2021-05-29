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

const api = axios.create({ baseURL: "http://localhost:8080/customer" });

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      columns: [
        { title: "First name", transforms: [sortable] },
        { title: "Last name", transforms: [sortable] },
        { title: "Username", transforms: [sortable] },
        { title: "Date of birth", transforms: [sortable] },
        { title: "Gender", transforms: [sortable] },
      ],
      rows: [],
      sortBy: {},
    };
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    api.get("/").then((res) => {
      this.setState({ customer: res.data });
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
        rows={this.state.customer.map((customer) => [
          customer.first_name,
          customer.last_name,
          customer.username,
          customer.dob,
          customer.gender,
        ])}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default Customers;
