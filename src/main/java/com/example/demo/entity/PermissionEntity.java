package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class PermissionEntity {
    @Id
    private Long id;

    private String name;
    private String description;
}
