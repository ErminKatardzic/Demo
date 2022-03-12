package com.example.demo.database;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class PermissionDocument {
    @Id
    private Long id;

    private String name;
    private String description;
}
