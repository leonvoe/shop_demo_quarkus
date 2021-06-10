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
  TextArea,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Select,
  SelectVariant,
  SelectOption,
  DatePicker,
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
  baseURL: "http://localhost:8080/order",
});

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
      isExpanded: false,
      drawerEdit: false,
      searchValue: "",
      statusIsExpanded: false,
      statusSelected: null,
      shippingIsExpanded: false,
      shippingSelected: null,

      orderIdValue: undefined,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: "",
      orderShippingDrawerValue: undefined,
      orderStatusDrawerValue: undefined,
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
    this.handleOrderArticleChange = (orderArticleValue) => {
      console.log(orderArticleValue);
      this.setState({ orderArticleValue });
    };

    this.statusDrawerOptions = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "In Progress", disabled: false },
      { value: 1, label: "Delivering", disabled: false },
      { value: 2, label: "Delivered", disabled: false },
    ];

    this.statusSelectOptions = [
      { value: "Status", disabled: false, isPlaceholder: true },
      { value: "In Progress", disabled: false },
      { value: "Delivering", disabled: false },
      { value: "Delivered", disabled: false },
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
        orderArticleValue: "",
        orderCustomerValue: "",
        orderShippingDrawerValue: undefined,
        orderStatusDrawerValue: undefined,
      });
    };

    this.onSearchValueChange = (inputValue) => {
      this.setState({
        searchValue: inputValue,
      });
    };

    this.onShippingToggle = (isExpanded) => {
      this.setState({
        shippingIsExpanded: isExpanded,
      });
    };

    this.onShippingSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearGenderSelection();
      this.setState(
        {
          shippingSelected: selection,
          shippingIsExpanded: false,
        },
        function () {
          this.search();
        }
      );
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
      if (isPlaceholder) this.clearGenderSelection();
      this.setState(
        {
          statusSelected: selection,
          statusIsExpanded: false,
        },
        function () {
          this.search();
        }
      );
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

  post = () => {
    api.post("/", {
      shipping: this.state.orderShippingDrawerValue,
      notes: this.state.orderNotesValue,
      status: this.state.orderStatusDrawerValue,
      customer: this.state.orderCustomerValue,
      articles: this.state.orderArticleValue,
    });

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: "",
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });
  };

  update = () => {
    api.put("/" + this.state.orderIdValue, {
      shipping: this.state.orderShippingDrawerValue,
      notes: this.state.orderNotesValue,
      status: this.state.orderStatusDrawerValue,
      customer: this.state.orderCustomerValue,
      articles: this.state.orderArticleValue,
    });

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: "",
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });
  };

  delete = () => {
    api.delete("/" + this.state.orderIdValue);

    this.setState({
      isExpanded: false,
      orderNotesValue: "",
      orderCustomerValue: "",
      orderArticleValue: "",
      page: "0",
      perPage: "10",
      orderShippingDrawerValue: undefined,
      orderIdValue: undefined,
      orderStatusDrawerValue: undefined,
    });
  };

  search = () => {
    const params = {
      search: this.state.searchValue,
      statusFilter: this.state.statusSelected,
      shippingFilter: this.state.shippingSelected,
    };
    api.get("/search", { params }).then((res) => {
      this.setState({ orders: res.data });
    });
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
      orderCustomerValue: order.customer,
      orderArticleValue: order.article,
      orderIdValue: order.id,
    });
  }

  render() {
    const {
      columns,
      orders,
      sortBy,
      isExpanded,
      orderNotesValue,
      orderShippingDrawerValue,
      orderStatusDrawerValue,
      orderCustomerValue,
      orderArticleValue,
      drawerEdit,
      genderIsExpanded,
      genderSelected,
      statusIsExpanded,
      statusSelected,
    } = this.state;

    let button;

    if (!drawerEdit) {
      button = (
        <Button variant="primary" onClick={this.post}>
          Add order
        </Button>
      );
    } else {
      button = (
        <div>
          <Button variant="primary" onClick={this.update}>
            Edit order
          </Button>
          <Button variant="danger" onClick={this.delete} id="deleteButton">
            Delete order
          </Button>
        </div>
      );
    }

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
            <Button
              variant={ButtonVariant.control}
              aria-label="search button for search input"
              onClick={this.search}
            >
              <SearchIcon />
            </Button>
            <Button
              variant={ButtonVariant.control}
              aria-label="delete button for search input"
              onClick={this.deleteSearch}
            >
              <TimesIcon />
            </Button>
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
            selections={genderSelected}
            isOpen={genderIsExpanded}
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
