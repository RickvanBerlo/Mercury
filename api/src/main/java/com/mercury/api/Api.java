package com.mercury.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class Api {

	public static void main(String[] args) {
		SpringApplication.run(Api.class, args);
	}

}
