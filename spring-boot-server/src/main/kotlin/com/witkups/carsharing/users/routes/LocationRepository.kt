package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Location
import org.springframework.data.jpa.repository.JpaRepository

interface LocationRepository: JpaRepository<Location, String>
