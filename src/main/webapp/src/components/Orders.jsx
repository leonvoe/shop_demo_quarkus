import React, { Component } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";

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

import "./stylesheet.css";

import axios from "axios";

const orderApi = axios.create({
  baseURL: "http://localhost:8080/order",
});

const articleApi = axios.create({
  baseURL: "http://localhost:8080/article",
});

const customerApi = axios.create({
  baseURL: "http://localhost:8080/customer",
});

class Orders extends Component {
  constructor(props) {
    super(props);
    this.getLength();
    this.getCustomers();
    this.getArticles();

    this.state = {
      orders: [],
      filteredOrders: [],
      articles: [],
      customers: [],
      columns: [
        { title: "Shipping", transforms: [sortable] },
        { title: "Notes", transforms: [sortable] },
        { title: "Status", transforms: [sortable] },
        { title: "Customer", transforms: [sortable] },
        { title: "Articles", transforms: [sortable] },
      ],
      orderArticleValue: [],

      sortBy: {},
      page: "0",
      perPage: "10",
      length: 0,
      isExpanded: false,
      drawerEdit: false,
      searchValue: "",
      statusIsExpanded: false,
      statusSelected: "Status",
      shippingIsExpanded: false,
      shippingSelected: "Shipping",
      isOpenOrderArticles: false,

      orderIdValue: undefined,
      orderNotesValue: "",
      orderShippingDrawerValue: undefined,
      orderStatusDrawerValue: undefined,
      orderCustomerValue: null,
    };

    this.drawerRef = React.createRef();
    this.onSort = this.onSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

    this.handleOrderNotesChange = (orderNotesValue) => {
      this.setState({ orderNotesValue });
    };
    this.handleOrderShippingChange = (orderShippingDrawerValue) => {
      this.setState({ orderShippingDrawerValue });
    };
    this.handleOrderStatusChange = (orderStatusDrawerValue) => {
      this.setState({ orderStatusDrawerValue });
    };
    this.handleOrderCustomerChange = (orderCustomerValue) => {
      this.setState({ orderCustomerValue });
    };

    this.onToggleOrderArticles = (isOpenOrderArticles) => {
      console.log(this.state.orderArticleValue);

      this.setState({
        isOpenOrderArticles,
      });
    };

    this.onSelectOrderArticles = (event, selection) => {
      const orderArticleValue = this.state.orderArticleValue;

      if (orderArticleValue.includes(selection)) {
        this.setState(
          (prevState) => ({
            orderArticleValue: prevState.orderArticleValue.filter(
              (item) => item !== selection
            ),
          }),
          () => console.log("selections: ", this.state.orderArticleValue)
        );
      } else {
        this.setState(
          (prevState) => ({
            orderArticleValue: [...prevState.orderArticleValue, selection],
          }),
          () => console.log("selections: ", this.state.orderArticleValue)
        );
      }
    };

    this.clearSelectionOrderArticles = () => {
      this.setState({
        orderArticleValue: [],
        isOpenOrderArticles: false,
      });
    };

    this.statusDrawerOptions = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "In Progress", disabled: false },
      { value: 1, label: "Delivering", disabled: false },
      { value: 2, label: "Delivered", disabled: false },
    ];

    this.statusSelectOptions = [
      { value: "Status", disabled: false, isPlaceholder: true },
      { value: "INPROGRESS", disabled: false },
      { value: "DELIVERING", disabled: false },
      { value: "DELIVERED", disabled: false },
    ];

    this.shippingDrawerOptions = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "DHL", disabled: false },
      { value: 1, label: "Hermes", disabled: false },
      { value: 2, label: "DPD", disabled: false },
    ];

    this.shippingSelectOptions = [
      { value: "Shipping", disabled: false, isPlaceholder: true },
      { value: "DHL", disabled: false },
      { value: "Hermes", disabled: false },
      { value: "DPD", disabled: false },
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

    this.onClickAddOrder = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({
        drawerEdit: false,
        isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
        orderNotesValue: "",
        orderArticleValue: [],
        orderCustomerValue: undefined,
        orderShippingDrawerValue: undefined,
        orderStatusDrawerValue: undefined,
      });
    };

    this.onSearchValueChange = (inputValue) => {
      this.setState({
        searchValue: inputValue,
      });

      if (
        (inputValue === "" || inputValue === null) &&
        this.state.statusSelected === "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders,
        });
      } else if (
        inputValue !== "" &&
        inputValue !== null &&
        this.state.statusSelected === "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.notes.match(inputValue) ||
              order.customer.first_name.match(inputValue) ||
              order.customer.last_name.match(inputValue)
          ),
        });
      } else if (
        (inputValue === "" || inputValue === null) &&
        this.state.statusSelected !== "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) => order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      } else if (
        (inputValue === "" || inputValue === null) &&
        this.state.statusSelected === "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else if (
        (inputValue === "" || inputValue === null) &&
        this.state.statusSelected !== "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.status === this.state.statusSelected.toUpperCase() &&
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else if (
        inputValue !== "" &&
        inputValue !== null &&
        this.state.statusSelected !== "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(inputValue) ||
                order.customer.first_name.match(inputValue) ||
                order.customer.last_name.match(inputValue)) &&
              order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      } else if (
        inputValue !== "" &&
        inputValue !== null &&
        this.state.statusSelected === "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(inputValue) ||
                order.customer.first_name.match(inputValue) ||
                order.customer.last_name.match(inputValue)) &&
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(inputValue) ||
                order.customer.first_name.match(inputValue) ||
                order.customer.last_name.match(inputValue)) &&
              order.shipping === this.state.shippingSelected.toUpperCase() &&
              order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      }
    };

    this.onShippingToggle = (isExpanded) => {
      this.setState({
        shippingIsExpanded: isExpanded,
      });
    };

    this.onShippingSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearShippingSelection();
      this.setState({
        shippingSelected: selection,
        shippingIsExpanded: false,
      });

      if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        this.state.statusSelected === "Status" &&
        selection === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders,
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        this.state.statusSelected === "Status" &&
        selection === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.notes.match(this.state.searchValue) ||
              order.customer.first_name.match(this.state.searchValue) ||
              order.customer.last_name.match(this.state.searchValue)
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        this.state.statusSelected !== "Status" &&
        selection === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) => order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        this.state.statusSelected === "Status" &&
        selection !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) => order.shipping === selection.toUpperCase()
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        this.state.statusSelected !== "Status" &&
        selection !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.status === this.state.statusSelected.toUpperCase() &&
              order.shipping === selection.toUpperCase()
          ),
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        this.state.statusSelected !== "Status" &&
        selection === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        this.state.statusSelected === "Status" &&
        selection !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.shipping === selection.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.shipping === selection.toUpperCase() &&
              order.status === this.state.statusSelected.toUpperCase()
          ),
        });
      }
    };

    this.clearShippingSelection = () => {
      this.setState({
        shippingSelected: null,
        shippingIsExpanded: false,
      });
      this.fetch(this.state.page, this.state.perPageParameter);
    };

    this.onStatusToggle = (isExpanded) => {
      this.setState({
        statusIsExpanded: isExpanded,
      });
    };

    this.onStatusSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearStatusSelection();
      this.setState({
        statusSelected: selection,
        statusIsExpanded: false,
      });

      if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        selection === "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders,
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        selection === "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.notes.match(this.state.searchValue) ||
              order.customer.first_name.match(this.state.searchValue) ||
              order.customer.last_name.match(this.state.searchValue)
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        selection !== "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) => order.status === selection.toUpperCase()
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        selection === "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else if (
        (this.state.searchValue === "" || this.state.searchValue === null) &&
        selection !== "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              order.status === selection.toUpperCase() &&
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        selection !== "Status" &&
        this.state.shippingSelected === "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.status === selection.toUpperCase()
          ),
        });
      } else if (
        this.state.searchValue !== "" &&
        this.state.searchValue !== null &&
        selection === "Status" &&
        this.state.shippingSelected !== "Shipping"
      ) {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.shipping === this.state.shippingSelected.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredOrders: this.state.orders.filter(
            (order) =>
              (order.notes.match(this.state.searchValue) ||
                order.customer.first_name.match(this.state.searchValue) ||
                order.customer.last_name.match(this.state.searchValue)) &&
              order.shipping === this.state.shippingSelected.toUpperCase() &&
              order.status === selection.toUpperCase()
          ),
        });
      }
    };

    this.clearStatusSelection = () => {
      this.setState({
        statusSelected: null,
        statusIsExpanded: false,
      });
      this.fetch(this.state.page, this.state.perPageParameter);
    };
  }

  getLength = () => {
    orderApi.get("/length").then((res) => {
      this.setState({ length: res.data });
    });
  };

  getCustomers = () => {
    customerApi.get("/").then((res) => {
      this.setState({ customers: res.data });
    });
  };

  getArticles = () => {
    articleApi.get("/").then((res) => {
      this.setState({ articles: res.data });
    });
  };

  fetch = (pageParameter, perPageParameter) => {
    const params = {
      page: pageParameter,
      size: perPageParameter,
    };

    orderApi.get("/paginated", { params }).then((res) => {
      this.setState({ orders: res.data });
      this.setState({ filteredOrders: res.data });
    });
  };

  post = async () => {
    const orderArticleValueIds = this.state.orderArticleValue
      .map((article) =>
        this.state.articles.find((item) => {
          return item.name === article;
        })
      )
      .map((article) => {
        return { id: article.id };
      });

    await orderApi.post("/", {
      shipping: this.state.orderShippingDrawerValue,
      notes: this.state.orderNotesValue,
      status: this.state.orderStatusDrawerValue,
      customer: { id: this.state.orderCustomerValue },
      articles: orderArticleValueIds,
    });

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: undefined,
      orderArticleValue: [],
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });

    this.fetch("0", "10");
    this.getLength();
  };

  update = async () => {
    const orderArticleValueIds = this.state.orderArticleValue
      .map((article) =>
        this.state.articles.find((item) => {
          return item.name === article;
        })
      )
      .map((article) => {
        return { id: article.id };
      });

    await orderApi.put("/" + this.state.orderIdValue, {
      shipping: this.state.orderShippingDrawerValue,
      notes: this.state.orderNotesValue,
      status: this.state.orderStatusDrawerValue,
      customer: { id: this.state.orderCustomerValue },
      articles: orderArticleValueIds,
    });

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: [],
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });

    this.fetch("0", "10");
    this.getLength();
  };

  delete = async () => {
    await orderApi.delete("/" + this.state.orderIdValue);

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: [],
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });

    this.fetch("0", "10");
    this.getLength();
  };

  deleteSearch = () => {
    this.setState({ searchValue: "" });
    this.fetch(this.state.page, this.state.perPage);
  };

  componentDidMount() {
    this.fetch("0", "10");
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.customers.sort((a, b) =>
      a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0
    );
    this.setState({
      sortBy: {
        index,
        direction,
      },
      customers:
        direction === SortByDirection.asc ? sortedRows : sortedRows.reverse(),
    });
  }

  onRowClick(_event, row) {
    if (this.state.length !== 0) {
      const order = this.state.orders[row.secretTableRowKeyId];

      switch (order.status) {
        case "INPROGRESS":
          this.setState({ orderStatusDrawerValue: 0 });
          break;
        case "DELIVERING":
          this.setState({ orderStatusDrawerValue: 1 });
          break;
        case "DELIVERED":
          this.setState({ orderStatusDrawerValue: 2 });
          break;
        default:
          this.setState({ orderStatusDrawerValue: undefined });
          break;
      }

      switch (order.shipping) {
        case "DHL":
          this.setState({ orderShippingDrawerValue: 0 });
          break;
        case "HERMES":
          this.setState({ orderShippingDrawerValue: 1 });
          break;
        case "DPD":
          this.setState({ orderShippingDrawerValue: 2 });
          break;
        default:
          this.setState({ orderShippingDrawerValue: undefined });
          break;
      }

      this.setState({
        drawerEdit: true,
        isExpanded: true,
        orderNotesValue: order.notes,
        orderCustomerValue: order.customer.id,
        orderArticleValue: order.articles.map((article) => article.name),
        orderIdValue: order.id,
      });
    }
  }

  render() {
    const {
      columns,
      filteredOrders,
      sortBy,
      isExpanded,
      orderNotesValue,
      orderShippingDrawerValue,
      orderStatusDrawerValue,
      orderCustomerValue,
      orderArticleValue,
      drawerEdit,
      shippingIsExpanded,
      shippingSelected,
      statusIsExpanded,
      statusSelected,
      isOpenOrderArticles,
    } = this.state;

    let rows;

    if (this.state.length !== 0) {
      rows = filteredOrders.map((order, index) => [
        order.shipping,
        order.notes,
        order.status,
        order.customer.first_name.concat(" ", order.customer.last_name),
        order.articles
          .map(function (e) {
            return e.name;
          })
          .join(", "),
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
                      no orders listed yet. Remove all filters or add an order
                      to show results.
                    </EmptyStateBody>
                  </EmptyState>
                </Bullseye>
              ),
            },
          ],
        },
      ];
    }

    let customerDrawerOptions = this.state.customers.map((customer) => {
      const container = {};

      container.value = customer.id;
      container.label = customer.first_name.concat(" ", customer.last_name);

      return container;
    });

    let articleDrawerOptions = this.state.articles.map((article) => {
      const container = {};

      container.id = article.id;
      container.value = article.name;
      container.description = article.description;
      container.disabled = false;

      return container;
    });

    const toolbarItems = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="textInput1"
              id="textInput1"
              type="search"
              aria-label="search input example"
              onChange={this.onSearchValueChange}
              value={this.state.searchValue}
            />
          </InputGroup>
        </ToolbarItem>
        <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={this.onStatusToggle}
            onSelect={this.onStatusSelect}
            selections={statusSelected}
            isOpen={statusIsExpanded}
          >
            {this.statusSelectOptions.map((status, index) => (
              <SelectOption
                isDisabled={status.disabled}
                isPlaceholder={status.isPlaceholder}
                key={index}
                value={status.value}
              />
            ))}
          </Select>
        </ToolbarItem>
        <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={this.onShippingToggle}
            onSelect={this.onShippingSelect}
            selections={shippingSelected}
            isOpen={shippingIsExpanded}
          >
            {this.shippingSelectOptions.map((shipping, index) => (
              <SelectOption
                isDisabled={shipping.disabled}
                isPlaceholder={shipping.isPlaceholder}
                key={index}
                value={shipping.value}
              />
            ))}
          </Select>
        </ToolbarItem>
        <ToolbarItem variant="separator" />
        <ToolbarItem>
          <Button variant="primary" onClick={this.onClickAddOrder}>
            Add Order
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
        <FormGroup label="Notes" isRequired fieldId="horizontal-form-name">
          <TextInput
            value={orderNotesValue}
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleOrderNotesChange}
          />
        </FormGroup>

        <FormGroup label="Shipping" fieldId="horizontal-form-category">
          <FormSelect
            value={orderShippingDrawerValue}
            isRequired
            onChange={this.handleOrderShippingChange}
            id="horzontal-form-category"
            name="horizontal-form-category"
          >
            {this.shippingDrawerOptions.map((option, index) => (
              <FormSelectOption
                isDisabled={option.disabled}
                key={index}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Status" fieldId="horizontal-form-category">
          <FormSelect
            value={orderStatusDrawerValue}
            isRequired
            onChange={this.handleOrderStatusChange}
            id="horzontal-form-category"
            name="horizontal-form-category"
          >
            {this.statusDrawerOptions.map((option, index) => (
              <FormSelectOption
                isDisabled={option.disabled}
                key={index}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Customer" fieldId="horizontal-form-customer">
          <FormSelect
            value={orderCustomerValue}
            isRequired
            onChange={this.handleOrderCustomerChange}
            id="horzontal-form-customer"
            name="horizontal-form-customer"
          >
            {customerDrawerOptions.map((customer, index) => (
              <FormSelectOption
                isDisabled={customer.disabled}
                key={index}
                value={customer.value}
                label={customer.label}
              />
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Articles" fieldId="horizontal-form-articles">
          <Select
            variant={SelectVariant.typeaheadMulti}
            typeAheadAriaLabel="Select articles"
            onToggle={this.onToggleOrderArticles}
            onSelect={this.onSelectOrderArticles}
            onClear={this.clearSelectionOrderArticles}
            selections={orderArticleValue}
            isOpen={isOpenOrderArticles}
            aria-labelledby="multi-typeahead-select-id-1"
            placeholderText="Select articles"
          >
            {articleDrawerOptions.map((article, index) => (
              <SelectOption
                isDisabled={article.disabled}
                key={article.id}
                value={article.value}
                {...(article.description && {
                  description: article.description,
                })}
              />
            ))}
          </Select>
        </FormGroup>

        <ActionGroup>
          {!drawerEdit ? (
            <Button variant="primary" onClick={this.post}>
              Add order
            </Button>
          ) : (
            <div>
              <Button variant="primary" onClick={this.update}>
                Edit order
              </Button>
              <Button variant="danger" onClick={this.delete} id="deleteButton">
                Delete order
              </Button>
            </div>
          )}
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
            <Text component="h1">Orders</Text>
            <Text component="p">Shows every listed order.</Text>
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

export default Orders;
