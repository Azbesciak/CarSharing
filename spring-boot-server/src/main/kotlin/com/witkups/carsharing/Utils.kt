package com.witkups.carsharing

import java.util.*


fun <T> Optional<T>.or(supplier: ()-> Optional<T>) = if (isPresent) this else supplier()

operator fun <T> T.invoke(op: T.() -> Unit): T {
  op()
  return this
}
