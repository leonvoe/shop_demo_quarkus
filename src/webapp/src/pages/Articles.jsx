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

const api = axios.create({ baseURL: "http://localhost:8080/article" });

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      columns: [
        { title: "Name", transforms: [sortable] },
        { title: "Description", transforms: [sortable] },
        { title: "Category", transforms: [sortable] },
      ],
      rows: [],
      sortBy: {},
    };
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    api.get("/").then((res) => {
      this.setState({ articles: res.data });
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
        rows={this.state.articles.map((article) => [
          article.name,
          article.description,
          article.category,
        ])}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

export default Articles;
