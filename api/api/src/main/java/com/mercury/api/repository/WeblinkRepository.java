package com.mercury.api.repository;

import java.util.List;

import com.mercury.api.model.weblink.Weblink;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeblinkRepository extends MongoRepository<Weblink, String> {
    public List<Weblink> findByUserId(String userId);
}