package com.example.instamail_backend.controller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/sse")
public class SSE_Controller {
  
        private final List<SseEmitter> emitters = new ArrayList<>();
    
        @GetMapping("/connect")
        public SseEmitter connect() {
            SseEmitter emitter = new SseEmitter(0L);             // 30 seconds timeout
    
            synchronized (emitters) {
                emitters.add(emitter);
            }
    
            emitter.onCompletion(() -> removeEmitter(emitter));
            emitter.onTimeout(() -> removeEmitter(emitter));
            emitter.onError(e -> removeEmitter(emitter));
    
            return emitter;
        }
    
        private void removeEmitter(SseEmitter emitter) {
            synchronized (emitters) {
                emitters.remove(emitter);
            }
        }
    
        public void notifyClients(String message) {
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("");
            System.out.println("Sending message: " + message);
            System.out.println("emitters: " + emitters);
            synchronized (emitters) {
                List<SseEmitter> deadEmitters = new ArrayList<>();
                for (SseEmitter emitter : emitters) {
                    try {
                        System.out.println("");
                        System.out.println("");
                        System.out.println("");
                        System.out.println("");
                        System.out.println("");
                        System.out.println("Sending message: " + message);
                        emitter.send(SseEmitter.event().name("email-sent").data(message));
                    } catch (IOException e) {
                        deadEmitters.add(emitter);
                    }
                }
                emitters.removeAll(deadEmitters); // Remove dead connections
            }
        }
}
