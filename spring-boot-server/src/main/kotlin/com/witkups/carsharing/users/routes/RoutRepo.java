package com.witkups.carsharing.users.routes;

import com.witkups.carsharing.users.routerequests.RouteJoinRequest;
import com.witkups.carsharing.users.routerequests.RouteJoinRequestsRepo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutRepo extends JpaRepository<RouteJoinRequest, Long> {

}
