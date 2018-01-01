package com.witkups.carsharing.users.routes;

import com.witkups.carsharing.users.application.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface RoutRepo extends JpaRepository<Route, Long> {

//  @Query(nativeQuery = true,
//    value =
//      "SELECT r.*" +
//      " from dbo.routes r ,dbo.route_parts r1, dbo.route_parts rp2" +
//      " where r1.")
  @Query("Select r from Route r, RoutePart rp1, RoutePart rp2" +
    " where rp1 member of r.routeParts and rp2 member of r.routeParts and " +
    "rp1.origin.location.label like :#{origin} and rp2.destination.location.label like :#{dest} " +
    "and rp1.order < rp2.order")
  List<Route> findRoutes(
    @Param("origin") String origin,
    @Param("dest") String destination,
    @Param("departureDate") Instant date
  );
}
