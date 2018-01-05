package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.throwOnNotFound
import com.witkups.carsharing.mapTo
import com.witkups.carsharing.security.UserService
import com.witkups.carsharing.users.routes.RoutePartsRepo
import com.witkups.carsharing.users.routes.RouteRepository
import com.witkups.carsharing.users.user.AppUserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("request")
class RouteRequestsController(
  private val routeJoinRequestsRepo: RouteJoinRequestsRepo,
  private val routePartRepo: RoutePartsRepo,
  private val appUserService: AppUserService,
  private val userService: UserService,
  private val routeRepository: RouteRepository) {

  @PostMapping("join")
  fun joinToRoute(routeJoinRequest: RouteJoinRequest) =
    routeJoinRequest.apply {
      applicantId = asAuthUser().userId
      routeJoinRequestsRepo.save(this)
    }


  @PostMapping("accept/{id}")
  fun acceptRequest(@RequestAttribute id: Long) =
    getRouteRequestById(id) mapTo {
      val currentAppUser = appUserService.getCurrentAppUser()
      status = RouteJoinRequest.Status.ACCEPTED
      val allRequestedRouteParts = routePartRepo.findAllById(requestedRoute)
      allRequestedRouteParts.forEach { it.passengers.add(currentAppUser) }
    }


  @GetMapping("all/asDriver")
  fun getAllRequestsAsDriver() =
    asAuthUser() mapTo {
      routeJoinRequestsRepo.findAllByDriverId(userId!!)
    }

  @GetMapping("all/asPassenger")
  fun getAllRequestsAsPassenger() =
    asAuthUser() mapTo {
      routeJoinRequestsRepo.findAllByApplicantId(userId!!)
    }

  @PostMapping("reject/{id}")
  fun rejectRequest(@RequestAttribute id: Long) =
    asAuthUser() mapTo {
      val requestedRoute = getRouteRequestById(id)
      val route = routeRepository
        .findById(requestedRoute.routeId!!)
        .throwOnNotFound("route", requestedRoute.routeId!!)
      if (route.driver!!.id == userId) {
        requestedRoute.status = RouteJoinRequest.Status.REJECTED
      } else {
        throw IllegalAccessException("You can't reject not your route's join requests")
      }
    }

  @PostMapping("cancel/{id}")
  fun cancelRequest(@RequestAttribute id: Long) =
    asAuthUser() mapTo {
      val requestedRoute = getRouteRequestById(id)

      if (requestedRoute.applicantId == userId) {
        requestedRoute.status = RouteJoinRequest.Status.CANCELED
      } else {
        throw IllegalAccessException("You can't reject not your route's join requests")
      }
    }

  private fun asAuthUser() = userService.getAuthUser()

  private fun getRouteRequestById(id: Long) =
    routeJoinRequestsRepo
      .findById(id)
      .throwOnNotFound("route join request", id)
}
