package org.acme.resource;

import org.acme.model.Customer;
import org.acme.service.CustomerService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/customer")
public class CustomerResource {

    @Inject
    CustomerService customerService;

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Customer findById(@PathParam("id")Long id) {
        return customerService.getCustomerById(id);
    }

    @GET
    @Produces("application/json")
    public List<Customer> findAll() {
        return customerService.getAllCustomers();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertCustomer(Customer customer) {
        customerService.insertCustomer(customer);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteCustomer(@PathParam("id") Long id) {
        customerService.deleteCustomer(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateCustomer(@PathParam("id") Long id, Customer newCustomer) {
        customerService.updateCustomer(id, newCustomer);
    }


}
