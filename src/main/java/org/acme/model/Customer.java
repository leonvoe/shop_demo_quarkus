package org.acme.model;




import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import org.bson.types.ObjectId;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@MongoEntity
public class Customer extends PanacheMongoEntity {
    @Id
    public ObjectId id;
    private String first_name;
    private String last_name;
    private String username;
    private String password;
    private LocalDate dob;
    private Gender gender;
    private List<Order> orders;


    public Customer(ObjectId id, String first_name, String last_name, String username, String password, LocalDate dob, Gender gender, List<Order> orders) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.dob = dob;
        this.gender = gender;
        this.orders = orders;
    }

    public Customer() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
