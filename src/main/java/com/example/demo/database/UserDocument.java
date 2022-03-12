package com.example.demo.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class UserDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private UserStatusDocument status;

    // Potential performance hit since it will always fetch permissions from DB
    @ManyToMany
    private Set<PermissionDocument> permissions;
}
