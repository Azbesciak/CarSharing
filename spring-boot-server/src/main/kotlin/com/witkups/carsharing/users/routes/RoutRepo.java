package com.witkups.carsharing.users.routes;

import com.witkups.carsharing.users.application.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutRepo extends JpaRepository<Route, Long> {}
