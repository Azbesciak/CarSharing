package com.witkups.carsharing.users.routes

import com.witkups.carsharing.mapTo
import com.witkups.carsharing.users.application.Location
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class RoutesResultMapper {

  fun prepareSimpleRouteResult(route: Route, searchParam: RoutesSearchParam) =
    getBasicRouteInfo(route, searchParam).mapTo {
      SimpleRouteResult(
        routeId = route.id!!,
        driverName = route.driver!!.firstName!!,
        locations = locationsNames,
        cost = cost,
        freeSeats = freeSeats,
        departureDate = departureDate
      )
    }

  fun prepareDetailedRouteResult(route: Route, searchParam: RoutesSearchParam) =
    getBasicRouteInfo(route, searchParam) mapTo {
      val driver = route mapTo {
        UserSimpleData(
          id = driver!!.id!!,
          dateOfBirth = driver!!.dateOfBirth!!,
          firstName = driver!!.firstName!!,
          lastName = driver!!.lastName!!,
          lastLoginDate = driver!!.user!!.lastLogin!!,
          phoneNumber = driver!!.phoneNumber
        )
      }
      DetailedRouteResult(
        id = route.id!!,
        departureDate = departureDate,
        driver = driver,
        freeSeats = freeSeats,
        cost = cost,
        car = route.car!!,
        routeParts = sortedRouteParts.map { ResultRoutePart(it, searchedRoute.contains(it)) }
      )
    }

  private fun getBasicRouteInfo(route: Route, searchParam: RoutesSearchParam): RouteResultTempContainer {
    val sortedRouteParts = route.routeParts.sortedBy { it.order }
    val searchedRoute = getSearchedRoute(sortedRouteParts, searchParam)
    val allDestinations = sortedRouteParts.map { it.destination!!.location!! }
    val locationsNames = getOrderedVisitedLocationsNames(sortedRouteParts, allDestinations)
    val cost = searchedRoute.sumByDouble { it.cost!! }
    val freeSeats = searchedRoute.map { it.getFreeSeatsCount(route) }.min()!!
    val departureDate = searchedRoute.first().origin!!.date!!
    return RouteResultTempContainer(
      sortedRouteParts = sortedRouteParts,
      searchedRoute = searchedRoute,
      locationsNames = locationsNames,
      cost = cost,
      freeSeats = freeSeats,
      departureDate = departureDate)
  }

  private fun RoutePart.getFreeSeatsCount(route: Route) = route.car!!.seatCount!! - 1 - passengers.size

  private fun getSearchedRoute(sortedRouteParts: List<RoutePart>, searchParam: RoutesSearchParam): List<RoutePart> {
    val firstPartIndex = sortedRouteParts
      .first { it.origin!!.location!!.label!!.contains(searchParam.origin!!) }.order!!
    val lastPartIndex = sortedRouteParts
      .first { it.destination!!.location!!.label!!.contains(searchParam.destination!!) }.order!!
    return sortedRouteParts.subList(firstPartIndex, lastPartIndex + 1)
  }

  private fun getOrderedVisitedLocationsNames(
    sortedRouteParts: List<RoutePart>,
    allDestinations: List<Location>
  ): List<String> {
    val locations = listOf(sortedRouteParts.first().origin!!.location!!) + allDestinations
    return locations.map { it.locality?: it.label!! }
  }

  private class RouteResultTempContainer(
    val sortedRouteParts: List<RoutePart>,
    val searchedRoute: List<RoutePart>,
    val locationsNames: List<String>,
    val cost: Double,
    val freeSeats: Int,
    val departureDate: Instant)
}
