package org.acme.service;

import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.PathParam;
import java.util.List;

@ApplicationScoped
public class OrderService {

    public Order getOrderById(Long id) {
        return Order.findById(id);
    }

    public List<Order> getAllOrders() {
        return Order.listAll();
    }

    public void insertOrder(Order order) {
        Order.persist(order);
    }

    public void deleteOrder(Long id) {
        Order.deleteById(id);
    }

    public void updateOrder(Long id, Order newOrder) {
        //
    }

}
