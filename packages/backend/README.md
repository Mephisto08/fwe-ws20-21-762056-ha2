# **Fortgeschrittene Webentwicklung Backend**
Dies ist das Backend für die erste Hausaufgabe in dem Fach Fortgeschrittene Webentwicklung. Es beinhaltet einen Docker, in dem alles selbstständig abläuft. In diesem wird alles selbstständig installiert. In ihm wird ein Server für das Backend sowie eine Datenbank zur Verfügung gestellt.

**Hinweis:**  Dieses Projekt wurde unter Windows 10 Pro entwickelt. Bei Fehler auf anderen Betriebssystemen wird keine Verantwortung übernommen. Es wurde auf 5 verschiedenen Systemen (mit Windows 10 /Pro) installiert und getestet. Bei keinem System ist ein Fehler aufgetreten.

- Wie der Docker gestartet wird, kann man in dem Unterpunkt **[Setup](#setup)** nachlesen.
- Welche Routen zur Verfügung stehen, um Task, Labels und Trackings bearbeiten zu können, kann man in dem Unterpunkt **[Routen](#routen)** nachlesen.

	Es gibt Routen für [Task](#task), [Label](#label), [Tracking](#tracking).
- Um Beispieldaten zu generieren kann das Kapitel **[Beispieldaten generieren](#beispieldaten-generieren)** eingesehen werden.
- In dem Unterpunkt **[Datenbank](#datenbank)**, wird beschrieben, wie man in die Datenbankanwendung gelangen kann und Datensätze abfragen kann.
- Der Unterpunkt **[Test](#test)**, beschreibt, wie man die Test ausführen kann.
- Mit welchen Mitteln der Code analysiert wird, kann man in dem Unterpunkt **[Statische Code Analyse](#statische-code-analyse)** nachvollziehen.
- Im letzten Unterpunkt **[Zusatzaufgabe](#zusatzaufgabe)**, ist der Aufbau und die Funktionalität der Zusatzaufgabe beschrieben.


## Setup
- Docker muss auf der Hardware die genutzt wird installiert sein.
	
- Es muss eine .env - Datei erstellt werden. In dieser kann das Passwort, der Benutzername, sowie der Namen der Datenbank festgelegt werden.

**Hinweis:**  Es kann die .env_example zu .env umbenannt werden. Dies reicht aus, damit der Docker korrekt starten kann.

- Der Docker-Container wird mit folgendem Befehl gestartet:

		docker-compose up

**Hinweis:**  Es kann kann mehrere Minuten dauern, bis alle notwendigen Dateien heruntergeladen sind.

## Routen
- Unter **localhost:3000/api** ist die Anwendung erreichbar.
- "*:taskId*, *:labelId*, *:trackingId*" sind Platzhalter. Diese müssen durch existierde Ids von Objekten ersetzt werden. 
- Postman wird empfohlen, um damit die Routen auszuführen und Daten hinzuzufügen.
- Alle Routen sind als POSTMAN-Collection auch unter dem Ordner [packages/backend/postmanCollection](packages/backend/postmanCollection) als JSON-File abgelegt. 

In diesen müssen lediglich die Route angepasst werden, wenn eine Id selektiert werden soll etc.

**Bsp.** http://localhost:3000/api/task/label/:taskId zu http://localhost:3000/api/task/label/1


### <ins> Task: </ins>

- *addLabelsByTaskId*
	- Fügt ein Task eine Label zu.
		- **post** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter nichts.
		- Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
		- 
				{  "labelList": [1, 2] }
- *createTask*
	- Erstellt einen Task.
		- **post** - Request
		- http://localhost:3000/api/task
		- Erwartet als Parameter nichts.
		- Erwartet im Body einen name und eine description.
		- 
				{  "name":"Task Besispiel",
				   "description":  "Beschreibung Beispiel" }
- *deleteLabelsByTaskId*
	- Löscht aus einem Task Labels heraus. Task wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
		- 
				{  "labelList": [1, 2] }
- *deleteTaskById*
	- Löscht einen Task. Task wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllLabesByTaskId*
	- Gibt alle Labels eines Task wieder. Task wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTasks*
	- Gibt alle Task zurück.
		- **get** - Request
		- http://localhost:3000/api/task
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTrackingsByTaskId*
	- Gibt alle Trackings eines Task wieder. Task wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/task/tracking/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getTaskById*
	- Gibt einen Task anhand seiner Id zurück.
		- **get** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *sendSlackAll*
	- Sendet alle Task an Slack Channel.
		- **post** - Request
		- http://localhost:3000/api/task/slack
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *sendSlackByTaskId*
	- Sendet einen Task an Slack Channel. Task wird anhand seiner Id selektiert.
		- **post** - Request
		- http://localhost:3000/api/task/slack/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *updateTaskById*
	- Updatet ein Task anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body mindesten einen der zwei Parameter: name, description
		- 
				{ "name":  "Task Test 1 Update",
				  "description":  "Beschreibung Test 1 Update" }



### <ins> Label: </ins>

- *createLabel*
	- Erstellt ein Label.
		- **post** - Request
		- http://localhost:3000/api/label
		- Erwartet als Parameter nichts.
		- Erwartet im Body einen name.
		- 
				{  "name":  "Label Test 1" }
- *deleteLabelById*
	- Löscht ein Label. Label wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllLabels*
	- Gibt alle Labels zurück.
		- **get** - Request
		- http://localhost:3000/api/label
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTasksByLabelId*
	- Gibt alle Task eines Labels wieder. Label wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/label/task/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body nichts.
		- 
				{}
- *getLabelById*
	- Gibt einen Label anhand seiner Id zurück.
		- **get** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelid.
		- Erwartet im Body nichts.
		- 
				{}
- *updateLabelById*
	- Updatet ein Label anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body name.
		- 
				{ "name":  "Label Test 1 Update" }

### <ins> Tracking: </ins>

- *createTracking*
	- Erstellt ein Tracking.
		- **post** - Request
		- http://localhost:3000/api/tracking
		- Erwartet als Parameter nichts.
		- Erwartet im Body eine description und eine taskId von einem existierenden Task.
		- 
				{  "description":  "Tracking Test 1",
				   "task":  "1" }
- *deleteTrackingById*
	- Löscht ein Tracking anhand seiner Id.
		- **delete** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTrackings*
	- Gibt alle Trackings zurück.
		- **get** - Request
		- http://localhost:3000/api/tracking
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getTrackingById*
	- Gibt ein Tracking anhand seiner Id zurück
		- **get** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body nichts.
		- 
				{}
- *updateTrackingById*
	- Updatet ein Label anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body mindesten einen der drei Parameter: description, timeStart, timeEnd
		- 
				{"description":  "Tracking Test 1 Update" }

## Beispieldaten generieren
Um Beispieldaten generieren zulassen kann folgender Befehl im Docker ausgefhrt werden.
			
			docker-compose exec backend npm run fixtures

## Datenbank
Die Daten werden in einer Datenbank gespeichert. Es wird eine mariaDB verwendet. Die Daten, die die Datenbank beinhaltet, können über die Konsole eingesehen werden.
Über den folgenden Befehl, gelangt man in die Datenbank und kann dort über SQL die Datensätze abfragen:

			docker-compose exec mariadb mysql -uexampleuser -pexamplepwd exampledb
			
Der Nutzername, das Passwort und der Namen der Datenbank sind an die .env.example angelehnt. Will man andere Zugangsdaten, muss der Befehl an diese angepasst werden.

## Test
Die Anwendung wird durch automatisierte Tests mittels jest getestet.
Um die Tests auszuführen, wird folgender Befehl in die Kommando Zeile eingegeben:
			
			docker-compose exec backend npm run test 
			
## Statische Code Analyse
Die Code der Anwendung wird mittels es-lint  überprüft. Um alle Fehler anzuzeigen, kann die Konsole angewendet werden, um alle Fehler aufzulisten.
Dies kann unter folgendem Befehl ausgeführt werden:

			docker-compose exec backend npm run lint

Jedoch ist dies eher unkomfortable. Ich empfehle daher die Benutzung von einem Vs-Code Extension ESLINT.

Die Richtlinien die bei ES-Lint eingestellt wurden, sind die aktuellen Google-Richtlinien die zur Verfügung gestellt werden. 

## Zusatzaufgabe
Die Zusatzfunktion nutzt die API von Slack. Man kann entweder einen Task anhand seiner Id an einen Channel senden oder kann alle seine Tasks an einen Slack Channel senden. Die Routen, die hier zur Verfügung stehen kann man in dem Unterpunkt [Routen Task](#task) einsehen.

Dies funktioniert über die "Eingehende Webhooks". Diese müssen aktiviert werden für den Channel für den das senden von Tasks gewollt ist. 

Wenn dies geschehen ist, erhält man für den Channel der ausgewählt wurde, eine Webadresse wie diese.
		
		https://hooks.slack.com/services/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

Diese kann man nun in die beiden Routen "*sendSlackAll*"  und "*sendSlackByTaskId*" als Zieladdresse eingeben werden. Nun kann man die Route aufrufen und es werden entweder alle oder nur eine Task entsprechend der Route, an den eingetragenen Slack Channel gesendet.
Ich habe einen Test-Slack Workspace angelegt. Für diesen funktioniert das aktuelle Projekt. 
Diesem kann an unter dem folgenden Link beitreten:

 https://join.slack.com/t/fwegruppe/shared_invite/ztjavctzv501mPFoDGYL5v_MrDH3y13A

 - In den Channel *taskall* werden alle Task gesendet. Hierfür wird die Route *sendSlackAll* verwendet.
 - In den Channel *taskbyid* wird immer nur eine Task gesendet, die mittels ihrer Id ausgewält wurde. Hierfür wird die Route *sendSlackByTaskId* verwendet.

