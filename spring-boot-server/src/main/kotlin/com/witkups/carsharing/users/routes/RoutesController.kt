package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.user.AppUserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController()
@RequestMapping("routes")
class RoutesController(
  private val routeRepository: RouteRepository,
  private val appUserService: AppUserService,
  private val locationRepository: LocationRepository
) {
  @PostMapping("add")
  fun addRoute(@RequestBody route: Route) {
    val currentUser = appUserService.getCurrentAppUser()
    route.driver = currentUser
    persistLocations(route)
    routeRepository.save(route)
  }

  private fun persistLocations(route: Route) {
    val allLocations = route.routeParts
      .flatMap { setOf(it.destination?.location, it.origin?.location) }.toSet()
    locationRepository.saveAll(allLocations)
    route.routeParts.forEach {
      it.destination.apply {
        this!!.location = allLocations.find { it!!.placeId == this.location!!.placeId }
      }
    }
    route.routeParts.forEach {
      it.origin.apply {
        this!!.location = allLocations.find { it!!.placeId == this.location!!.placeId }
      }
    }
  }
}
