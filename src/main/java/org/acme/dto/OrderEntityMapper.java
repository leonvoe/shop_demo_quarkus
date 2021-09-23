package org.acme.dto;

import org.acme.model.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "cdi")
public interface OrderEntityMapper {
    Order toResource(OrderDTO orderDTO);

}
