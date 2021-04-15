package org.acme.repository;



import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.acme.model.Order;

import java.util.List;

public interface OrderRepository extends PanacheRepository<Order> {


}
