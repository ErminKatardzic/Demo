package com.example.demo.service;

import com.example.demo.database.PermissionDocument;
import com.example.demo.database.UserDocument;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.PagedUserList;
import com.example.demo.filter.UserFilter;
import com.example.demo.mapper.UserMapper;
import com.example.demo.database.UserRepository;
import com.example.demo.model.PermissionDTO;
import com.example.demo.model.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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

    public PagedUserList searchUsers(UserFilter userFilter) {
        Sort.Order sortOrder = new Sort.Order(
                Sort.Direction.fromString(userFilter.getFilterSort().getDirection().toString()),
                userFilter.getFilterSort().getFieldName()
        );
        PageRequest pageRequest = PageRequest.of(userFilter.getFilterPage().getPage(),
                userFilter.getFilterPage().getSize(),
                Sort.by(sortOrder));

        if (userFilter.getUserFilterCriteria() == null) {
            userFilter.setUserFilterCriteria(new UserDTO());
        }

        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withStringMatcher(ExampleMatcher.StringMatcher.STARTING);
        Example<UserDocument> userExample = Example.of(userMapper.toDocument(userFilter.getUserFilterCriteria()), exampleMatcher);

        Page<UserDocument> userPage = userRepository.findAll(userExample, pageRequest);

        List<UserDTO> users = userPage.stream()
                .map(userMapper::fromDocument).toList();

        return new PagedUserList(users, userPage.getTotalElements(), userPage.getTotalPages());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO updateUser(UserDTO userDTO) {
        UserDocument userDocument  = userRepository.findById(userDTO.getId())
                .orElseThrow(UserNotFoundException::new);

        userMapper.updateDocumentFromDTO(userDTO, userDocument);

        userRepository.save(userDocument);
        return userMapper.fromDocument(userDocument);
    }

    public void updatePermissions(Long id, List<PermissionDTO> permissions) {
        UserDocument userDocument  = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        Set<PermissionDocument> permissionDocuments = permissionService.searchDocuments(permissions);
        userDocument.setPermissions(permissionDocuments);

        userRepository.save(userDocument);
    }
}
