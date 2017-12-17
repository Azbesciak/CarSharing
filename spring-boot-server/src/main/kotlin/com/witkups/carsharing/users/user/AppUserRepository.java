package com.witkups.carsharing.users.user;

import com.witkups.carsharing.users.application.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppUserRepository extends JpaRepository<ApplicationUser, Long> {

  @Query("select u from ApplicationUser u where u.user.login = ?1")
  ApplicationUser getByUserLogin(String login);

}

