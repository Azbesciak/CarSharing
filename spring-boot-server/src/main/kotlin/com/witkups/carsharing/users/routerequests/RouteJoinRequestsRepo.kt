package com.witkups.carsharing.users.routerequests

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface RouteJoinRequestsRepo: JpaRepository<RouteJoinRequest, Long> {
  @Query("select rjr from RouteJoinRequest rjr, Route r where rjr.route.id = r.id and r.driver = :driverId")
  fun findAllByDriverId(@Param("driverId") driverId: Long): List<RouteJoinRequest>

  fun findAllByRouteId(routeId: Long): List<RouteJoinRequest>

  fun findAllByApplicantId(applicantId: Long): List<RouteJoinRequest>
}
