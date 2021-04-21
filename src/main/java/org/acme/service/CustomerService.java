package org.acme.service;

import org.acme.dto.ArticleDTO;
import org.acme.dto.CustomerDTO;
import org.acme.dto.CustomerMapper;
import org.acme.model.Article;
import org.acme.model.Customer;
import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CustomerService {
    @Inject
    CustomerMapper customerMapper;

    public CustomerDTO getCustomerById(Long id) {
        return customerMapper.toResource(Customer.findById(id));
    }

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customersList = new ArrayList<>();
        customersList.addAll(Customer.listAll());
        List<CustomerDTO> customerDTOList = new ArrayList<>();

        for(int i = 0; i < Article.count() - 1; i++) {
            customerDTOList.add(customerMapper.toResource(customersList.get(i)));
        }

        return customerDTOList;
    }

    public void insertCustomer(Customer customer) {
        Customer.persist(customer);
    }

    public void deleteCustomer(Long id) {
        Customer.deleteById(id);
    }

    public void updateCustomer(Long id, Customer newCustomer) {
        //
    }
}
