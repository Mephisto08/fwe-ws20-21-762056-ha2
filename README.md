# **Fortgeschrittene Webentwicklung Hausaufgabe 2**
Dies ist das Frontend für die zweite Hausaufgabe in dem Fach Fortgeschrittene Webentwicklung. Es beinhaltet einen Docker. Dieser stellt das Backend, die Datenbank und das Frontend zur Verfügung.

**Hinweis:**  Dieses Projekt wurde unter Windows 10 Pro entwickelt. Bei Fehler auf anderen Betriebssystemen wird keine Verantwortung übernommen. Es wurde auf 5 verschiedenen Systemen (mit Windows 10 /Pro) installiert und getestet. Bei keinem System ist ein Fehler aufgetreten.

- Wie der Docker gestartet wird, kann man in dem Unterpunkt **[Setup](#setup)** nachlesen.
- Im Unterpunkt **[Backend](#backend)**, kann nachgeschaut werden wo das Backend zu finden ist und die Dokumentation dazu.
- Im Unterpunkt **[Frontend](#frontend)**, kann nachgeschaut werden wo das Frontend zu finden ist und die Dokumentation dazu.
- Um Beispieldaten zu generieren kann das Kapitel **[Beispieldaten generieren](#beispieldaten-generieren)** eingesehen werden.
- In dem Unterpunkt **[Datenbank](#datenbank)**, wird beschrieben, wie man in die Datenbankanwendung gelangen kann und Datensätze abfragen kann.
- Der Unterpunkt **[Test](#test)**, beschreibt, wie man die Tests ausführen kann.

## Setup

- Docker muss auf der Hardware die genutzt wird installiert sein.
- Es muss im Backend eine .env - Datei erstellt werden. In dieser kann das Passwort, der Benutzername, sowie der Namen der Datenbank festgelegt werden.

**Hinweis:**  Es kann die .env_example zu .env umbenannt werden. Dies reicht aus, damit der Docker korrekt starten kann.

- Der Docker-Container wird mit folgendem Befehl gestartet:

		docker-compose up
		
**Hinweis:** Es kann kann mehrere Minuten dauern, bis alle notwendigen Dateien für das Backend und das Frontend heruntergeladen sind.

## Backend
Das Backend ist im Verzeichnis unter **[packages/backend/](packages/backend)** zu finden.

Eine genaue [Dokumentation des Backendes](packages/backend/README.md) kann im Unterordner **packages/backend/README.md** nachgelesen werden.

## Frontend
Das Frontend ist im Verzeichnis unter  **[packages/frontend/](packages/frontend)** zu finden.

Eine genaue [Dokumentation des Frontends](packages/frontend/README.md) kann im Unterordner **packages/frontend/README.md** nachgelesen werden. Dort wird anschaulich erklärt, welche Funktionen und Features das Frontend zu bieten hat.


## Beispieldaten generieren

Um Beispieldaten generieren zulassen kann folgender Befehl im Docker ausgefhrt werden.

	docker-compose exec backend npm run fixtures

  

## Datenbank

Die Daten werden in einer Datenbank gespeichert. Es wird eine mariaDB verwendet. Die Daten, die die Datenbank beinhaltet, können über die Konsole eingesehen werden.

Über den folgenden Befehl, gelangt man in die Datenbank und kann dort über SQL die Datensätze abfragen:

	docker-compose exec mariadb mysql -uexampleuser -pexamplepwd exampledb

Der Nutzername, das Passwort und der Namen der Datenbank sind an die .env.example angepasst. Sind andere Zugangsdaten in der .env Datei festgelegt worden, muss der Befehl an diese angepasst werden.

  

## Test

### Backend

Um die Tests für das Backend auszuführen, wird folgender Befehl in die Kommando Zeile eingegeben:

	docker-compose exec backend npm run test

### Frontend

Um die Tests für das Frontend auszuführen, wird folgender Befehl in die Kommando Zeile eingegeben:

	docker-compose exec frontend npm run test   

**Hinweis**: Da das Frontend durch die nachfolgenden Cypress-Tests auch getestet werden und die Integrations-Tests im Vergleich sehr viel aufwendiger und komplizierter sind, wurde auf die Implementierung weiterer Tests verzichtet. Es wurde ein Intgerationtest zur Erstellung implementiert als Beispiel-Test.

### Cypress
Um die Tests von [Cypress](packages/cypress) auszuführen, lesen Sie sich bitte die dort beschriebene Dokumentation durch.

