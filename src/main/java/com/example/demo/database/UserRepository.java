package com.example.demo.database;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface UserRepository extends CrudRepository<UserDocument, Long>, QueryByExampleExecutor<UserDocument> {
}
