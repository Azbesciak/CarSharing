package com.witkups.carsharing.users.authorization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Repo extends JpaRepository<User, Long> {
  @Query("update User u set lastLogin = current_date where u.login = :login")
  User updateLastLoginDate(String login);
}
