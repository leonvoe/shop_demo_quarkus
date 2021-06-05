package org.acme.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import org.acme.dto.ArticleDTO;
import org.acme.dto.CustomerDTO;
import org.acme.dto.CustomerDTOMapper;
import org.acme.dto.CustomerEntityMapper;
import org.acme.model.Article;
import org.acme.model.Customer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

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

    public void insertCustomer(CustomerDTO customerDTO) {
        Customer.persist(customerEntityMapper.toResource(customerDTO));
    }

    public void deleteCustomer(Long id) {
        Customer.deleteById(id);
    }

    public void updateCustomer(Long id, CustomerDTO newCustomerDTO) {
        //
    }
}
