package com.witkups.carsharing.authorization

import java.io.Serializable
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "users")
data class User(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id")
  var userId: Long? = null,

  @ManyToMany(cascade = arrayOf(CascadeType.ALL))
  @JoinTable(
    name = "user_role",
    joinColumns = arrayOf(JoinColumn(name = "user_id")),
    inverseJoinColumns = arrayOf(JoinColumn(name = "role_id"))
  )
  val roles: Set<Role> = mutableSetOf(),

  @Column(unique = true, nullable = false)
  var login: String? = null,

  @NotNull
  var password: String? = null,

  @NotNull
  var email: String? = null,

  @NotNull
  @Enumerated(EnumType.STRING)
  var status: UserStatus = UserStatus.OFFLINE
): Serializable
