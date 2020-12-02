#  **Fortgeschrittene Webentwicklung Frontend**  

Dies ist das Frontend für die zweite Hausaufgabe in dem Fach Fortgeschrittene Webentwicklung.

- Welche Funktionen und Features die Website hat wird unter **[Anwendung](#anwendung)** beschrieben.
- Um Beispieldaten zu generieren kann das Kapitel **[Beispieldaten generieren](#beispieldaten-generieren)** eingesehen werden.  
- In dem Unterpunkt **[Datenbank](#datenbank)**, wird beschrieben, wie man in die Datenbankanwendung gelangen kann und Datensätze abfragen kann.  
- Der Unterpunkt **[Test](#test)**, beschreibt, wie man die Test ausführen kann.  
  
## Anwendung
- Unter **localhost:2000** ist das Frontend erreichbar.

<img  src="/packages/frontend/readMe_pictures/TaskOverviewPage.png"  alt="Alt-Text"  title="Übersichts Seite"  />

### 1. Webadresse unter der man die Anwendung finden kann.
### 2. Filter Button
<img  src="/packages/frontend/readMe_pictures/Filter.png"  alt="Alt-Text"  title="Filter"  />

Bei einem Klick auf den Button mit dem Namen Filter, wird ein Modal-Fenster geöffnet. In diesem kann der Filter eingestellt werden, nachdem die  **[Task-Liste](#task_liste)** sortiert werden soll. Es kann nach dem Task Namen, der Task Beschreibung und nach den Labels sortiert werden. Es kann immer nur nach einem Namen, Beschreibung und einem Label gefiltert werden. Es ist jedoch möglich, eine Kombination aus den drei Filtern anzuwenden.
### 3. Erstellen eines Labels
<img  src="/packages/frontend/readMe_pictures/createLabel.png"  alt="Alt-Text"  title="Erstellen eines Labels"  />


### 4. Erstellen eines Tasks
### 5. Task-Liste
  
## Beispieldaten generieren  
  

Um Beispieldaten generieren zulassen kann folgender Befehl im Docker ausgefhrt werden.  
 docker-compose exec backend npm run fixtures  
    
## Datenbank  
  

Die Daten werden in einer Datenbank gespeichert. Es wird eine mariaDB verwendet. Die Daten, die die Datenbank beinhaltet, können über die Konsole eingesehen werden.  
  
Über den folgenden Befehl, gelangt man in die Datenbank und kann dort über SQL die Datensätze abfragen:  
 docker-compose exec mariadb mysql -uexampleuser -pexamplepwd exampledb  

Der Nutzername, das Passwort und der Namen der Datenbank sind an die .env.example angepasst. Sind andere Zugangsdaten in der .env Datei festgelegt worden, muss der Befehl an diese angepasst werden.  
  
## Test  
  
Um die Tests für das Backend auszuführen, wird folgender Befehl in die Kommando Zeile eingegeben:  
 docker-compose exec xxxxxxxxxxxx  
  

