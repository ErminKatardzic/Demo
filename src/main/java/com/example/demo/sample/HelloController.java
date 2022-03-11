package com.example.demo.sample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/hello")
public class HelloController {

    @GetMapping("/world")
    public @ResponseBody
    HelloModel helloWorld() {
        return new HelloModel("Hello world!");
    }
}
