//package com.witkups.carsharing.configuration
//
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.boot.autoconfigure.security.SecurityProperties
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.core.annotation.Order
//import org.springframework.http.HttpMethod
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
//import org.springframework.security.core.userdetails.UserDetailsService
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
//import org.springframework.web.servlet.config.annotation.CorsRegistry
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
//import org.springframework.security.config.annotation.web.builders.WebSecurity
//import org.springframework.security.config.http.SessionCreationPolicy
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
//
//
//
//@Configuration
//@EnableWebSecurity
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
//class SecurityConfig(
////  private val corsFilter: CorsFilter,
//  private val userDetailsService: UserDetailsService
////  private val restaut
//) : WebSecurityConfigurerAdapter() {
//
//  @Autowired
//  @Throws(Exception::class)
//  fun configAuthentication(auth: AuthenticationManagerBuilder) {
//    auth.userDetailsService(userDetailsService)
//        .passwordEncoder(passwordEncoder())
//  }
//
//  @Bean
//  fun passwordEncoder(): BCryptPasswordEncoder {
//    return BCryptPasswordEncoder()
//  }
//
//  @Bean
//  fun getBasicAuthEntryPoint(): CustomBasicAuthenticationEntryPoint {
//    return CustomBasicAuthenticationEntryPoint()
//  }
//
//  @Throws(Exception::class)
//  override fun configure(http: HttpSecurity) {
//
//    http
//      .csrf().disable()
//      .cors().disable()
//      .authorizeRequests()
//      .antMatchers("/hello").access("hasRole('ADMIN')")
//      .antMatchers("/users").authenticated()
//      .antMatchers(HttpMethod.POST, "/register").permitAll()
//      .anyRequest().authenticated()
//      .and()
//      .formLogin().loginPage("/login")
//      .usernameParameter("login").passwordParameter("password")
//      .successHandler(MySavedRequestAwareAuthenticationSuccessHandler())
//      .failureHandler(SimpleUrlAuthenticationFailureHandler())
//      .and()
//      .logout().logoutSuccessUrl("/login?logout")
//      .and()
//      .exceptionHandling()
//      .authenticationEntryPoint(RestAuthenticationEntryPoint())
//      .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//  }
//
//  @Throws(Exception::class)
//  override fun configure(web: WebSecurity?) {
//    web!!
//      .ignoring()
//      .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**")
//  }
//
//  @Bean
//  fun corsConfigurer(): WebMvcConfigurer {
//    return object : WebMvcConfigurerAdapter() {
//      override fun addCorsMappings(registry: CorsRegistry?) {
//        registry!!.addMapping("/**").allowedOrigins("*")
//      }
//    }
//  }
//
//}
