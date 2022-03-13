package com.example.demo.controller;

import com.example.demo.model.PagedUserList;
import com.example.demo.filter.UserFilter;
import com.example.demo.model.PermissionDTO;
import com.example.demo.service.UserService;
import com.example.demo.model.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        return ResponseEntity.ok().body(userDto);
    }

    @GetMapping
    public ResponseEntity<PagedUserList> searchUsers(UserFilter userFilter) {
        log.info("Search users request received: {}", userFilter);

        PagedUserList pagedUserList = userService.searchUsers(userFilter);

        return ResponseEntity.ok().body(pagedUserList);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("Delete user request received: {}", id);

        userService.deleteUser(id);

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
