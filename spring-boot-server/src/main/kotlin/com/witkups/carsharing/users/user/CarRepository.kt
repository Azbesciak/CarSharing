package com.witkups.carsharing.users.user

import com.witkups.carsharing.users.application.Car
import org.springframework.data.jpa.repository.JpaRepository

interface CarRepository: JpaRepository<Car, Long>
