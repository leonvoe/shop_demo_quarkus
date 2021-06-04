import React, { Component } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "./stylesheet.css";

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

const api = axios.create({ baseURL: "http://localhost:8080/article" });

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      columns: [
        { title: "Name", transforms: [sortable] },
        { title: "Description", transforms: [sortable] },
        { title: "Category", transforms: [sortable] },
      ],
      sortBy: {},
      page: 1,
    };
    this.onSort = this.onSort.bind(this);

    this.onSetPage = (_event, pageNumber) => {
      this.setState({
        page: pageNumber,
      });
    };
    this.onPerPageSelect = (_event, perPage) => {
      this.setState({
        perPage,
      });
    };
  }

  componentDidMount() {
    api.get("/").then((res) => {
      this.setState({ articles: res.data });
    });
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.articles.sort((a, b) =>
      a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0
    );
    this.setState({
      sortBy: {
        index,
        direction,
      },
      articles:
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
          <Button variant="primary">Add Article</Button>
        </ToolbarItem>
        <ToolbarItem>
          <Pagination
            id={"pagination"}
            itemCount={5}
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

    const { columns, articles, sortBy } = this.state;

    return (
      <div>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Articles</Text>
            <Text component="p">Shows every listed article.</Text>
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
            rows={articles.map((article, index) => [
              article.name,
              article.description,
              article.category,
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

export default Articles;
