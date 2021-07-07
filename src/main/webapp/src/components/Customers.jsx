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
  baseURL: "http://localhost:8080/customer",
});

class Customers extends Component {
  constructor(props) {
    super(props);
    this.getLength();

    this.state = {
      customers: [],
      filteredCustomers: [],
      columns: [
        { title: "First Name", transforms: [sortable] },
        { title: "Last Name", transforms: [sortable] },
        { title: "Username", transforms: [sortable] },
        { title: "Date of birth", transforms: [sortable] },
        { title: "Gender", transforms: [sortable] },
      ],
      sortBy: {},
      page: "0",
      perPage: "10",
      length: 0,
      isExpanded: false,
      drawerEdit: false,
      searchValue: "",
      genderIsExpanded: false,
      genderSelected: null,

      customerIdValue: undefined,
      customerFirstNameValue: "",
      customerLastNameValue: "",
      customerUsernameValue: "",
      customerPasswordValue: "",
      customerDobValue: undefined,
      customerGenderDrawerValue: undefined,

      invalidTextFirstName: "Only letters accepted in name",
      validatedFirstName: "default",
      helperTextFirstName: "Enter your first name to continue",

      invalidTextLastName: "Only letters accepted in name",
      validatedLastName: "default",
      helperTextLastName: "Enter your last name to continue",

      invalidTextPassword: "Passwords have to be at least 6 characters long",
      validatedPassword: "default",
      helperTextPassword: "Enter your password to continue",

      invalidTextDob: "Customers have to be at least 18 years old",
      validatedDob: "default",
      helperTextDob: "Enter your date of birth to continue",
    };
    this.drawerRef = React.createRef();
    this.onSort = this.onSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

    this.handleCustomerFirstNameChange = (customerFirstNameValue) => {
      this.setState({ customerFirstNameValue });

      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (format.test(customerFirstNameValue)) {
        this.setState({
          validatedFirstName: "error",
          invalidTextFirstName: "Only letters accepted in name",
        });
      } else {
        this.setState({
          validatedFirstName: "success",
          helperTextFirstName: "",
        });
      }
    };
    this.handleCustomerLastNameChange = (customerLastNameValue) => {
      this.setState({ customerLastNameValue });

      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (format.test(customerLastNameValue)) {
        this.setState({
          validatedLastName: "error",
          invalidTextLastName: "Only letters accepted in name",
        });
      } else {
        this.setState({
          validatedLastName: "success",
          helperTextLastName: "",
        });
      }
    };
    this.handleCustomerUsernameChange = (customerUsernameValue) => {
      this.setState({ customerUsernameValue });
    };
    this.handleCustomerPasswordChange = (customerPasswordValue) => {
      this.setState({ customerPasswordValue });

      if (customerPasswordValue.length < 6) {
        this.setState({
          validatedPassword: "error",
          invalidTextPassword:
            "Passwords have to be at least 6 characters long",
        });
      } else {
        this.setState({
          validatedPassword: "success",
          helperTextPassword: "",
        });
      }
    };
    this.handleCustomerDobChange = (customerDobValue) => {
      this.setState({ customerDobValue });

      var dateInput = new Date(customerDobValue);
      var date = new Date();
      date.setFullYear(date.getFullYear() - 18);

      if (dateInput <= date) {
        this.setState({
          validatedDob: "success",
          helperTextDob: "",
        });
      } else {
        this.setState({
          validatedDob: "error",
          invalidTextDob: "Customers have to be at least 18 years old",
        });
      }
    };
    this.handleCustomerGenderChange = (customerGenderDrawerValue) => {
      this.setState({ customerGenderDrawerValue });
    };

    this.genderDrawerOptions = [
      { value: undefined, label: "Please Choose", disabled: false },
      { value: 0, label: "Male", disabled: false },
      { value: 1, label: "Female", disabled: false },
      { value: 2, label: "Diverse", disabled: false },
    ];

    this.genderSelectOptions = [
      { value: "Gender", disabled: false, isPlaceholder: true },
      { value: "Male", disabled: false },
      { value: "Female", disabled: false },
      { value: "Diverse", disabled: false },
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

    this.onClickAddCustomer = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({
        drawerEdit: false,
        isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
        customerFirstNameValue: "",
        customerLastNameValue: "",
        customerUsernameValue: "",
        customerPasswordValue: "",
        customerGenderDrawerValue: undefined,

        invalidTextFirstName: "Only letters accepted in name",
        validatedFirstName: "default",
        helperTextFirstName: "Enter your first name to continue",

        invalidTextLastName: "Only letters accepted in name",
        validatedLastName: "default",
        helperTextLastName: "Enter your last name to continue",

        invalidTextPassword: "Passwords have to be at least 6 characters long",
        validatedPassword: "default",
        helperTextPassword: "Enter your password to continue",

        invalidTextDob: "Customers have to be at least 18 years old",
        validatedDob: "default",
        helperTextDob: "Enter your date of birth to continue",
      });
    };

    this.onSearchValueChange = (inputValue) => {
      this.setState({
        searchValue: inputValue,
      });
      if (
        (this.state.genderSelected === "Gender" ||
          this.state.genderSelected === null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers,
        });
      } else if (
        (this.state.genderSelected === "Gender" ||
          this.state.genderSelected === null) &&
        this.state.searchValue !== ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) =>
              customer.first_name.match(inputValue) ||
              customer.last_name.match(inputValue) ||
              customer.username.match(inputValue)
          ),
        });
      } else if (
        (this.state.genderSelected !== "Gender" ||
          this.state.genderSelected !== null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) => customer.gender === this.state.genderSelected
          ),
        });
      } else {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) =>
              (customer.first_name.match(inputValue) ||
                customer.last_name.match(inputValue) ||
                customer.username.match(inputValue)) &&
              customer.gender === this.state.genderSelected
          ),
        });
      }
    };

    this.onGenderToggle = (isExpanded) => {
      this.setState({
        genderIsExpanded: isExpanded,
      });
    };

    this.onGenderSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearGenderSelection();
      this.setState({
        genderSelected: selection,
        genderIsExpanded: false,
      });

      if (
        (selection === "Gender" || selection === null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers,
        });
      } else if (
        (selection === "Gender" || selection === null) &&
        this.state.searchValue !== ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) =>
              customer.first_name.match(this.state.searchValue) ||
              customer.last_name.match(this.state.searchValue) ||
              customer.username.match(this.state.searchValue)
          ),
        });
      } else if (
        (selection !== "Gender" || selection !== null) &&
        this.state.searchValue === ""
      ) {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) => customer.gender === selection.toUpperCase()
          ),
        });
      } else {
        this.setState({
          filteredCustomers: this.state.customers.filter(
            (customer) =>
              (customer.first_name.match(this.state.searchValue) ||
                customer.last_name.match(this.state.searchValue) ||
                customer.username.match(this.state.searchValue)) &&
              customer.gender === selection.toUpperCase()
          ),
        });
      }
    };

    this.clearGenderSelection = () => {
      this.setState({
        genderSelected: null,
        genderIsExpanded: false,
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
      this.setState({ customers: res.data });
      this.setState({ filteredCustomers: res.data });
    });
  };

  post = () => {
    api.post("/", {
      first_name: this.state.customerFirstNameValue,
      last_name: this.state.customerLastNameValue,
      username: this.state.customerUsernameValue,
      password: this.state.customerPasswordValue,
      dob: this.state.customerDobValue,
      gender: this.state.customerGenderDrawerValue,
    });

    this.setState({
      isExpanded: false,
      customerFirstNameValue: "",
      customerLastNameValue: "",
      customerUsernameValue: "",
      customerPasswordValue: "",
      page: "0",
      perPage: "10",
      customerGenderDrawerValue: undefined,
      customerIdValue: undefined,
      customerDobValue: undefined,
    });
  };

  update = () => {
    api.put("/" + this.state.customerIdValue, {
      first_name: this.state.customerFirstNameValue,
      last_name: this.state.customerLastNameValue,
      username: this.state.customerUsernameValue,
      password: this.state.customerPasswordValue,
      dob: this.state.customerDobValue,
      gender: this.state.customerGenderDrawerValue,
    });

    this.setState({
      isExpanded: false,
      customerFirstNameValue: "",
      customerLastNameValue: "",
      customerUsernameValue: "",
      customerPasswordValue: "",
      page: "0",
      perPage: "10",
      customerGenderDrawerValue: undefined,
      customerIdValue: undefined,
      customerDobValue: undefined,
    });
  };

  delete = () => {
    api.delete("/" + this.state.customerIdValue);

    this.setState({
      isExpanded: false,
      customerFirstNameValue: "",
      customerLastNameValue: "",
      customerUsernameValue: "",
      customerPasswordValue: "",
      page: "0",
      perPage: "10",
      customerGenderDrawerValue: undefined,
      customerIdValue: undefined,
      customerDobValue: undefined,
    });
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
      const customer = this.state.customers[row.secretTableRowKeyId];

      switch (customer.gender) {
        case "MALE":
          this.setState({ customerGenderDrawerValue: 0 });
          break;
        case "FEMALE":
          this.setState({ customerGenderDrawerValue: 1 });
          break;
        case "DIVERSE":
          this.setState({ customerGenderDrawerValue: 2 });
          break;
        default:
          this.setState({ customerGenderDrawerValue: undefined });
          break;
      }

      this.setState({
        drawerEdit: true,
        isExpanded: true,
        customerFirstNameValue: customer.first_name,
        customerLastNameValue: customer.last_name,
        customerUsernameValue: customer.username,
        customerPasswordValue: customer.password,
        customerDobValue: customer.dob,
        customerIdValue: customer.id,
      });
    }
  }

  render() {
    const {
      columns,
      customers,
      filteredCustomers,
      sortBy,
      isExpanded,
      customerFirstNameValue,
      customerLastNameValue,
      customerUsernameValue,
      customerPasswordValue,
      customerDobValue,
      customerGenderDrawerValue,
      drawerEdit,
      genderIsExpanded,
      genderSelected,
      invalidTextDob,
      invalidTextFirstName,
      invalidTextLastName,
      invalidTextPassword,
      validatedDob,
      validatedFirstName,
      validatedLastName,
      validatedPassword,
      helperTextDob,
      helperTextFirstName,
      helperTextLastName,
      helperTextPassword,
    } = this.state;

    let button;

    if (!drawerEdit) {
      button = (
        <Button variant="primary" onClick={this.post}>
          Add customer
        </Button>
      );
    } else {
      button = (
        <div>
          <Button variant="primary" onClick={this.update}>
            Edit customer
          </Button>
          <Button variant="danger" onClick={this.delete} id="deleteButton">
            Delete customer
          </Button>
        </div>
      );
    }

    let rows;

    if (this.state.length !== 0 && filteredCustomers.length !== 0) {
      rows = filteredCustomers.map((customer, index) => [
        customer.first_name,
        customer.last_name,
        customer.username,
        customer.dob,
        customer.gender,
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
                      no customers listed yet. Remove all filters or add a
                      customer to show results.
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
            onToggle={this.onGenderToggle}
            onSelect={this.onGenderSelect}
            selections={genderSelected}
            isOpen={genderIsExpanded}
          >
            {this.genderSelectOptions.map((gender, index) => (
              <SelectOption
                isDisabled={gender.disabled}
                isPlaceholder={gender.isPlaceholder}
                key={index}
                value={gender.value}
              />
            ))}
          </Select>
        </ToolbarItem>
        <ToolbarItem variant="separator" />
        <ToolbarItem>
          <Button variant="primary" onClick={this.onClickAddCustomer}>
            Add Customer
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
        <FormGroup
          label="First Name"
          isRequired
          fieldId="horizontal-form-firstName"
          helperText={helperTextFirstName}
          helperTextInvalid={invalidTextFirstName}
          validated={validatedFirstName}
        >
          <TextInput
            value={customerFirstNameValue}
            validated={validatedFirstName}
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleCustomerFirstNameChange}
          />
        </FormGroup>
        <FormGroup
          label="Last Name"
          isRequired
          fieldId="horizontal-form-lastName"
          helperText={helperTextLastName}
          helperTextInvalid={invalidTextLastName}
          validated={validatedLastName}
        >
          <TextInput
            value={customerLastNameValue}
            validated={validatedLastName}
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleCustomerLastNameChange}
          />
        </FormGroup>
        <FormGroup
          label="Username"
          isRequired
          fieldId="horizontal-form-username"
        >
          <TextInput
            value={customerUsernameValue}
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleCustomerUsernameChange}
          />
        </FormGroup>
        <FormGroup
          label="Password"
          isRequired
          fieldId="horizontal-form-password"
          helperText={helperTextPassword}
          helperTextInvalid={invalidTextPassword}
          validated={validatedPassword}
        >
          <TextInput
            value={customerPasswordValue}
            validated={validatedPassword}
            isRequired
            type="password"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={this.handleCustomerPasswordChange}
          />
        </FormGroup>
        <FormGroup
          label="Date of birth"
          isRequired
          fieldId="horizontal-form-dob"
          helperText={helperTextDob}
          helperTextInvalid={invalidTextDob}
          validated={validatedDob}
        >
          <DatePicker
            value={customerDobValue}
            validated={validatedDob}
            onChange={this.handleCustomerDobChange}
          />
        </FormGroup>
        <FormGroup label="Gender" fieldId="horizontal-form-gender">
          <FormSelect
            value={customerGenderDrawerValue}
            isRequired
            onChange={this.handleCustomerGenderChange}
            id="horzontal-form-category"
            name="horizontal-form-category"
          >
            {this.genderDrawerOptions.map((option, index) => (
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
            <Text component="h1">Customers</Text>
            <Text component="p">Shows every listed customer.</Text>
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

export default Customers;
