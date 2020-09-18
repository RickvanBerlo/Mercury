package com.mercury.api.model.preferences;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Image {

    private String name;
    private String base64;

    public Image() {
        this.name = "No image selected";
        this.base64 = "";
    }

    public Image(String name, String base64) {
        this.name = name;
        this.base64 = base64;
    }
}
