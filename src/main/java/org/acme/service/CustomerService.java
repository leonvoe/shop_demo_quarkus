package org.acme.service;

import org.acme.model.Customer;
import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class CustomerService {

    public Customer getCustomerById(Long id) {
        return Customer.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return Customer.listAll();
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
