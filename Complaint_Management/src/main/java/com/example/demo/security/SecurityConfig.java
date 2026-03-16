package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    // PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AUTHENTICATION MANAGER
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    // SECURITY FILTER
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

                // ENABLE CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // DISABLE CSRF
                .csrf(csrf -> csrf.disable())

                // H2 Console fix
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // JWT STATELESS SESSION
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Allow browser preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ⭐ ALLOW WEBSOCKET
                        .requestMatchers("/ws/**").permitAll()

                        // PUBLIC APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // EMAIL TEST API
                        .requestMatchers("/api/test/**").permitAll()

                        // H2 console
                        .requestMatchers("/h2-console/**").permitAll()

                        // ⭐ ALLOW ANYONE TO VIEW DEPARTMENTS (for register page dropdown)
                        .requestMatchers(HttpMethod.GET, "/api/departments/**").permitAll()

                        // ⭐ ONLY ADMIN CAN CREATE / UPDATE / DELETE DEPARTMENTS
                        .requestMatchers(HttpMethod.POST, "/api/departments/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/departments/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/departments/**").hasRole("ADMIN")

                        // ADMIN APIs
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // USER APIs
                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")

                        // EVERYTHING ELSE
                        .anyRequest().authenticated())

                // ERROR HANDLING
                .exceptionHandling(ex -> ex

                        .authenticationEntryPoint((req, res, e) -> {
                            res.setStatus(401);
                            res.setContentType("application/json");
                            res.getWriter().write("{\"error\":\"Unauthorized\"}");
                        })

                        .accessDeniedHandler((req, res, e) -> {
                            res.setStatus(403);
                            res.setContentType("application/json");
                            res.getWriter().write("{\"error\":\"Forbidden\"}");
                        }))

                // JWT FILTER
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}