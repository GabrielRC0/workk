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
