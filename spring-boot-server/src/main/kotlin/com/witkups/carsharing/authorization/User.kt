package com.witkups.carsharing.authorization

import java.io.Serializable
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "users")
data class User(
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  var userId: Int? = null,

  @Enumerated(EnumType.STRING)
  @ElementCollection(targetClass = UserRole::class)
  @Column(name = "role", nullable = false)
  @CollectionTable(name = "user_roles")
  val roles: Collection<UserRole> = setOf(),

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
