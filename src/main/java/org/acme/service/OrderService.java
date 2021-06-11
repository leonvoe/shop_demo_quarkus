package org.acme.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import org.acme.dto.CustomerDTO;
import org.acme.dto.OrderDTO;
import org.acme.dto.OrderDTOMapper;
import org.acme.dto.OrderEntityMapper;
import org.acme.model.*;

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

    public List<OrderDTO> findAllByNotesAndShippingAndStatus(String searchVal, String filterValShipping, String filterValStatus) {
        System.out.println(filterValShipping);
        System.out.println(filterValStatus);

        Shipping filterValEnumShipping = null;
        Status filterValEnumStatus = null;

        List<OrderDTO> orderDTOList = new ArrayList<>();
        List<Order> filteredOrders;

        switch(filterValShipping) {
            case "DHL":
                filterValEnumShipping = Shipping.DHL;
                break;
            case "Hermes":
                filterValEnumShipping = Shipping.HERMES;
                break;
            case "DPD":
                filterValEnumShipping = Shipping.DPD;
                break;

            default:
                filterValShipping = "";
                break;
        }

        switch(filterValStatus) {
            case "In Progress":
                filterValEnumStatus = Status.INPROGRESS;
                break;
            case "Delivering":
                filterValEnumStatus = Status.DELIVERING;
                System.out.println("Delivering!!!!!!");
                break;
            case "Delivered":
                filterValEnumStatus = Status.DELIVERED;
                break;

            default:
                filterValStatus = "";
                break;
        }

        if(filterValStatus.equals("") && filterValShipping.equals("")) {
            filteredOrders = Order.list("notes = ?1", searchVal);
        }
        else {
            filteredOrders = Order.list("shipping = ?1", filterValEnumShipping);
            //filteredOrders.( Order.list("shipping = ?1", filterValEnumShipping));
        }
        filteredOrders.stream().forEach(o -> orderDTOList.add(orderDTOMapper.toResource(o)));

        return orderDTOList;
    }

    public void insertOrder(OrderDTO orderDTO) {
        Order.persist(orderEntityMapper.toResource(orderDTO));
    }

    public void deleteOrder(Long id) {
        Order.deleteById(id);
    }

    public void updateOrder(Long id, OrderDTO newOrderDTO) {

        int shipping = 0;
        int status = 0;

        switch(newOrderDTO.getShipping()) {
            case DHL:
                shipping = 0;
                break;
            case HERMES:
                shipping = 1;
                break;
            case DPD:
                shipping = 2;
                break;
            default:
                break;
        }

            switch(newOrderDTO.getStatus()) {
                case INPROGRESS:
                    status=0;
                    break;
                case DELIVERING:
                    status=1;
                    break;
                case DELIVERED:
                    status=2;
                    break;
                default:
                    break;

        }
        Order.update("notes = '" + newOrderDTO.getNotes() + "', status ='" + status + "', shipping = '" + shipping + "', customer_id = '" + newOrderDTO.getCustomer().getId()  + "' where id = ?1", id);
    }
}


