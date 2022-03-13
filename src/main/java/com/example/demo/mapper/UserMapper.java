package com.example.demo.mapper;

import com.example.demo.entity.UserEntity;
import com.example.demo.model.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface UserMapper {
    UserEntity toDocument(UserDTO userDTO);

    UserDTO fromDocument(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    void updateDocumentFromDTO(UserDTO userDTO, @MappingTarget UserEntity userEntity);
}
