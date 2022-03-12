package com.example.demo.controller;

import com.example.demo.model.PermissionDTO;
import com.example.demo.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @GetMapping
    public ResponseEntity<Set<PermissionDTO>> getPermissions() {
        Set<PermissionDTO> permissions = permissionService.findAll();

        return ResponseEntity.ok().body(permissions);
    }
}
