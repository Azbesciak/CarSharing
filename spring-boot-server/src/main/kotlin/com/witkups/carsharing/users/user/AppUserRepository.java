package com.witkups.carsharing.users.user;

import com.witkups.carsharing.users.application.ApplicationUser;
import com.witkups.carsharing.users.authorization.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AppUserRepository extends JpaRepository<User, Long> {

  @Query("select u from ApplicationUser u where u.user.login = ?1")
  ApplicationUser getByUser(String login);
}
