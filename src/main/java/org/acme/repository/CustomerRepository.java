package org.acme.repository;



import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.acme.model.Customer;


public interface CustomerRepository extends PanacheRepository<Customer> {

}
