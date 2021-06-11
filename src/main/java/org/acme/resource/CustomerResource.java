package org.acme.resource;

import org.acme.dto.ArticleDTO;
import org.acme.dto.CustomerDTO;
import org.acme.model.Article;
import org.acme.model.Customer;
import org.acme.service.CustomerService;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/customer")
public class CustomerResource {

    @Inject
    CustomerService customerService;

    @GET
    @Path("{id}")
    @RolesAllowed("admin")
    @Produces("application/json")
    public CustomerDTO findById(@PathParam("id")Long id) {
        return customerService.getCustomerById(id);
    }

    @GET
    @RolesAllowed("admin")
    @Produces("application/json")
    public List<CustomerDTO> findAll() {
        return customerService.getAllCustomers();
    }

    @GET
    @Path("paginated")
    @PermitAll
    @Produces("application/json")
    public List<CustomerDTO> findAllPaginated(@DefaultValue("0") @QueryParam("page") String page, @DefaultValue("5") @QueryParam("size") String size) {
        return customerService.getAllCustomersPagination(Integer.parseInt(size), Integer.parseInt(page));
    }

    @GET
    @Path("search")
    @PermitAll
    @Produces("application/json")
    public List<CustomerDTO> findAllByNameAndDescription(@DefaultValue("") @QueryParam("search") String searchValue, @DefaultValue("") @QueryParam("filter") String filterValue) {
        return customerService.findAllByNameAndDescription(searchValue, filterValue);
    }

    @GET
    @Path("length")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String length() {
        return String.valueOf(Customer.count());
    }

    @POST
    @Transactional
    @PermitAll
    @Consumes("application/json")
    public void insertCustomer(CustomerDTO customerDTO) {
        customerService.insertCustomer(customerDTO);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @RolesAllowed("admin")
    @Consumes("application/json")
    public void deleteCustomer(@PathParam("id") Long id) {
        customerService.deleteCustomer(id);
    }

    @PUT
    @Transactional
    @RolesAllowed("user")
    @Path("{id}")
    @Consumes("application/json")
    public void updateCustomer(@PathParam("id") Long id, CustomerDTO newCustomerDTO) {
        customerService.updateCustomer(id, newCustomerDTO);
    }


}
