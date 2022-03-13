package com.example.demo.service;

import com.example.demo.database.PermissionRepository;
import com.example.demo.entity.PermissionEntity;
import com.example.demo.mapper.PermissionMapper;
import com.example.demo.model.PermissionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    public Set<PermissionDTO> findAll() {
        Set<PermissionDTO> permissions = new HashSet<>();

        Iterable<PermissionEntity> permissionDocuments = permissionRepository.findAll();
        permissionDocuments.forEach(doc -> permissions.add(permissionMapper.fromEntity(doc)));

        return permissions;
    }

    public Set<PermissionEntity> searchDocuments(List<PermissionDTO> permissionDTOs) {
        Set<PermissionEntity> permissions = new HashSet<>();

        Iterable<PermissionEntity> permissionDocuments = permissionRepository.findAllById(permissionDTOs.stream().map(PermissionDTO::getId).collect(Collectors.toList()));
        permissionDocuments.forEach(permissions::add);

        return permissions;
    }
}
