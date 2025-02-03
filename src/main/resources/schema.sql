-- User 테이블
CREATE TABLE "user" (
    nickname VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ADMIN'
);

-- Board 테이블
CREATE TABLE board (
    board_number SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    write_date_time TIMESTAMP NOT NULL,
    writer_nickname VARCHAR(255) NOT NULL REFERENCES "user"(nickname),
    category VARCHAR(50) NOT NULL,
    view_count INTEGER DEFAULT 0,
    CONSTRAINT fk_writer FOREIGN KEY (writer_nickname) REFERENCES "user"(nickname)
);

-- Image 테이블
CREATE TABLE image (
    image_id SERIAL PRIMARY KEY,
    board_number INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    CONSTRAINT fk_board FOREIGN KEY (board_number) REFERENCES board(board_number) ON DELETE CASCADE
);

-- Board List View (Materialized View)
CREATE MATERIALIZED VIEW board_list_view AS
SELECT 
    b.board_number,
    b.title,
    b.content,
    b.category,
    COALESCE(i.image_url, '') as title_image,
    b.view_count,
    b.write_date_time,
    b.writer_nickname
FROM board b
LEFT JOIN (
    SELECT DISTINCT ON (board_number) 
        board_number, 
        image_url
    FROM image
    ORDER BY board_number, image_url
) i ON b.board_number = i.board_number;



-- Indexes
CREATE INDEX idx_board_category ON board(category);
CREATE INDEX idx_board_write_datetime ON board(write_date_time);
CREATE INDEX idx_image_board_number ON image(board_number);