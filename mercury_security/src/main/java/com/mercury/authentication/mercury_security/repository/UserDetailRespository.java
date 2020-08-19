package com.mercury.authentication.mercury_security.repository;

import java.util.Optional;

import com.mercury.authentication.mercury_security.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailRespository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String name);
}