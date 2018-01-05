package com.witkups.carsharing.users.routes;

import com.witkups.carsharing.users.application.Route;
import com.witkups.carsharing.users.routerequests.RouteJoinRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface RoutRepo extends JpaRepository<RouteJoinRequest, Long> {

  List<RouteJoinRequest> findAllByApplicantId(Long applicantId);
}
