package com.mercury.api.repository;

import com.mercury.api.model.weblink.Weblink;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeblinkRepository extends MongoRepository<Weblink, String> {

}