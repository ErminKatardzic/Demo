package com.example.demo.user;


import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private UserStatusDTO status;

    // suggestion: timestamp when last updated
}
