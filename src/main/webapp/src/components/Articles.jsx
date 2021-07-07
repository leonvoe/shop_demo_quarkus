import React, { Component } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "./stylesheet.css";

import SearchIcon from "@patternfly/react-icons/dist/js/icons/search-icon";
import TimesIcon from "@patternfly/react-icons/dist/js/icons/times-icon";

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
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Form,
  FormGroup,
  TextArea,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Select,
  SelectVariant,
  SelectOption,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Bullseye,
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
  _isMounted = false;

  constructor(props) {
    super(props);
    this.getLength();

    this.state = {
      articles: [],
      filteredArticles: [],
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
      drawerEdit: false,
      searchValue: "",
      categoryIsExpanded: false,
      categorySelected: null,

      articleIdValue: undefined,
      articleCategoryDrawerValue: undefined,
      articleNameValue: "",
      articleDescriptionValue: "",
    };
    this.drawerRef = React.createRef();
    this.onSort = this.onSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

    this.handleArticleCategoryChange = (articleCategoryDrawerValue) => {
      this.setState({ articleCategoryDrawerValue });
    };
    this.handleArticleNameChange = (articleNameValue) => {
      this.setState({ articleNameValue });
    };
    this.handleArticleDescriptionChange = (articleDescriptionValue) => {
      this.setState({ articleDescriptionValue });
    };

    this.categoryDrawerOptions = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "Toys", disabled: false },
      { value: 1, label: "Fashion", disabled: false },
      { value: 2, label: "Books", disabled: false },
      { value: 3, label: "Movies", disabled: false },
      { value: 4, label: "Games", disabled: false },
      { value: 5, label: "Music", disabled: false },
    ];

    this.categorySelectOptions = [
      { value: "Category", disabled: false, isPlaceholder: true },
      { value: "Toys", disabled: false },
      { value: "Fashion", disabled: false },
      { value: "Books", disabled: false },
      { value: "Movies", disabled: false },
      { value: "Games", disabled: false },
      { value: "Music", disabled: false },
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
        drawerEdit: false,
        isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
        articleNameValue: "",
        articleDescriptionValue: "",
        articleCategoryDrawerValue: undefined,
      });
    };

    this.onSearchValueChange = (inputValue) => {
      console.log(this.state.articles);
      this.setState({
        searchValue: inputValue,
      });
      console.log("test");
      if (
        (this.state.categorySelected === "Category" ||
          this.state.categorySelected === null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredArticles: this.state.articles,
        });
      } else if (
        (this.state.categorySelected === "Category" ||
          this.state.categorySelected === null) &&
        this.state.searchValue !== ""
      ) {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) =>
              article.name.match(inputValue) ||
              article.description.match(inputValue)
          ),
        });
      } else if (
        (this.state.categorySelected !== "Category" ||
          this.state.categorySelected !== null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) =>
              article.category === this.state.categorySelected.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) =>
              (article.name.match(inputValue) ||
                article.description.match(inputValue)) &&
              article.category === this.state.categorySelected.toUpperCase()
          ),
        });
      }
    };

    this.onCategoryToggle = (isExpanded) => {
      this.setState({
        categoryIsExpanded: isExpanded,
      });
    };

    this.onCategorySelect = (event, selection, isPlaceholder) => {
      console.log(selection);
      if (isPlaceholder) this.clearCategorySelection();
      this.setState({
        categorySelected: selection,
        categoryIsExpanded: false,
      });

      if (
        (selection === "Category" || selection === null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredArticles: this.state.articles,
        });
      } else if (
        (selection === "Category" || selection === null) &&
        this.state.searchValue !== ""
      ) {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) =>
              article.name.match(this.state.searchValue) ||
              article.description.match(this.state.searchValue)
          ),
        });
      } else if (
        (selection !== "Category" || selection !== null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) => article.category === selection.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredArticles: this.state.articles.filter(
            (article) =>
              (article.name.match(this.state.searchValue) ||
                article.description.match(this.state.searchValue)) &&
              article.category === selection.toUpperCase()
          ),
        });
      }
    };

    this.clearCategorySelection = () => {
      this.setState({
        categorySelected: null,
        categoryIsExpanded: false,
      });
      this.fetch(this.state.page, this.state.perPageParameter);
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
      this.setState({ filteredArticles: res.data });
    });
  };

  post = () => {
    api.post("/", {
      name: this.state.articleNameValue,
      description: this.state.articleDescriptionValue,
      category: this.state.articleCategoryDrawerValue,
    });

    this.setState({
      isExpanded: false,
      articleNameValue: "",
      articleDescriptionValue: "",
      page: "0",
      perPage: "10",
      articleCategoryDrawerValue: undefined,
      articleIdValue: undefined,
    });
  };

  update = () => {
    api.put("/" + this.state.articleIdValue, {
      name: this.state.articleNameValue,
      description: this.state.articleDescriptionValue,
      category: this.state.articleCategoryDrawerValue,
    });

    this.setState({
      isExpanded: false,
      articleNameValue: "",
      articleDescriptionValue: "",
      page: "0",
      perPage: "10",
      articleCategoryDrawerValue: undefined,
      articleIdValue: undefined,
    });
  };

  delete = () => {
    api.delete("/" + this.state.articleIdValue);

    this.setState({
      isExpanded: false,
      articleNameValue: "",
      articleDescriptionValue: "",
      page: "0",
      perPage: "10",
      articleCategoryDrawerValue: undefined,
      articleIdValue: undefined,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetch("0", "10");
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  onRowClick(_event, row) {
    if (this.state.length !== 0) {
      const article = this.state.articles[row.secretTableRowKeyId];

      switch (article.category) {
        case "TOYS":
          this.setState({ articleCategoryDrawerValue: 0 });
          break;
        case "FASHION":
          this.setState({ articleCategoryDrawerValue: 1 });
          break;
        case "BOOKS":
          this.setState({ articleCategoryDrawerValue: 2 });
          break;
        case "MOVIES":
          this.setState({ articleCategoryDrawerValue: 3 });
          break;
        case "GAMES":
          this.setState({ articleCategoryDrawerValue: 4 });
          break;
        case "MUSIC":
          this.setState({ articleCategoryDrawerValue: 5 });
          break;

        default:
          this.setState({ articleCategoryDrawerValue: undefined });
          break;
      }
      this.setState({
        drawerEdit: true,
        isExpanded: true,
        articleNameValue: article.name,
        articleDescriptionValue: article.description,
        articleIdValue: article.id,
      });
    }
  }

  render() {
    const {
      columns,
      filteredArticles,
      sortBy,
      isExpanded,
      articleNameValue,
      articleDescriptionValue,
      articleCategoryDrawerValue,
      drawerEdit,
      categoryIsExpanded,
      categorySelected,
    } = this.state;

    let button;

    if (!drawerEdit) {
      button = (
        <Button variant="primary" onClick={this.post}>
          Add article
        </Button>
      );
    } else {
      button = (
        <div>
          <Button variant="primary" onClick={this.update}>
            Edit article
          </Button>
          <Button variant="danger" onClick={this.delete} id="deleteButton">
            Delete article
          </Button>
        </div>
      );
    }

    let rows;

    if (this.state.length !== 0 && filteredArticles.length !== 0) {
      rows = filteredArticles.map((article, index) => [
        article.name,
        article.description,
        article.category,
      ]);
    } else {
      rows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Bullseye>
                  <EmptyState variant={EmptyStateVariant.small}>
                    <EmptyStateIcon icon={SearchIcon} />
                    <Title headingLevel="h2" size="lg">
                      No results found
                    </Title>
                    <EmptyStateBody>
                      Either no results match the filter criteria, or there are
                      no articles listed yet. Remove all filters or add an
                      article to show results.
                    </EmptyStateBody>
                  </EmptyState>
                </Bullseye>
              ),
            },
          ],
        },
      ];
    }

    const toolbarItems = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="searchInput"
              id="searchInput"
              type="search"
              aria-label="search input"
              onChange={this.onSearchValueChange}
              value={this.state.searchValue}
            />
          </InputGroup>
        </ToolbarItem>
        <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={this.onCategoryToggle}
            onSelect={this.onCategorySelect}
            selections={categorySelected}
            isOpen={categoryIsExpanded}
          >
            {this.categorySelectOptions.map((category, index) => (
              <SelectOption
                isDisabled={category.disabled}
                isPlaceholder={category.isPlaceholder}
                key={index}
                value={category.value}
              />
            ))}
          </Select>
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
        <ToolbarItem variant="separator" />

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
            value={articleCategoryDrawerValue}
            isRequired
            onChange={this.handleArticleCategoryChange}
            id="horzontal-form-category"
            name="horizontal-form-category"
          >
            {this.categoryDrawerOptions.map((option, index) => (
              <FormSelectOption
                isDisabled={option.disabled}
                key={index}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        </FormGroup>

        <ActionGroup>{button}</ActionGroup>
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
        rows={rows}
      >
        <TableHeader />
        <TableBody onRowClick={this.onRowClick} />
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
