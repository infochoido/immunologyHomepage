package com.immunologyHomepage.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PutBoardRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String category;
    private List<String> boardImageList;
} 