package org.acme.resource;

import org.acme.dto.OrderDTO;
import org.acme.model.Order;
import org.acme.service.OrderService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/order")
public class OrderResource {

    @Inject
    OrderService orderService;

    @GET
    @Path("{id}")
    @Produces("application/json")
    public OrderDTO findById(@PathParam("id")Long id) {
        return orderService.getOrderById(id);
    }

    @GET
    @Produces("application/json")
    public List<OrderDTO> findAll() {
        return orderService.getAllOrders();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertOrder(Order order) {
        orderService.insertOrder(order);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteOrder(@PathParam("id") Long id) {
        orderService.deleteOrder(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateOrder(@PathParam("id") Long id, Order newOrder) {
        orderService.updateOrder(id, newOrder);
    }
}
