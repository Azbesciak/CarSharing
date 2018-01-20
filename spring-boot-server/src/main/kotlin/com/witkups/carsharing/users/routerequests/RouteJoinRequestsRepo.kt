package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.routerequests.RouteJoinRequest.Status
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface RouteJoinRequestsRepo: JpaRepository<RouteJoinRequest, Long> {
  companion object {
      const val SELECT_ALL_BY_DRIVER =
        "select rjr from RouteJoinRequest rjr, Route r where rjr.route.id = r.id and r.driver.id = :driverId"
  }

  @Query(SELECT_ALL_BY_DRIVER)
  fun findAllByDriverId(@Param("driverId") driverId: Long): List<RouteJoinRequest>

  @Query(SELECT_ALL_BY_DRIVER + " and rjr.status = :status")
  fun findAllByDriverIdWithStatus(
    @Param("driverId") driverId: Long, @Param("status") status: Status = Status.AWAITING): List<RouteJoinRequest>

  fun findAllByRouteId(routeId: Long): List<RouteJoinRequest>

  fun findAllByApplicantId(applicantId: Long): List<RouteJoinRequest>
}
