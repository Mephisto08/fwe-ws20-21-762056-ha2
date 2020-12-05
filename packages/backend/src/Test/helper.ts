import * as bodyParser from 'body-parser';
import express, { Express } from 'express';
import * as path from 'path';
import { Connection, createConnection, getConnectionOptions, ObjectType } from 'typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli';
import { globalRouter } from '../data/Router/router.global';

/**
 * Diese Klasse unterstützt bei dem durchführen von Tests
 */
export class Helper {
	public app: Express | null;
	private dbConnection: Connection;

	/**
	 * Initalisiert den Helper
	 */
	public async init() {
		jest.setTimeout(10000);
		this.app = express();
		this.app.use(bodyParser.json());
		this.app.use('/api', globalRouter);
		const config = await getConnectionOptions('default');
		this.dbConnection = await createConnection(Object.assign({}, config, { database: process.env.MYSQL_DATABASE }));
	}
	/**
	 * Diese Funktion löscht alle Datebankinhalte
	 * und stellt den Grundaufbau wieder her
	 */
	public resetDatabase = async () => {
		await this.dbConnection.synchronize(true);
	};
	/**
	 * Schließt die Datenbankverbindung
	 */
	public async shutdown() {
		return this.dbConnection.close();
	}

	/**
	 * Erstellt in der Datenbank Test-Datensätze
	 */
	public async loadFixtures() {
		const loader = new Loader();
		loader.load(path.resolve('./data/Fixtures/'));

		const resolver = new Resolver();
		const fixtures = resolver.resolve(loader.fixtureConfigs);
		const builder = new Builder(this.dbConnection, new Parser());

		for (const fixture of fixturesIterator(fixtures)) {
			const entity = (await builder.build(fixture)) as any;
			await this.getRepo(entity.constructor.name).save(entity);
		}
	}

	/**
	 * Stellt ein Repository eines Entities bereit mit Hilfe der Datenbank
	 * @param {ObjectType<Entity>}target eine Klasse wird übergeben
	 * @return {Entity} Returned ein Repo mit allen Elemente von einer Klasse
	 */
	public getRepo<Entity>(target: ObjectType<Entity>) {
		return this.dbConnection.getRepository(target);
	}
}
