package com.witkups.carsharing.authorization

import org.hibernate.annotations.CreationTimestamp
import java.io.Serializable
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "users")
data class User(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id")
  var userId: Long? = null,

  @ManyToMany(cascade = [(CascadeType.ALL)])
  @JoinTable(
    name = "user_role",
    joinColumns = [(JoinColumn(name = "user_id"))],
    inverseJoinColumns = [(JoinColumn(name = "role_id"))]
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
  var status: UserStatus = UserStatus.OFFLINE,

  @NotNull
  var lastLogin: LocalDateTime? = null,
  @CreationTimestamp
  var registered: LocalDateTime? = LocalDateTime.now()
): Serializable
