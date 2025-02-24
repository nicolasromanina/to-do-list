package com.dashboard.To_Do_List.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Document(collection = "tasks")
@Data
public class Task {
    @Id
    private String id;
    
    @NotBlank(message = "Le titre est obligatoire")
    private String title;
    
    private String description;
    private LocalDate dueDate;
    private String status = "À faire";
}