package com.witkups.carsharing.users.routerequests

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface RouteJoinRequestsRepo: JpaRepository<RouteJoinRequest, Long> {
  @Query("select rjr from RouteJoinRequest rjr, Route r where rjr.routeId = r.id and r.driver = :driverId")
  fun findAllByDriverId(driverId: Long): List<RouteJoinRequest>

  fun findAllByApplicantId(applicantId: Long): List<RouteJoinRequest>
}
