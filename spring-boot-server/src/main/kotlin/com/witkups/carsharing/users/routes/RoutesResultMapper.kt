package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Location
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import org.springframework.stereotype.Service

@Service
class RoutesResultMapper {

  fun mapFromRoute(route: Route, searchParam: RoutesSearchParam): SimpleRouteResult {
    val sortedRouteParts = route.routeParts.sortedBy { it.order }
    val allDestinations = sortedRouteParts.map { it.destination!!.location!! }
    val locationsNames = getOrderedVisitedLocationsNames(sortedRouteParts, allDestinations)
    val searchedRoute = getSearchedRoute(sortedRouteParts, searchParam)
    val cost = searchedRoute.sumByDouble { it.cost!! }
    val freeSeats = searchedRoute.map { it.getFreeSeatsCount(route) }.min()!!
    val departureDate = searchedRoute.first().origin!!.date!!
    return SimpleRouteResult(
      routeId = route.id!!,
      driverName = route.driver!!.firstName!!,
      locations = locationsNames,
      cost = cost,
      freeSeats = freeSeats,
      departureDate = departureDate
    )
  }

  private fun RoutePart.getFreeSeatsCount(route: Route) = route.car!!.seatCount!! - 1 - passengers.size

  private fun getSearchedRoute(sortedRouteParts: List<RoutePart>, searchParam: RoutesSearchParam): List<RoutePart> {
    val firstPartIndex = sortedRouteParts
      .first { it.origin?.location?.label == searchParam.origin }.order!!
    val lastPartIndex = sortedRouteParts
      .first { it.destination?.location?.label == searchParam.destination }.order!!
    return sortedRouteParts.subList(firstPartIndex, lastPartIndex + 1)
  }

  private fun getOrderedVisitedLocationsNames(
    sortedRouteParts: List<RoutePart>,
    allDestinations: List<Location>
  ): List<String> {
    val locations = listOf(sortedRouteParts.first().origin!!.location!!) + allDestinations
    return locations.map { it.locality!! }
  }
}
