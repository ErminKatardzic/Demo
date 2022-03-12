package com.example.demo.mapper;

import com.example.demo.database.PermissionDocument;
import com.example.demo.model.PermissionDTO;
import org.mapstruct.Mapper;

@Mapper
public interface PermissionMapper {
    PermissionDTO fromDocument(PermissionDocument permissionDocument);
}
