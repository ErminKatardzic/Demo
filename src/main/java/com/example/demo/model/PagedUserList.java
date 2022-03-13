package com.example.demo.model;

import lombok.Data;

import java.util.List;

@Data
public class PagedUserList {
    private final List<UserDTO> content;
    private final Long totalElements;
    private final Integer totalPages;
}
