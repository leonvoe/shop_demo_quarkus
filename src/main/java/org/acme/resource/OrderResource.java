package org.acme.resource;

import org.acme.model.Order;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.util.List;

@Path("/order")
public class OrderResource {

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Order findById(@PathParam("id")Long id) {
        return Order.findById(id);
    }

    @GET
    @Produces("application/json")
    public List<Order> findAll() {
        return Order.listAll();
    }

    @POST
    @Transactional
    @Consumes("application/json")
    public void insertOrder(Order order) {
        Order.persist(order);
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void deleteOrder(@PathParam("id") Long id) {
        Order.deleteById(id);
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes("application/json")
    public void updateOrder(@PathParam("id") Long id, Order newOrder) {
        //
    }


}
