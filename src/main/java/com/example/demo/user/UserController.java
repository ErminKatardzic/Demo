package com.example.demo.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        // do validation
        UserDocument userDocument = userMapper.toDocument(userDTO);

        // Hash and salt password, maybe make the admin send it?
        userDocument.setPassword(String.valueOf(UUID.randomUUID()));

        UserDocument savedUserDocument = userRepository.save(userDocument);

        return ResponseEntity.ok().body(userMapper.fromDocument(savedUserDocument));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        ArrayList<UserDTO> users = new ArrayList<>();
        Iterable<UserDocument> userDocuments = userRepository.findAll();

        userDocuments.forEach(doc -> users.add(userMapper.fromDocument(doc)));

        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        Optional<UserDocument> userDocumentOptional = userRepository.findById(id);
        return userDocumentOptional.map(userDocument ->
                        ResponseEntity.ok().body(userMapper.fromDocument(userDocument))
                )
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }
}
