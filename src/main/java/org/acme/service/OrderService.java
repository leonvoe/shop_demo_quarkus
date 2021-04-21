package org.acme.service;

import org.acme.dto.ArticleDTO;
import org.acme.dto.OrderDTO;
import org.acme.dto.OrderMapper;
import org.acme.model.Article;
import org.acme.model.Order;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.PathParam;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class OrderService {
    @Inject
    OrderMapper orderMapper;

    public OrderDTO getOrderById(Long id) {
        return orderMapper.toResource(Order.findById(id));
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orderList = new ArrayList<>();
        orderList.addAll(Order.listAll());
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for(int i = 0; i < Article.count() - 1; i++) {
            orderDTOList.add(orderMapper.toResource(orderList.get(i)));
        }

        return orderDTOList;
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
