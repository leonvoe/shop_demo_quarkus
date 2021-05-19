package org.acme.dto;

import org.acme.model.Gender;
import org.acme.model.Order;
import java.time.LocalDate;
import java.util.List;

public class CustomerDTO {
    private String first_name;
    private String last_name;
    private String username;
    private String password;
    private LocalDate dob;
    private Gender gender;

    public CustomerDTO(String first_name, String last_name, String username, String password, LocalDate dob, Gender gender) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.dob = dob;
        this.gender = gender;
    }

    public CustomerDTO() {
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
}