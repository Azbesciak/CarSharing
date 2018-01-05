package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.application.RoutePart
import javax.persistence.*


@Entity
@Table(name = "route_join_requests")
data class RouteJoinRequest(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  var joinRequestId: Long? = null,

  @JoinColumn(name = "applicant_id", referencedColumnName = "user_id",
    updatable = false, table = "application_users",
    foreignKey = ForeignKey(name = "FK_RouteJoinRequests_ApplicantId"))
  var applicantId: Long? = null,

  @JoinColumn(name = "route_id", referencedColumnName = "route_id", table = "routes",
    foreignKey = ForeignKey(name = "FK_RouteJoinRequests_RouteId"))
  var routeId: Long? = null,

  @ManyToMany(targetEntity = RoutePart::class)
  @JoinTable(name = "requested_route_parts",
    foreignKey = ForeignKey(name = "FK_RequestedRouteParts_Request"),
    inverseForeignKey = ForeignKey(name = "FK_RequestedRouteParts_RoutePart"),
    joinColumns = [(JoinColumn(name = "join_request_id", table = "route_join_requests"))],
    inverseJoinColumns = [(JoinColumn(name = "route_part_id", table = "route_parts"))])
  var requestedRoute: MutableSet<Long> = mutableSetOf(),

  var status: Status = Status.AWAITING

) {
  enum class Status {
    AWAITING, ACCEPTED, CANCELED, REJECTED
  }
}

