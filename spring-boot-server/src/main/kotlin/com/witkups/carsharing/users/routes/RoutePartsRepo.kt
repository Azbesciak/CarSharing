package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.RoutePart
import org.springframework.data.jpa.repository.JpaRepository

interface RoutePartsRepo: JpaRepository<RoutePart, Long>
