package com.example.demo.user;

import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    UserDocument toDocument(UserDTO userDTO);
    UserDTO fromDocument(UserDocument userDocument);
}
