package com.example.demo.mapper;

import com.example.demo.entity.PermissionEntity;
import com.example.demo.model.PermissionDTO;
import org.mapstruct.Mapper;

@Mapper
public interface PermissionMapper {
    PermissionDTO fromDocument(PermissionEntity permissionEntity);
}
