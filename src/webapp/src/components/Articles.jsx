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
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Form,
  FormGroup,
  TextArea,
  FormSelect,
  FormSelectOption,
  Checkbox,
  ActionGroup,
} from "@patternfly/react-core";

import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
} from "@patternfly/react-table";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/article",
});

class Articles extends Component {
  constructor(props) {
    super(props);
    this.getLength();

    this.state = {
      articles: [],
      columns: [
        { title: "Name", transforms: [sortable] },
        { title: "Description", transforms: [sortable] },
        { title: "Category", transforms: [sortable] },
      ],
      sortBy: {},
      page: "0",
      perPage: "10",
      length: 0,
      isExpanded: false,

      articleCategoryValue: undefined,
      articleNameValue: "",
      articleDescriptionValue: "",
    };
    this.drawerRef = React.createRef();
    this.onSort = this.onSort.bind(this);

    this.handleArticleCategoryChange = (articleCategoryValue) => {
      this.setState({ articleCategoryValue });
    };
    this.handleArticleNameChange = (articleNameValue) => {
      this.setState({ articleNameValue });
    };
    this.handleArticleDescriptionChange = (articleDescriptionValue) => {
      this.setState({ articleDescriptionValue });
    };

    this.options = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "Toys", disabled: false },
      { value: 1, label: "Fashion", disabled: false },
      { value: 2, label: "Books", disabled: false },
      { value: 3, label: "Movies", disabled: false },
      { value: 4, label: "Games", disabled: false },
      { value: 5, label: "Music", disabled: false },
    ];

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

    this.onExpand = () => {
      this.drawerRef.current && this.drawerRef.current.focus();
    };

    this.onClickAddArticle = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({
        isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
      });
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
      this.setState({ articles: res.data });
    });
  };

  post = () => {
    api.post("/", {
      name: this.state.articleNameValue,
      description: this.state.articleDescriptionValue,
      category: this.state.articleCategoryValue,
    });
    this.setState({
      isExpanded: false,
      articleNameValue: "",
      articleDescriptionValue: "",
      articleCategoryValue: undefined,
    });
  };

  componentDidMount() {
    this.fetch("0", "10");
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
    const {
      columns,
      articles,
      sortBy,
      isExpanded,
      articleNameValue,
      articleDescriptionValue,
      articleCategoryValue,
    } = this.state;

    const toolbarItems = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="searchInput"
              id="searchInput"
              type="search"
              aria-label="search input"
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
          <Button
            variant="primary"
            aria-expanded={isExpanded}
            onClick={this.onClickAddArticle}
          >
            Add Article
          </Button>
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

    const formContent = (
      <Form isHorizontal>
        <FormGroup label="Name" isRequired fieldId="horizontal-form-name">
          <TextInput
            value={articleNameValue}
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleArticleNameChange}
          />
        </FormGroup>
        <FormGroup label="Article Description" fieldId="horizontal-form-desc">
          <TextArea
            value={articleDescriptionValue}
            onChange={this.handleArticleDescriptionChange}
            name="horizontal-form-desc"
            id="horizontal-form-desc"
          />
        </FormGroup>
        <FormGroup label="Category" fieldId="horizontal-form-category">
          <FormSelect
            value={articleCategoryValue}
            isRequired
            onChange={this.handleArticleCategoryChange}
            id="horzontal-form-category"
            name="horizontal-form-category"
          >
            {this.options.map((option, index) => (
              <FormSelectOption
                isDisabled={option.disabled}
                key={index}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        </FormGroup>

        <ActionGroup>
          <Button variant="primary" onClick={this.post}>
            Submit form
          </Button>
        </ActionGroup>
      </Form>
    );

    const panelContent = (
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={isExpanded ? 0 : -1} ref={this.drawerRef}>
            {formContent}
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={this.onCloseClick} />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    );

    const drawerContent = (
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
    );

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
          <Drawer isExpanded={isExpanded} isInline onExpand={this.onExpand}>
            <DrawerContent panelContent={panelContent}>
              <DrawerContentBody>{drawerContent}</DrawerContentBody>
            </DrawerContent>
          </Drawer>
        </PageSection>
      </div>
    );
  }
}

export default Articles;
