package com.example.demo.controller;

import com.example.demo.model.PermissionDTO;
import com.example.demo.service.UserService;
import com.example.demo.model.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody @Validated UserDTO userDTO) {
        log.info("Create user request received: {}", userDTO);

        UserDTO userDto = userService.saveUser(userDTO);

        return ResponseEntity.ok().body(userDto);
    }

    @PatchMapping
    public ResponseEntity<UserDTO> updateUser(@Validated @RequestBody UserDTO userDTO) {
        log.info("Update user request received: {}", userDTO);

        UserDTO userDto = userService.updateUser(userDTO);

        if (userDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(userDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        log.info("Get users request received");

        List<UserDTO> users = userService.findAll();

        return ResponseEntity.ok().body(users);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("Delete user request received: {}", id);

        try {
            userService.deleteUser(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "/{id}/permissions")
    public ResponseEntity<Void> updatePermissions(@PathVariable Long id,
                                                  @RequestBody List<PermissionDTO> permissions
    ) {
        log.info("Permission update request received: {}", id);

        userService.updatePermissions(id, permissions);

        return ResponseEntity.ok().build();
    }
}
