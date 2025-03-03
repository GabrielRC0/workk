CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name) VALUES
('John Doe'),
('Jane Doe'),
('Mike Ross');

INSERT INTO projects (user_id, title) VALUES
(1, 'Projeto A de John'),
(1, 'Projeto B de John'),
(2, 'Projeto A de Jane'),
(2, 'Projeto B de Jane'),
(3, 'Projeto A de Mike'),
(3, 'Projeto B de Mike');

CREATE TABLE IF NOT EXISTS project_screens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    header_color VARCHAR(7),
    body_color VARCHAR(7),
    footer_color VARCHAR(7),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO project_screens (project_id, header_color, body_color, footer_color)
VALUES
(1, '#FF0000', '#FFFF00', '#00FF00'),
(2, '#0000FF', '#FFFFFF', '#000000'),
(3, '#CCCCCC', '#333333', '#FF00FF'),
(4, '#AA00AA', '#CCCFFF', '#F0F0F0'),
(5, '#123456', '#654321', '#222222'),
(6, '#990000', '#999900', '#009999');
