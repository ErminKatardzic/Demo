package com.example.demo.database;

import com.example.demo.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface UserRepository extends CrudRepository<UserEntity, Long>, QueryByExampleExecutor<UserEntity> {
}
