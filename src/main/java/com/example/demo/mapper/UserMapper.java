package com.example.demo.mapper;

import com.example.demo.entity.UserEntity;
import com.example.demo.model.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface UserMapper {
    UserEntity toEntity(UserDTO userDTO);

    UserDTO fromEntity(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    void updateEntityFromDTO(UserDTO userDTO, @MappingTarget UserEntity userEntity);
}
