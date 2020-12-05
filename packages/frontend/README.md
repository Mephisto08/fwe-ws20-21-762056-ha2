#  **Fortgeschrittene Webentwicklung Frontend**  

Dies ist das Frontend für die zweite Hausaufgabe in dem Fach Fortgeschrittene Webentwicklung.

**Hinweis:**  Dieses Projekt wurde unter Windows 10 Pro entwickelt. Bei Fehler auf anderen Betriebssystemen wird keine Verantwortung übernommen. Es wurde auf 5 verschiedenen Systemen (mit Windows 10 /Pro) installiert und getestet. Bei keinem System ist ein Fehler aufgetreten.

- Welche Funktionen und Features die Website hat wird unter **[Anwendung](#anwendung)** beschrieben.
	- Unter dem Unterpunkt **[Task Übersichts Seite](#task-übersichts-seite)**  ist alles zu finden, was auf der Übersichtsseite gemacht werden kann.
	- Unter dem Unterpunkt **[Task Detail Seite](#task-detail-seite)**  ist alles zu finden, was auf der Übersichtsseite gemacht werden kann.
- Um Beispieldaten zu generieren kann das Kapitel **[Beispieldaten generieren](#beispieldaten-generieren)** eingesehen werden.
- Mit welchen Mitteln der Code analysiert wird, kann man in dem Unterpunkt **[Statische Code Analyse](#statische-code-analyse)** nachvollziehen.
- In dem Unterpunkt **[Datenbank](#datenbank)**, wird beschrieben, wie man in die Datenbankanwendung gelangen kann und Datensätze abfragen kann.  
- Der Unterpunkt **[Test](#test)**, beschreibt, wie man die Test ausführen kann.  
  
## Anwendung
### <ins>Allgemein</ins>
- Unter **localhost:2000** ist das Frontend erreichbar.
- Die Dokumentation ist in deutsch verfasst. Die Benennung der Funktionen, Variablen etc. ist wie im backend auch mit englsichen Bezeichnern benannt.
-  Alle Modal Fenster können durch ein Klick auf das sich in der oberen rechten Ecke befindenden Kreuzes geschlossen werden.
- Alle Zeitangaben sind im Format **"Stunde:Minute:Sekunde"** angeben. 

###  <ins>Task Übersichts Seite</ins>

<img  src="/packages/frontend/readMe_pictures/overviewPage/TaskOverviewPage.png"  alt="Alt-Text"  title="Übersichts Seite"  />

#### 1. URL
Webadresse unter der man die Anwendung finden kann.
#### 2. Buttons

##### a ) Filter
<img  src="/packages/frontend/readMe_pictures/overviewPage/Filter.png"  alt="Alt-Text"  title="Filter"  />

Bei einem Klick auf den Button mit dem Namen **"Filter"**, wird ein Modal-Fenster geöffnet. In diesem kann der Filter eingestellt werden, nachdem die **[Task-Liste](#task_liste)** gefiltert werden soll. Es kann nach dem Task Namen, der Task Beschreibung und nach den Labels sortiert werden. Es kann immer nur nach einem Namen, Beschreibung und einem Label gefiltert werden. Es ist jedoch möglich, eine Kombination aus den drei Filtern anzuwenden.
Wenn kein Filter angewendet werden soll, müssen alle Felder leer abgeschickt werden.

##### b) Zeige Labels
<img src="/packages/frontend/readMe_pictures/detailPage/showLabels.png" alt="Alt-Text"  title="Zeige Labels"/>

Bei einem Klick auf den Button **"Zeige Labels"** werden alle existierenden Labels untereinander angezeigt.

##### c) Erstellen eines Labels
<img src="/packages/frontend/readMe_pictures/overviewPage/createLabel.png" alt="Alt-Text"  title="Erstellen eines Labels"/>

Bei einem Klick auf den Button mit dem Namen **"Erstelle Label"**, wird ein Modal-Fenster geöffnet. In diesem kann der Namen angegeben werden für das Label das erstellt werden soll. Mit Klick auf den Button **"Erstelle ein Label!"** wird das Modalfenster geschlossen und es wird ein neues Label in der Datenbank angelegt.
 
##### d) Lösche Label
<img src="/packages/frontend/readMe_pictures/overviewPage/deleteLabel.png" alt="Alt-Text"  title="Löschen eines Labels"/>

Bei einem Klick auf den Button **"Entf. Labels"** öffnet sich ein Modal-Fenster. In diesem kann die ID angeben werden, welches Label gelöscht werden soll. Wird dies bestätigt, wird das Label aus der Datenbank gelöscht und es wird von allen Tasks entfernt die dieses beinhalten.
##### e) Erstellen eines Tasks

<img src="/packages/frontend/readMe_pictures/overviewPage/CreateTask.png" alt="Alt-Text"  title="Erstellen eines Tasks"/>

Bei einem Klick auf den Button mit dem Namen **"+"**, wird ein Modal-Fenster geöffnet. In diesem ist es möglich einen neuen Task zu kreieren. In dem Modal-Fenster kann man den Namen und die Beschreibung des Tasks angeben.  Mit Klick auf den Button **"Erstelle ein Task!"** wird das Modalfenster geschlossen und es wird ein neuer Task in der Datenbank angelegt.

#### 3. Task-Liste
Liste mit allen existierenden Tasks. Sie werden in alphabetischer Reihenfolge untereinander aufgelistet.

Bei einem Klick auf die obere Hälfte eines Task, gelangt man auf die **[Task Detail Seite](#task-detail-seite)** dieses Tasks.

<img src="/packages/frontend/readMe_pictures/overviewPage/TaskElement.png" alt="Alt-Text"  title="Task Element"/>

##### 3.1 Task Namen
Gibt den Namen eines Task an.
##### 3.2 Task Beschreibung
Gibt die Beschreibung eines Task an.
##### 3.3 Labels eines Task
Gibt alle Labels an , die einem Task zugeordnet sind.
##### 3.4 Gesamte Zeitdauer eines Task
Es wird die gesamte Dauer eines Task angegeben, die  ein Task bisher gebraucht hat mit all seinen existierenden Trackings.
##### 3.5 Start Tracking
Bei Klick auf den Button **"Start Track."** wird ein Modal-Fenster geöffnet.

<img src="/packages/frontend/readMe_pictures/overviewPage/startTracking.png" alt="Alt-Text"  title="Starten eines Trackings"/>

######  3.5.1  Abbrechen
Tracking wird mit einem Klick auf den Button abgebrochen
######  3.5.2 Zeit
Zeit die das Tracking bisher gebraucht hat.
######  3.5.3 Beschreibung
Beschreibung eines Trackings. Diese Feld muss ausgefüllt sein, damit ein Tracking pausiert oder gestoppt werden soll. Da es bei diesen Operationen in der Datenbank gespeichert wird.
######  3.5.4 Pause/ Weiter
Bei Klick auf den Button, wird das Tracking pausiert. Es wird in der Datenbank gespeichert und die [Zeit](#zeit) wird auf 0 zurückgesetzt. Wenn der Button wieder betätigt wurde, läuft das Tracking weiter. Es kann nun wieder pausiert werden.  
######  3.5.5 Stopp
Bei Doppel-Klick auf den Button, wird das Tracking gespeichert und das Modal-Fenster wird geschlossen.

##### 3.6 Lösche eines Labels
Bei einem Klick auf den **Mülleimer** wird ein Task aus der Task-Liste und somit aus der Datenbank gelöscht. Mit ihm werden alle Trackings die ein Task besitzt gelöscht. Die Labels die einem Task zugeordnet sind, bleiben bestehen.
  
###  <ins>Task Detail Seite</ins>

<img src="/packages/frontend/readMe_pictures/detailPage/TaskDetailPage.png" alt="Alt-Text"  title="Starten eines Trackings"/>

#### 1. Name
Name des Tasks.
#### 2. Beschreibung
Beschreibung des Tasks.
#### 3. Labels eines Task
Gibt alle Labels an , die einem Task zugeordnet sind.
#### 4. Gesamte Zeitdauer eines Task
Es wird die gesamte Dauer eines Task angegeben, die  ein Task bisher gebraucht hat mit all seinen existierenden Trackings.
#### 5. Tracking Liste
Liste mit allen existierenden Trackings die einem Task zugeordnet sind. Sie werden in alphabetischer Reihenfolge untereinander aufgelistet.

<img src="/packages/frontend/readMe_pictures/detailPage/tracking.png" alt="Alt-Text"  title="Starten eines Trackings"/>

##### 5.1 Name
Name des Trackings
##### 5.2 Startzeitpunkt
Startzeitpunkt bei dem das Tracking begonnen hat.
##### 5.3 Endzeitpunkt
Endzeitpunkt bei dem das Tracking beendet wurde.
##### 5.4 Dauer
Zeit die ein Tracking gedauert hat.
##### 5.5 Editieren
<img src="/packages/frontend/readMe_pictures/detailPage/editTracking.png" alt="Alt-Text"  title="Starten eines Trackings"/>
Bei einem Klick auf den Button **"Editiere Tracking"** öffnet sich ein Modal-Fenster. In diesem kann man den Namen des Trackings, den Start- und Endzeitpunkt editieren.
##### 5.6 Löschen
Bei einem Klick auf den **Mülleimer** wird ein das Tracking aus der Tracking-Liste und somit aus der Datenbank gelöscht.


#### 6. Buttons
##### a)
<img src="/packages/frontend/readMe_pictures/detailPage/editTask.png" alt="Alt-Text"  title="Starten eines Trackings"/>

Bei einem Klick auf den Button **"Edit. Task"** öffnet sich ein Modal-Fenster. In diesem kann man den Namen des Tasks und dessen Beschreibung verändern.
##### b)
<img src="/packages/frontend/readMe_pictures/detailPage/showLabels.png" alt="Alt-Text"  title="Starten eines Trackings"/>

Bei einem Klick auf den Button **"Zeige Labels"** werden alle existierenden Labels untereinander angezeigt.
##### c)
<img src="/packages/frontend/readMe_pictures/detailPage/addLabel.png" alt="Alt-Text"  title="Starten eines Trackings"/>

Bei einem Klick auf den Button **"Add. Labels"** öffnet sich ein Modal-Fenster. In diesem kann man dem aktuellen Task ein oder mehrere Labels hinzufügen. Hierbei ist das Feld "Task" nicht editierbar. 

In das Feld "Labels" müssen alle Labels die einem Task hinzugefügt werden sollen in der Form:
		 **labeld, labelId, ...**
eingetragen werden.
##### d) 
<img src="/packages/frontend/readMe_pictures/detailPage/deleteLabel.png" alt="Alt-Text"  title="Starten eines Trackings"/>

Bei einem Klick auf den Button **"Lösche Labels"** öffnet sich ein Modal-Fenster. In diesem kann man vom aktuellen Task ein oder mehrere Labels entfernen. Hierbei ist das Feld "Task" nicht editierbar. 

In das Feld "Labels" müssen alle Labels eingetragen werden die von diesem Task entfernt werden sollen, in der Form:
		 **labeld, labelId, ...**
##### e)
<img src="/packages/frontend/readMe_pictures/detailPage/createTracking.png" alt="Alt-Text"  title="Starten eines Trackings"/>

Bei einem Klick auf den Button **"+"** öffnet sich ein Modal-Fenster. In diesem kann man den Namen des Trackings angeben. Mit Bestätigung von diesem, wird das Tracking in der Datenbank gespeichert und es wird dem Task hinzugefügt. Ist ist danach in der **[Tracking Liste](#tracking-liste)** wiederzufinden.
**Hinweis:** Das Tracking wird mit dem aktuellen Datum als Start- und Endzeitpunkt angelegt(Somit ist die Dauer 00:00:00). Wird es jedoch automatisiert durch Fixtures angelegt ist der "1.1.2020, 01:00:00" der Start- und Endzeitpunkt.
		
## Beispieldaten generieren  
  

Um Beispieldaten generieren zulassen kann folgender Befehl im Docker ausgefhrt werden.  

	docker-compose exec backend npm run fixtures  
    

## Statische Code Analyse
Die Code der Anwendung wird mittels es-lint  überprüft. Um alle Fehler anzuzeigen, kann die Konsole angewendet werden, um alle Fehler aufzulisten.
Dies kann unter folgendem Befehl ausgeführt werden:

	docker-compose exec backend npm run lint

Jedoch ist dies eher unkomfortable. Ich empfehle daher die Benutzung von einem Vs-Code Extension ESLINT.

Die Richtlinien die bei ES-Lint eingestellt wurden, sind die aktuellen Google-Richtlinien die zur Verfügung gestellt werden. 

## Datenbank  
  

Die Daten werden in einer Datenbank gespeichert. Es wird eine mariaDB verwendet. Die Daten, die die Datenbank beinhaltet, können über die Konsole eingesehen werden.  
  
Über den folgenden Befehl, gelangt man in die Datenbank und kann dort über SQL die Datensätze abfragen:  

	docker-compose exec mariadb mysql -uexampleuser -pexamplepwd exampledb  

Der Nutzername, das Passwort und der Namen der Datenbank sind an die .env.example angepasst. Sind andere Zugangsdaten in der .env Datei festgelegt worden, muss der Befehl an diese angepasst werden.  
  
## Test  
  
Um die Tests für das Backend auszuführen, wird folgender Befehl in die Kommando Zeile eingegeben:  

	docker-compose exec frontend npm run test   
  

