package org.acme.service;

import org.acme.dto.OrderDTO;
import org.acme.dto.OrderDTOMapper;
import org.acme.dto.OrderEntityMapper;
import org.acme.model.Article;
import org.acme.model.Order;
import org.bson.types.ObjectId;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class OrderService {
    @Inject
    OrderDTOMapper orderDTOMapper;
    @Inject
    OrderEntityMapper orderEntityMapper;


    public OrderDTO getOrderById(ObjectId id) {
        return orderDTOMapper.toResource(Order.findById(id));
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orderList = new ArrayList<>();
        orderList.addAll(Order.listAll());
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for(int i = 0; i < Order.count() - 1; i++) {
            orderDTOList.add(orderDTOMapper.toResource(orderList.get(i)));
        }

        return orderDTOList;
    }

    public void insertOrder(OrderDTO orderDTO) {
        Order.persist(orderEntityMapper.toResource(orderDTO));
    }

    public void deleteOrder(ObjectId id) {
        Order.deleteById(id);
    }

    public void updateOrder(ObjectId id, OrderDTO newOrderDTO) {
        //
    }

}
