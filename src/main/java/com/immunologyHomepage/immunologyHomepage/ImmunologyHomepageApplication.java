package com.immunologyHomepage.immunologyHomepage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = "com.immunologyHomepage")
@EntityScan(basePackages = "com.immunologyHomepage.entity")
@EnableJpaRepositories("com.immunologyHomepage.repository")
public class ImmunologyHomepageApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImmunologyHomepageApplication.class, args);
	}

}
