import {createConnection} from 'typeorm';

/**
 * Die Datenbankverbindung wird aufgbaut
 * Die Benutzernamen, Passwort und den Namen der Datenbank werden
 * aus der .env-Datei geladen
 */
export const dbConnection = async () => {
  createConnection({
    host: 'mariadb',
    type: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['./data/Entities/*.ts'],
  }).then(() => {
    console.log('Datenbakverbindung wurde erfolgreich hergestellt');
  }).catch(() => console.log('Keine Verbinndung zur Datenbank möglich!'));
};
