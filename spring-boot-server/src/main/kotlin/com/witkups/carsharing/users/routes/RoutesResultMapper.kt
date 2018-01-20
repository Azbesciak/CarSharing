package com.witkups.carsharing.users.routes

import com.witkups.carsharing.mapTo
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.routerequests.RouteJoinRequestVeto
import com.witkups.carsharing.users.routerequests.RouteJoinRequestsRepo
import com.witkups.carsharing.users.routerequests.RouteJoinRequestVeto.*
import com.witkups.carsharing.users.user.ApplicationUser
import com.witkups.carsharing.users.user.SimpleUserView
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class RoutesResultMapper(
  private val routeJoinRequestsRepo: RouteJoinRequestsRepo
) {

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
        joinVeto = veto
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
        routeParts = sortedRouteParts.map { it.getView() },
        searchedRouteIds = searchedRoute.map { it.id!! },
        description = route.description,
        joinVeto = veto
      )
    }

  fun getAllLocations(sortedRouteParts: Iterable<RoutePart>) =
    listOf(sortedRouteParts.first().origin!!.location!!) +
      sortedRouteParts.map { it.destination!!.location!! }

  fun getRouteView(route: Route) = route.getView()

  fun Route.getView(): RouteView {
    val sortedParts = sortRouteParts(routeParts)
    return RouteView(
      routeId = id!!,
      car = car!!,
      routeParts = sortedParts.map { it.getView() },
      description = description,
      locations = getOrderedVisitedLocationsNames(sortedParts)
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
    val freeSeats = searchedRoute.getFreeSeatsOnRequestedRoute(route)
    val departureDate = searchedRoute.first().origin!!.date!!
    return RouteResultTempContainer(
      sortedRouteParts = sortedRouteParts,
      searchedRoute = searchedRoute,
      locationsNames = locationsNames,
      cost = cost,
      freeSeats = freeSeats,
      departureDate = departureDate,
      veto = canJoinToRoute(route, appUser, freeSeats)
    )
  }

  private fun List<RoutePart>.getFreeSeatsOnRequestedRoute(route: Route) =
    map { it.getFreeSeatsCount(route) }.min()!!

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

  fun canJoinToRoute(route: Route, currentAppUser: ApplicationUser?, requestedParts: List<RoutePart>) =
    canJoinToRoute(route, currentAppUser, requestedParts.getFreeSeatsOnRequestedRoute(route))


  fun canJoinToRoute(route: Route, currentAppUser: ApplicationUser?, freeSeats: Int) =
    when {
      freeSeats <= 0 -> NO_MORE_FREE_SEATS
      route.getDepartureDate().isBefore(Instant.now()) -> OUTDATED
      currentAppUser == null -> ANONYMOUS
      currentAppUser.id == route.driver!!.id -> DRIVER
      route.routeParts.flatMap { it.passengers }.toSet().any { it.id == currentAppUser.id } -> ALREADY_PASSENGER
      route.getAllApplicants().any {it.id == currentAppUser.id} -> ALREADY_REQUESTED
      else -> null
    }



  private fun Route.getAllApplicants() =
    routeJoinRequestsRepo.findAllByRouteId(id!!).map { it.applicant!! }

  private fun Route.getDepartureDate() =
    routeParts.minBy { it.order!! }!!.origin!!.date!!


  private class RouteResultTempContainer(
    val sortedRouteParts: List<RoutePart>,
    val searchedRoute: List<RoutePart>,
    val locationsNames: List<String>,
    val cost: Double,
    val freeSeats: Int,
    val departureDate: Instant,
    val veto: RouteJoinRequestVeto?)
}
