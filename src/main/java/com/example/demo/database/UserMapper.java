package com.example.demo.database;

import com.example.demo.user.UserDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    UserDocument toDocument(UserDTO userDTO);
    UserDTO fromDocument(UserDocument userDocument);
}
