package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Route
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface RouteRepository: JpaRepository<Route, Long> {
  @Query("""Select r from Route r, RoutePart rp1, RoutePart rp2
    where rp1 member of r.routeParts and rp2 member of r.routeParts and
    rp1.origin.location.label like :#{#params.origin} and rp2.destination.location.label
    like :#{#params.destination}
    and rp1.order <= rp2.order and rp1.origin.date between
    :#{#params.departureDate} and :#{#params.endOfTheDay}""")
  fun findRoutes(
    @Param("params") params: RoutesSearchParam
  ): List<Route>
}
