package com.example.demo.user;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserDTO {
    private Long id;

    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String username;
    @Email
    private String email;
    private UserStatusDTO status = UserStatusDTO.INACTIVE;

    // suggestion: timestamp when last updated
}
