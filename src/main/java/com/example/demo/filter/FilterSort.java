package com.example.demo.filter;

import lombok.Data;

@Data
public class FilterSort {
    private String fieldName;
    private Direction direction;

    public enum Direction {
        ASC, DESC
    }
}
