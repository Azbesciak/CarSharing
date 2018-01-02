package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.user.AppUserService
import org.springframework.web.bind.annotation.*
import java.time.Duration
import java.time.temporal.ChronoUnit

@RestController
@RequestMapping("routes")
class RoutesController(
  private val routeRepository: RouteRepository,
  private val appUserService: AppUserService,
  private val locationRepository: LocationRepository
) {

  @GetMapping("/direct")
  fun getDirectRoute(params: RoutesSearchParam) {
    params.apply {
      departureDate =departureDate?.truncatedTo(ChronoUnit.DAYS)
      endOfTheDay = departureDate?.plus(Duration.ofDays(1))
    }

    print(params)
    val findRoutes = routeRepository.findRoutes(params)
    print(findRoutes)
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
      .flatMap { setOf(it.destination?.location, it.origin?.location) }.toSet()
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
