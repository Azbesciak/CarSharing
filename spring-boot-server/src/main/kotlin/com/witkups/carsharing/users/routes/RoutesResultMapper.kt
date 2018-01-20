package com.witkups.carsharing.users.routes

import com.witkups.carsharing.mapTo
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.user.ApplicationUser
import com.witkups.carsharing.users.user.SimpleUserView
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class RoutesResultMapper {

  fun prepareSimpleRouteResult(route: Route, searchParam: RoutesSearchParam, appUser: ApplicationUser?) =
    getBasicRouteInfo(route, searchParam, appUser).mapTo {
      SimpleRouteResult(
        routeId = route.id!!,
        driverName = route.driver!!.firstName!!,
        locations = locationsNames,
        cost = cost,
        freeSeats = freeSeats,
        departureDate = departureDate,
        searchedRouteIds = searchedRoute.map { it.id!! },
        canJoin = canJoin
      )
    }

  fun prepareDetailedRouteResult(route: Route, searchParam: RoutesSearchParam, appUser: ApplicationUser?) =
    getBasicRouteInfo(route, searchParam, appUser) mapTo {
      val driver = route mapTo {
        SimpleUserView(
          id = driver!!.id!!,
          dateOfBirth = driver!!.dateOfBirth!!,
          firstName = driver!!.firstName!!,
          lastName = driver!!.lastName!!,
          lastLoginDate = driver!!.user!!.lastLogin!!,
          phoneNumber = driver!!.phoneNumber
        )
      }
      DetailedRouteResult(
        routeId = route.id!!,
        departureDate = departureDate,
        driver = driver,
        freeSeats = freeSeats,
        cost = cost,
        car = route.car!!,
        routeParts = sortedRouteParts.map { it.toRouteView() },
        searchedRouteIds = searchedRoute.map { it.id!! },
        description = route.description,
        canJoin = canJoin
      )
    }

  fun getAllLocations(sortedRouteParts: Iterable<RoutePart>) =
    listOf(sortedRouteParts.first().origin!!.location!!) +
      sortedRouteParts.map { it.destination!!.location!! }

  fun getRouteView(route: Route, appUser: ApplicationUser) = route.getView(appUser)

  fun Route.getView(appUser: ApplicationUser): RouteView {
    val sortedParts = sortRouteParts(routeParts)
    return RouteView(
      routeId = id!!,
      car = car!!,
      routeParts = sortedParts.map { it.toRouteView() },
      description = description,
      locations = getOrderedVisitedLocationsNames(sortedParts),
      canJoin = canJoinToRoute(this, appUser)
    )
  }

  private fun getBasicRouteInfo(route: Route,
                                searchParam: RoutesSearchParam,
                                appUser: ApplicationUser?
  ): RouteResultTempContainer {
    val sortedRouteParts = sortRouteParts(route.routeParts)
    val searchedRoute = getSearchedRoute(sortedRouteParts, searchParam)

    val locationsNames = getOrderedVisitedLocationsNames(sortedRouteParts)
    val cost = searchedRoute.sumByDouble { it.cost!! }
    val freeSeats = searchedRoute.map { it.getFreeSeatsCount(route) }.min()!!
    val departureDate = searchedRoute.first().origin!!.date!!
    return RouteResultTempContainer(
      sortedRouteParts = sortedRouteParts,
      searchedRoute = searchedRoute,
      locationsNames = locationsNames,
      cost = cost,
      freeSeats = freeSeats,
      departureDate = departureDate,
      canJoin = canJoinToRoute(route, appUser))
  }

  private fun sortRouteParts(parts: Set<RoutePart>) = parts.sortedBy { it.order }

  private fun RoutePart.getFreeSeatsCount(route: Route) = route.car!!.seatCount!! - 1 - passengers.size

  private fun getSearchedRoute(sortedRouteParts: List<RoutePart>, searchParam: RoutesSearchParam): List<RoutePart> {
    val firstPartIndex = sortedRouteParts
      .first { it.origin!!.location!!.label!!.contains(searchParam.origin!!) }.order!!
    val lastPartIndex = sortedRouteParts
      .first { it.destination!!.location!!.label!!.contains(searchParam.destination!!) }.order!!
    return sortedRouteParts.subList(firstPartIndex, lastPartIndex + 1)
  }

  fun getOrderedVisitedLocationsNames(sortedRouteParts: List<RoutePart>) =
    getAllLocations(sortedRouteParts).map { it.locality ?: it.label!! }

  fun canJoinToRoute(route: Route, currentAppUser: ApplicationUser?) =
    currentAppUser != null &&
      currentAppUser.id != route.driver!!.id &&
      Instant.now().isBefore(getDepartureDate(route)) &&
      route.routeParts.flatMap { it.passengers }.toSet().none { it.id == currentAppUser.id }

  private fun getDepartureDate(route: Route) =
    route.routeParts.minBy { it.order!! }!!.origin!!.date!!


  private class RouteResultTempContainer(
    val sortedRouteParts: List<RoutePart>,
    val searchedRoute: List<RoutePart>,
    val locationsNames: List<String>,
    val cost: Double,
    val freeSeats: Int,
    val departureDate: Instant,
    val canJoin: Boolean)
}
