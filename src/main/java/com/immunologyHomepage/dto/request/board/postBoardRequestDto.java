package com.immunologyHomepage.dto.request.board;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
public class postBoardRequestDto {
    
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull
    private List<String> boardImageList;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }
    
}
