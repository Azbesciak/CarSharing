package com.witkups.carsharing.authorization

import javax.persistence.*

@Entity
data class Role(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "role_id")
  var id: Int? = null,

  @Column(unique = true, nullable = false)
  var role: String? = null

)
