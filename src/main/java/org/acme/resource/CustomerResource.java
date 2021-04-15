package org.acme.resource;

import org.acme.model.Customer;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/customer")
public class CustomerResource {

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Customer findById(@PathParam("id")Long id) {
        return Customer.findById(id);
    }

    @GET
    @Produces("application/json")
    public List<Customer> findAll() {
        return Customer.listAll();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertCustomer(Customer customer) {
        Customer.persist(customer);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteCustomer(@PathParam("id") Long id) {
        Customer.deleteById(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateCustomer(@PathParam("id") Long id, Customer newCustomer) {
        //
    }


}
