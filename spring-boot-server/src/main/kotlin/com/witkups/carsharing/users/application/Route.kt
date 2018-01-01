package com.witkups.carsharing.users.application

import com.witkups.carsharing.users.user.ApplicationUser
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
  @JoinColumn(name = "driver_id", referencedColumnName = "user_id", foreignKey = ForeignKey(name = "FK_ROUTES_DRIVER"))
  var driver: ApplicationUser? = null,

  @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
  @JoinColumn(name = "route_id", foreignKey = ForeignKey(name = "FK_ROUTE_PART_ROUTE"))
  var routeParts: MutableSet<RoutePart> = mutableSetOf(),

  @ManyToOne(optional = true, fetch = FetchType.EAGER)
  @JoinColumn(name = "car_id", referencedColumnName = "car_id", foreignKey = ForeignKey(name = "FK_ROUTE_CAR"))
  var car: Car? = null
)
