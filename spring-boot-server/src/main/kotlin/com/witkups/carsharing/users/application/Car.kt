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
@Check(constraints = "year_of_production <= year(getDate())")
class Car(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "car_id")
  var id: Long? = null,

  @Column(nullable = false)
  var manufacturer: String? = null,

  @Column(nullable = false)
  var model: String? = null,

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  var type: Type? = null,

  @Column(nullable = false)
  @Min(1)
  var seatCount: Int? = null,

  @Column(nullable = false, precision = 4)
  @Min(1900)
  var yearOfProduction: Int? = null,

  @Column(nullable = false)
  @Min(0)
  var fuelUsage: Double? = null,

  @Column(nullable = true)
  var description: String? = null
) : Serializable {
  enum class Type {
    HATCHBACK, SEDAN, MINIBUS, MINIVAN, SUV,
    COUPE, OFF_ROAD, CABRIO, COMBI, PICKUP
  }

  override fun toString(): String {
    return "Car(id=$id, manufacturer=$manufacturer, model=$model, type=$type, " +
      "seatCount=$seatCount, yearOfProduction=$yearOfProduction, description=$description)"
  }

  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false

    other as Car

    if (manufacturer != other.manufacturer) return false
    if (model != other.model) return false
    if (type != other.type) return false
    if (seatCount != other.seatCount) return false
    if (yearOfProduction != other.yearOfProduction) return false

    return true
  }

  override fun hashCode(): Int {
    var result = manufacturer?.hashCode() ?: 0
    result = 31 * result + (model?.hashCode() ?: 0)
    result = 31 * result + (type?.hashCode() ?: 0)
    result = 31 * result + (seatCount ?: 0)
    result = 31 * result + (yearOfProduction?.hashCode() ?: 0)
    return result
  }
}

