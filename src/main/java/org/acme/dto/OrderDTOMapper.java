package org.acme.dto;


import org.acme.model.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "cdi")
public interface OrderDTOMapper {
    OrderDTO toResource(Order order);
}
