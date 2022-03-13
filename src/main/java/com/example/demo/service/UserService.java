package com.example.demo.service;

import com.example.demo.entity.PermissionEntity;
import com.example.demo.entity.UserEntity;
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
        UserEntity userEntity = userMapper.toEntity(userDTO);

        // Hash and salt password, maybe make the admin send it?
        userEntity.setPassword(String.valueOf(UUID.randomUUID()));

        UserEntity savedUserEntity = userRepository.save(userEntity);

        return userMapper.fromEntity(savedUserEntity);
    }

    public List<UserDTO> findAll() {
        ArrayList<UserDTO> users = new ArrayList<>();

        Iterable<UserEntity> userDocuments = userRepository.findAll();
        userDocuments.forEach(doc -> users.add(userMapper.fromEntity(doc)));

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
        Example<UserEntity> userExample = Example.of(userMapper.toEntity(userFilter.getUserFilterCriteria()), exampleMatcher);

        Page<UserEntity> userPage = userRepository.findAll(userExample, pageRequest);

        List<UserDTO> users = userPage.stream()
                .map(userMapper::fromEntity).toList();

        return new PagedUserList(users, userPage.getTotalElements(), userPage.getTotalPages());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO updateUser(UserDTO userDTO) {
        UserEntity userEntity = userRepository.findById(userDTO.getId())
                .orElseThrow(UserNotFoundException::new);

        userMapper.updateEntityFromDTO(userDTO, userEntity);

        userRepository.save(userEntity);
        return userMapper.fromEntity(userEntity);
    }

    public void updatePermissions(Long id, List<PermissionDTO> permissions) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        Set<PermissionEntity> permissionEntities = permissionService.searchDocuments(permissions);
        userEntity.setPermissions(permissionEntities);

        userRepository.save(userEntity);
    }
}
