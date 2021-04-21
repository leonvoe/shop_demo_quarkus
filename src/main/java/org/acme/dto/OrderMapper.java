package org.acme.dto;


import org.acme.model.Customer;
import org.acme.model.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "cdi")
public interface OrderMapper {
    OrderDTO toResource(Order order);


}
