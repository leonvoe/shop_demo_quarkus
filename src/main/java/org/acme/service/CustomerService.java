package org.acme.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import org.acme.dto.ArticleDTO;
import org.acme.dto.CustomerDTO;
import org.acme.dto.CustomerDTOMapper;
import org.acme.dto.CustomerEntityMapper;
import org.acme.model.Article;
import org.acme.model.Category;
import org.acme.model.Customer;
import org.acme.model.Gender;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

import static org.acme.model.Category.GAMES;
import static org.acme.model.Category.MUSIC;

@ApplicationScoped
public class CustomerService {
    @Inject
    CustomerDTOMapper customerDTOMapper;

    @Inject
    CustomerEntityMapper customerEntityMapper;

    public CustomerDTO getCustomerById(Long id) {
        return customerDTOMapper.toResource(Customer.findById(id));
    }

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customersList = new ArrayList<>();
        customersList.addAll(Customer.listAll());
        List<CustomerDTO> customerDTOList = new ArrayList<>();

        for(int i = 0; i < Customer.count(); i++) {
            customerDTOList.add(customerDTOMapper.toResource(customersList.get(i)));
        }

        return customerDTOList;
    }


    public List<CustomerDTO> getAllCustomersPagination(int size, int page) {
        PanacheQuery<Customer> customersList = Customer.findAll();

        List<Customer> customersListPaged = new ArrayList<>();
        customersListPaged = customersList.page(Page.of(page, size)).list();

        List<CustomerDTO> customerDTOList = new ArrayList<>();

        customersListPaged.stream().forEach(a -> customerDTOList.add(customerDTOMapper.toResource(a)));

        return customerDTOList;

    }

    public List<CustomerDTO> findAllByNameAndDescription(String searchVal, String filterVal) {
        Gender filterValEnum = null;
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        List<Customer> filteredCustomers;

        switch(filterVal) {
            case "Male":
                filterValEnum = Gender.MALE;
                break;
            case "Female":
                filterValEnum = Gender.FEMALE;
                break;
            case "Diverse":
                filterValEnum = Gender.DIVERSE;
                break;

            default:
                filterVal = "";
                break;
        }

        if(filterVal.equals("")) {
            filteredCustomers = Customer.list("first_name = ?1 or last_name = ?1 or username = ?1", searchVal);
        }
        else {
            filteredCustomers = Customer.list("select c from Customer c where c.gender = ?1", filterValEnum);
        }
        filteredCustomers.stream().forEach(a -> customerDTOList.add(customerDTOMapper.toResource(a)));

        return customerDTOList;
    }

    public void insertCustomer(CustomerDTO customerDTO) {
        Customer.persist(customerEntityMapper.toResource(customerDTO));
    }

    public void deleteCustomer(Long id) {
        Customer.deleteById(id);
    }

    public void updateCustomer(Long id, CustomerDTO newCustomerDTO) {
        int gender = 0;

        switch(newCustomerDTO.getGender()) {
            case MALE:
                gender=0;
                break;
            case FEMALE:
                gender=1;
                break;
            case DIVERSE:
                gender=2;
                break;
            default:
                break;

        }
        Customer.update("first_name = '" + newCustomerDTO.getFirst_name() + "', last_name ='" + newCustomerDTO.getLast_name() + "', username ='" + newCustomerDTO.getUsername() + "', password = '" + newCustomerDTO.getPassword() + "', dob = '" + newCustomerDTO.getDob() + "', gender = '" + gender + "' where id = ?1", id);

    }
}
