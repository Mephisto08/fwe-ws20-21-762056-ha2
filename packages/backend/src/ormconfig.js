const config = {
  type: 'mysql',
  host: 'mariadb',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['./data/Entities/*.ts'],
};

module.exports = config;
