package org.acme.dto;

import org.acme.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "cdi")
public interface CustomerDTOMapper {
    CustomerDTO toResource(Customer customer);
}