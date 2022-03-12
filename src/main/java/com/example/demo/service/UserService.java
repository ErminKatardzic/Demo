package com.example.demo.service;

import com.example.demo.database.PermissionDocument;
import com.example.demo.database.UserDocument;
import com.example.demo.mapper.UserMapper;
import com.example.demo.database.UserRepository;
import com.example.demo.model.PermissionDTO;
import com.example.demo.model.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PermissionService permissionService;

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

    public UserDTO updateUser(UserDTO userDTO) {
        Optional<UserDocument> userDocumentOptional = userRepository.findById(userDTO.getId());

        if (userDocumentOptional.isEmpty()) {
            return null;
        }

        UserDocument userDocument = userDocumentOptional.get();
        userMapper.updateDocumentFromDTO(userDTO, userDocument);

        userRepository.save(userDocument);
        return userMapper.fromDocument(userDocument);
    }

    public void updatePermissions(Long id, List<PermissionDTO> permissions) {
        Optional<UserDocument> userDocumentOptional = userRepository.findById(id);
        if (userDocumentOptional.isEmpty()) {
            return;
        }

        UserDocument userDocument = userDocumentOptional.get();
        Set<PermissionDocument> permissionDocuments = permissionService.searchDocuments(permissions);
        userDocument.setPermissions(permissionDocuments);

        userRepository.save(userDocument);
    }
}
