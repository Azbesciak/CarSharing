package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.throwOnNotFound
import com.witkups.carsharing.mapTo
import com.witkups.carsharing.security.UserService
import com.witkups.carsharing.users.routes.RoutePartsRepo
import com.witkups.carsharing.users.routes.RouteRepository
import com.witkups.carsharing.users.routes.RoutesResultMapper
import com.witkups.carsharing.users.user.AppUserService
import com.witkups.carsharing.users.user.SimpleUserView
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("request")
class RouteRequestsController(
  private val routeJoinRequestsRepo: RouteJoinRequestsRepo,
  private val routePartRepo: RoutePartsRepo,
  private val appUserService: AppUserService,
  private val userService: UserService,
  private val routesResultMapper: RoutesResultMapper,
  private val routeRepository: RouteRepository) {

  @PostMapping("join")
  fun joinToRoute(routeJoinRequest: RouteJoinRequest) =
    routeJoinRequest.apply {
      applicantId = asAuthUser().userId
      routeJoinRequestsRepo.save(this)
    }

  @PostMapping("accept/{requestId}")
  fun acceptRequest(@RequestAttribute requestId: Long) =
    getRouteRequestById(requestId) mapTo {
      val currentAppUser = appUserService.getCurrentAppUserReference()
      status = RouteJoinRequest.Status.ACCEPTED
      val allRequestedRouteParts = routePartRepo.findAllById(requestedRoute)
      allRequestedRouteParts.forEach { it.passengers.add(currentAppUser) }
    }

  @GetMapping("route/{routeId}")
  fun getAllRouteRequests(@RequestAttribute routeId: Long): List<RouteJoinRequestView> {
    val route = routeRepository.findById(routeId)
      .throwOnNotFound("route", routeId)
    asAuthUser().let {
      if (it.userId != route.driver!!.id)
        throw IllegalStateException("Route $routeId does not belongs to user ${it.login}")
    }
    return routeJoinRequestsRepo.findAllByRouteId(routeId).map { it.toView() }
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

  @PostMapping("reject/{requestId}")
  fun rejectRequest(@RequestAttribute requestId: Long) =
    asAuthUser() mapTo {
      val requestedRoute = getRouteRequestById(requestId)
      val route = routeRepository
        .findById(requestedRoute.routeId!!)
        .throwOnNotFound("route", requestedRoute.routeId!!)
      if (route.driver!!.id == userId) {
        requestedRoute.status = RouteJoinRequest.Status.REJECTED
      } else {
        throw IllegalAccessException("You can't reject not your route's join requests")
      }
    }

  @PostMapping("cancel/{requestId}")
  fun cancelRequest(@RequestAttribute requestId: Long) =
    asAuthUser() mapTo {
      val requestedRoute = getRouteRequestById(requestId)

      if (requestedRoute.applicantId == userId) {
        requestedRoute.status = RouteJoinRequest.Status.CANCELED
      } else {
        throw IllegalAccessException("You can't reject not your route's join requests")
      }
    }

  private fun asAuthUser() = userService.getAuthUser()

  private fun getRouteRequestById(requestId: Long) =
    routeJoinRequestsRepo
      .findById(requestId)
      .throwOnNotFound("route join request", requestId)

  private fun RouteJoinRequest.toView(): RouteJoinRequestView {
    val currentAppUser = appUserService.getCurrentAppUser()
    val requestedParts = routePartRepo.findAllById(requestedRoute).sortedBy { it.order!! }
    return RouteJoinRequestView(
      requestId = this.joinRequestId!!,
      user = currentAppUser.mapTo {
        SimpleUserView(
          id = user!!.userId!!,
          firstName = firstName!!,
          lastName = lastName!!,
          dateOfBirth = dateOfBirth!!,
          phoneNumber = phoneNumber!!,
          lastLoginDate = user!!.lastLogin!!
        )
      },
      cost = requestedParts.sumByDouble { it.cost!! },
      locations = routesResultMapper.getAllLocations(requestedParts)
    )
  }

}
