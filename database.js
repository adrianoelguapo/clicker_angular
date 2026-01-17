import sqlite from 'sqlite3';

/* --- Crear conexión a la base de datos --- */
const dbPath = './database.db';
const db = new sqlite.Database(dbPath);

/* --- Crear tabla puntuaciones --- */
db.serialize(() => {

    /* --- Crear tabla de puntuaciones --- */
    db.run ('CREATE TABLE IF NOT EXISTS scores (score_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, clicks INTEGER NOT NULL)')
    
});