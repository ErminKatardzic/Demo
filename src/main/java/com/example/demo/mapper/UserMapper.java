package com.example.demo.mapper;

import com.example.demo.database.UserDocument;
import com.example.demo.model.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface UserMapper {
    UserDocument toDocument(UserDTO userDTO);

    UserDTO fromDocument(UserDocument userDocument);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    void updateDocumentFromDTO(UserDTO userDTO, @MappingTarget UserDocument userDocument);
}
