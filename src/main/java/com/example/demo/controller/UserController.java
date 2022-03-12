package com.example.demo.controller;

import com.example.demo.service.UserService;
import com.example.demo.user.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        log.info("Create user request received: {}", userDTO);
        // do validate

        UserDTO userDto = userService.saveUser(userDTO);

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
}
