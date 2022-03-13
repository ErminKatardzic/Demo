package com.example.demo.filter;

import com.example.demo.model.UserDTO;
import lombok.Data;

@Data
public class UserFilter {
    private UserDTO userFilterCriteria;
    private FilterPage filterPage;
    private FilterSort filterSort;
}
