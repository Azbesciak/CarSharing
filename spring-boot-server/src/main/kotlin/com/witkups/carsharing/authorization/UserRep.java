package com.witkups.carsharing.authorization;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UserRep extends JpaRepository<User, Integer> {
  User findUserByLogin(String login);
}
