package org.acme.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import org.acme.dto.CustomerDTO;
import org.acme.dto.OrderDTO;
import org.acme.dto.OrderDTOMapper;
import org.acme.dto.OrderEntityMapper;
import org.acme.model.Article;
import org.acme.model.Customer;
import org.acme.model.Order;

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


    public OrderDTO getOrderById(Long id) {
        return orderDTOMapper.toResource(Order.findById(id));
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orderList = new ArrayList<>();
        orderList.addAll(Order.listAll());
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for(int i = 0; i < Order.count(); i++) {
            orderDTOList.add(orderDTOMapper.toResource(orderList.get(i)));
        }

        return orderDTOList;
    }

    public List<OrderDTO> getAllOrdersPagination(int size, int page) {
        PanacheQuery<Order> ordersList = Order.findAll();

        List<Order> ordersListPaged = new ArrayList<>();
        ordersListPaged = ordersList.page(Page.of(page, size)).list();

        List<OrderDTO> orderDTOList = new ArrayList<>();

        ordersListPaged.stream().forEach(a -> orderDTOList.add(orderDTOMapper.toResource(a)));

        return orderDTOList;

    }

    public void insertOrder(OrderDTO orderDTO) {
        Order.persist(orderEntityMapper.toResource(orderDTO));
    }

    public void deleteOrder(Long id) {
        Order.deleteById(id);
    }

    public void updateOrder(Long id, OrderDTO newOrderDTO) {
        //
    }

}
