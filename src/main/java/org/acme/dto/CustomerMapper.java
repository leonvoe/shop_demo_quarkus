package org.acme.dto;

import org.acme.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "cdi")
public interface CustomerMapper {
    CustomerDTO toResource(Customer customer);
}