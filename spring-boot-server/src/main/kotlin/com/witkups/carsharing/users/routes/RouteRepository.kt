package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Route
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface RouteRepository: JpaRepository<Route, Long> {
  companion object {
      const val ROUTE_SELECT = """Select r from Route r, RoutePart rp1, RoutePart rp2
       where rp1 member of r.routeParts and rp2 member of r.routeParts
       and (rp1.origin.location.label like %:#{#params.origin}% or :#{#params.origin} is null)
       and (rp2.destination.location.label like %:#{#params.destination}% or :#{#params.destination} is null)
       and rp1.order <= rp2.order
       and (rp1.origin.date > :#{#params.departureDate} or :#{#params.departureDate} is null)
       """
  }
  @Query(ROUTE_SELECT)
  fun findRoutes(
    @Param("params") params: RoutesSearchParam
  ): Set<Route>

  @Query(ROUTE_SELECT + " and r.driver.id = :driverId")
  fun findByDriverId(
    @Param("driverId") driverId: Long,
    @Param("params") params: RoutesSearchParam
  ): Set<Route>
}
