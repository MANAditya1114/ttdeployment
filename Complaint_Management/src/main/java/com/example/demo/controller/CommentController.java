package com.example.demo.controller;

import com.example.demo.dto.CommentRequest;
import com.example.demo.dto.CommentResponse;
import com.example.demo.entity.ComplaintComment;
import com.example.demo.repository.ComplaintCommentRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final ComplaintCommentRepository commentRepository;

    public CommentController(ComplaintCommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // ADD COMMENT
    @PostMapping("/{complaintId}")
    public CommentResponse addComment(
            @PathVariable Long complaintId,
            @RequestBody CommentRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        ComplaintComment comment = new ComplaintComment();

        comment.setComplaintId(complaintId);
        comment.setUserEmail(email);
        comment.setMessage(request.getMessage());

        ComplaintComment saved = commentRepository.save(comment);

        return new CommentResponse(
                saved.getId(),
                saved.getUserEmail(),
                saved.getMessage(),
                saved.getCreatedAt()
        );
    }

    // GET COMMENTS
    @GetMapping("/{complaintId}")
    public List<CommentResponse> getComments(@PathVariable Long complaintId) {

        return commentRepository
                .findByComplaintIdOrderByCreatedAtAsc(complaintId)
                .stream()
                .map(c -> new CommentResponse(
                        c.getId(),
                        c.getUserEmail(),
                        c.getMessage(),
                        c.getCreatedAt()))
                .collect(Collectors.toList());
    }
}