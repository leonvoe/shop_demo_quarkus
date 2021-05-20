package org.acme.resource;

import org.acme.dto.CustomerDTO;
import org.acme.model.Customer;
import org.acme.service.CustomerService;
import org.bson.types.ObjectId;

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
    public CustomerDTO findById(@PathParam("id") String id) {
        return customerService.getCustomerById(new ObjectId(id));
    }

    @GET
    @Produces("application/json")
    public List<CustomerDTO> findAll() {
        return customerService.getAllCustomers();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertCustomer(CustomerDTO customerDTO) {
        customerService.insertCustomer(customerDTO);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteCustomer(@PathParam("id") String id) {
        customerService.deleteCustomer(new ObjectId(id));
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateCustomer(@PathParam("id") String id, CustomerDTO newCustomerDTO) {
        customerService.updateCustomer(new ObjectId(id), newCustomerDTO);
    }


}
