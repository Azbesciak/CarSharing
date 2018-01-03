package com.witkups.carsharing.users.routes

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

  @GetMapping("/direct")
  fun getDirectRoute(params: RoutesSearchParam): List<SimpleRouteResult> {
    params.apply {
      departureDate = getSearchDateStart()
    }

    val findRoutes = routeRepository.findRoutes(params)
    return findRoutes.map { routesResultMapper.mapFromRoute(it, params) }

  }

  private fun RoutesSearchParam.getSearchDateStart(): Instant {
    val now = Instant.now()
    return if (departureDate == null || departureDate!!.isBefore(now))
      now
    else departureDate!!
  }

  @PostMapping("add")
  fun addRoute(@RequestBody route: Route) {
    val currentUser = appUserService.getCurrentAppUser()
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
}
