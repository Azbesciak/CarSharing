package com.witkups.carsharing.users.application

import org.hibernate.annotations.Check
import org.springframework.format.annotation.DateTimeFormat
import java.io.Serializable
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.Past

@Entity
@Table(name = "cars")
@Check(constraints = "year_of_production < getDate()")
data class Car(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null,

  @Column(nullable = false)
  var manufacturer: String? = null,

  @Column(nullable = false)
  var model: String? = null,

  @Column(nullable = false)
  var type: CarType? = null,

  @Column(nullable = false)
  @Min(1)
  var seatCount: Int? = null,

  @Column(nullable = false)
  @DateTimeFormat(style = "YYYY")
  @Past
  var yearOfProduction: LocalDate
): Serializable

enum class CarType {
  HATCHBACK, SEDAN, MINIBUS, MINIVAN, SUV,
  COUPE, OFF_ROAD, CABRIO, COMBI, PICKUP
}
