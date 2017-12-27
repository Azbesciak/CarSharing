package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "routes")
data class Route(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "route_id")
  var id: Long? = null,
  var description: String? = null,

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "driver_id", referencedColumnName = "user_id")
  var driver: ApplicationUser? = null,

  @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
  @JoinColumn(name = "route_snapshot_id")
  var routeSnapshots: MutableSet<RouteSnapshot> = mutableSetOf(),

  @ManyToOne(optional = true, fetch = FetchType.EAGER)
  @JoinColumn(name = "car_id", referencedColumnName = "car_id")
  var car: Car? = null
)
