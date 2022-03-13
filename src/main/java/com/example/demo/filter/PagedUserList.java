package com.example.demo.filter;

import com.example.demo.model.UserDTO;
import lombok.Data;

import java.util.List;

@Data
public class PagedUserList {
    private final List<UserDTO> content;
    private final Long totalElements;
    private final Integer totalPages;
}
