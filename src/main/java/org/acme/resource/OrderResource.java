package org.acme.resource;

import org.acme.dto.OrderDTO;
import org.acme.model.Order;
import org.acme.service.OrderService;
import org.bson.types.ObjectId;

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
    public OrderDTO findById(@PathParam("id")String id) {
        return orderService.getOrderById(new ObjectId(id));
    }

    @GET
    @Produces("application/json")
    public List<OrderDTO> findAll() {
        return orderService.getAllOrders();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertOrder(OrderDTO orderDTO) {
        orderService.insertOrder(orderDTO);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteOrder(@PathParam("id") String id) {
        orderService.deleteOrder(new ObjectId(id));
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateOrder(@PathParam("id") String id, OrderDTO newOrderDTO) {
        orderService.updateOrder(new ObjectId(id), newOrderDTO);
    }
}
