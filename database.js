const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/* --- Crear conexión a la base de datos --- */
const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {

        console.error('Error al abrir la base de datos:', err.message);

    } else {

        console.log('Conectado a la base de datos');

    }

});

/* --- Crear tabla puntuaciones --- */
db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS scores (score_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, clicks INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {

        if (err) {

            console.error('Error al crear la tabla de puntuaciones:', err.message);

        } else {
            
            console.log('Tabla de puntuaciones lista calista');

        }

    });

});

/* --- Guardar puntuación --- */
function saveScore(name, clicks) {

    return new Promise((resolve, reject) => {

        const sql = 'INSERT INTO scores (name, clicks) VALUES (?, ?)';

        db.run(sql, [name, clicks], function(err) {

            if (err) {

                console.error('Error al gaurdar la puntuación:', err.message);
                reject(err);

            } else {

                console.log(`Puntuación guardada: ${name} - ${clicks} clicks`);
                resolve({ id: this.lastID, name, clicks });

            }

        });

    });

}

/* --- Obtener top puntuaciones --- */
function getTopScores(limit = 5) {

    return new Promise((resolve, reject) => {

        const sql = 'SELECT score_id, name, clicks, created_at FROM scores ORDER BY clicks DESC LIMIT ?';

        db.all(sql, [limit], (err, rows) => {

            if (err) {

                console.error('Error al obtener las puntuaciones:', err.message);
                reject(err);

            } else {

                console.log(`Se han obtenido ${rows.length} puntuaciones`);
                resolve(rows);

            }

        });

    });

}

/* --- Exportar funciones --- */
module.exports = {

    db,
    saveScore,
    getTopScores
    
};