package com.witkups.carsharing.users.routes

import com.witkups.carsharing.mapTo
import com.witkups.carsharing.throwOnNotFound
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.user.AppUserService
import org.springframework.web.bind.annotation.*
import java.time.*

@RestController
@RequestMapping("routes")
class RoutesController(
  private val routeRepository: RouteRepository,
  private val appUserService: AppUserService,
  private val locationRepository: LocationRepository,
  private val routesResultMapper: RoutesResultMapper
) {

  @GetMapping("direct")
  fun getDirectRoutes(params: RoutesSearchParam): List<SimpleRouteResult> {
    params.departureDate = params.getSearchDateStart()
    val matchingRoutes = routeRepository.findRoutes(params)
    return matchingRoutes.map { routesResultMapper.prepareSimpleRouteResult(it, params) }
  }

  @GetMapping("byDriver")
  fun getAllUserAsDriverRoutes() =
    appUserService.getUserId().let {
      routeRepository.findByDriverId(it).map { routesResultMapper.getRouteView(it) }
    }

  @GetMapping("{id}")
  fun getRoute(@PathVariable id: Long, params: RoutesSearchParam): DetailedRouteResult {
    val route = routeRepository.findById(id).throwOnNotFound("route", id)
    return routesResultMapper.prepareDetailedRouteResult(route, params)
  }

  @PostMapping("add")
  fun addRoute(@RequestBody route: Route) {
    val currentUser = appUserService.getCurrentAppUserReference()
    route.driver = currentUser
    persistLocations(route)
    routeRepository.save(route)
  }

  private fun persistLocations(route: Route) {
    val distinctLocations = route.routeParts
      .flatMap { setOf(it.destination!!.location, it.origin!!.location) }.toSet()
    val locationsWithAlreadyExisting = locationRepository
      .findAllById(distinctLocations
        .map { it!!.placeId })
      .toSet()
      .plus(distinctLocations)
    route.routeParts.forEach {
      it.destination.apply {
        this!!.location = locationsWithAlreadyExisting.find { it!!.placeId == location!!.placeId }
      }
    }
    route.routeParts.forEach {
      it.origin.apply {
        this!!.location = locationsWithAlreadyExisting.find { it!!.placeId == location!!.placeId }
      }
    }
  }

  private fun RoutesSearchParam.getSearchDateStart(): Instant {
    val now = Instant.now()
    return if (departureDate == null || departureDate!!.isBefore(now))
      now
    else departureDate!!
  }
}
