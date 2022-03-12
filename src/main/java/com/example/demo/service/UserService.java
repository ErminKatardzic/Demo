package com.example.demo.service;

import com.example.demo.database.UserDocument;
import com.example.demo.database.UserMapper;
import com.example.demo.database.UserRepository;
import com.example.demo.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO saveUser(UserDTO userDTO) {
        UserDocument userDocument = userMapper.toDocument(userDTO);

        // Hash and salt password, maybe make the admin send it?
        userDocument.setPassword(String.valueOf(UUID.randomUUID()));

        UserDocument savedUserDocument = userRepository.save(userDocument);

        return userMapper.fromDocument(savedUserDocument);
    }

    public List<UserDTO> findAll() {
        ArrayList<UserDTO> users = new ArrayList<>();

        Iterable<UserDocument> userDocuments = userRepository.findAll();
        userDocuments.forEach(doc -> users.add(userMapper.fromDocument(doc)));

        return users;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
