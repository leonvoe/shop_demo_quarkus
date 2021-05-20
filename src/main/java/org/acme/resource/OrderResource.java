package org.acme.resource;

import org.acme.dto.OrderDTO;
import org.acme.model.Order;
import org.acme.service.OrderService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
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
