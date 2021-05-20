package org.acme.service;

import io.quarkus.runtime.StartupEvent;
import org.acme.dto.CustomerDTO;
import org.acme.model.Customer;
import org.acme.model.Gender;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.transaction.Transactional;
import java.time.LocalDate;

@Singleton
public class Startup {
    @Inject
    CustomerService customerService;
    @Transactional
    public void loadUsers(@Observes StartupEvent evt) {
        // reset and load all test users
        customerService.insertCustomer(new CustomerDTO("admin", "admin", "admin", "admin", LocalDate.now(), Gender.DIVERSE, "admin"));
        customerService.insertCustomer(new CustomerDTO("user", "user", "user", "user", LocalDate.now(), Gender.DIVERSE, "user"));
    }
}