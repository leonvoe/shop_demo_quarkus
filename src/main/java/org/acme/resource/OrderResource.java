package org.acme.resource;

import org.acme.dto.CustomerDTO;
import org.acme.dto.OrderDTO;
import org.acme.model.Customer;
import org.acme.model.Order;
import org.acme.service.OrderService;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/order")
public class OrderResource {

    @Inject
    OrderService orderService;

    @GET
    @RolesAllowed("user")
    @Path("{id}")
    @Produces("application/json")
    public OrderDTO findById(@PathParam("id")Long id) {
        return orderService.getOrderById(id);
    }

    @GET
    @RolesAllowed("user")
    @Produces("application/json")
    public List<OrderDTO> findAll() {
        return orderService.getAllOrders();
    }

    @GET
    @Path("paginated")
    @PermitAll
    @Produces("application/json")
    public List<OrderDTO> findAllPaginated(@DefaultValue("0") @QueryParam("page") String page, @DefaultValue("5") @QueryParam("size") String size) {
        return orderService.getAllOrdersPagination(Integer.parseInt(size), Integer.parseInt(page));
    }

    @GET
    @Path("length")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String length() {
        return String.valueOf(Order.count());
    }

    @POST
    @RolesAllowed("user")
    @Transactional
    @Consumes("application/json")
    public void insertOrder(OrderDTO orderDTO) {
        orderService.insertOrder(orderDTO);
    }

    @DELETE
    @RolesAllowed("user")
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteOrder(@PathParam("id") Long id) {
        orderService.deleteOrder(id);
    }

    @PUT
    @RolesAllowed("user")
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateOrder(@PathParam("id") Long id, OrderDTO newOrderDTO) {
        orderService.updateOrder(id, newOrderDTO);
    }
}
