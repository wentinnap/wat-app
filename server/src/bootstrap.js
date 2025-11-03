import { pool } from './db.js';
import bcrypt from 'bcryptjs';

export async function ensureSchema() {
  await pool.execute(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  await pool.execute(`CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    cover_url VARCHAR(500),
    is_hidden TINYINT(1) DEFAULT 0,
    published_at DATETIME,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  await pool.execute(`CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  await pool.execute(`CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT,
    booking_title VARCHAR(255),
    booking_datetime DATETIME NOT NULL,
    status ENUM('pending','confirmed','rejected','canceled') DEFAULT 'pending',
    cancel_reason VARCHAR(500),
    canceled_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  await pool.execute(`CREATE TABLE IF NOT EXISTS page_views (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    path VARCHAR(255) NOT NULL,
    viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(64),
    ua VARCHAR(255)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  const [rows] = await pool.execute('SELECT id FROM users WHERE email=?', ['admin@wat.local']);
  if (rows.length === 0) {
    const hash = await bcrypt.hash('Admin@1234', 10);
    await pool.execute(
      'INSERT INTO users (email, password_hash, full_name, role) VALUES (?,?,?,?)',
      ['admin@wat.local', hash, 'Admin', 'admin']
    );
    console.log('✅ Seeded admin: admin@wat.local / Admin@1234');
  }
}
