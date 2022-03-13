package com.example.demo.model;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

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
    @NotNull
    private UserStatusDTO status;

    private Set<PermissionDTO> permissions;

    // suggestion: timestamp when last updated
}
