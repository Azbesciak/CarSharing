package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.user.ApplicationUser
import javax.persistence.*


@Entity
@Table(name = "route_join_requests",
  uniqueConstraints = [
    UniqueConstraint(columnNames = ["route_id", "applicant_id"], name = "UK_RouteJoinRequests_RouteId_ApplicantId")
  ])
data class RouteJoinRequest(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  var joinRequestId: Long? = null,

  @JoinColumn(name = "applicant_id", referencedColumnName = "user_id",
    updatable = false, nullable = false,
    foreignKey = ForeignKey(name = "FK_RouteJoinRequests_ApplicantId"))
  @ManyToOne(fetch = FetchType.LAZY)
  var applicant: ApplicationUser? = null,

  @JoinColumn(name = "route_id", referencedColumnName = "route_id",
    updatable = false, nullable = false,
    foreignKey = ForeignKey(name = "FK_RouteJoinRequests_RouteId"))
  @ManyToOne(fetch = FetchType.LAZY)
  var route: Route? = null,

  @ManyToMany(targetEntity = RoutePart::class, fetch = FetchType.LAZY)
  @JoinTable(name = "requested_route_parts",
    foreignKey = ForeignKey(name = "FK_RequestedRouteParts_Request"),
    inverseForeignKey = ForeignKey(name = "FK_RequestedRouteParts_RoutePart"),
    joinColumns = [(JoinColumn(name = "join_request_id", table = "route_join_requests"))],
    inverseJoinColumns = [(JoinColumn(name = "route_part_id", table = "route_parts"))])
  var requestedRoute: MutableSet<RoutePart> = mutableSetOf(),

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  var status: Status? = null

) {
  enum class Status {
    AWAITING, ACCEPTED, CANCELED, REJECTED
  }
}

