# **Fortgeschrittene Webentwicklung Cypress Tests**

## Setup

- Es muss Cypress auf dem ausführendem Medium installiert sein. Die Installation kann mit folgendem Befehl ausfgeführt werden:

		npx cypress install
- Danach müssen im Ordner alle notwendigen Module aus der  [package.json](packages/cypress/package.json) installiert werden. Hierführ muss man sich im Ordner der [package](packages/cypress) befinden. Um dort alle notwendigen Module zu installieren kann folgender Befehl ausgeführt werden:

		npm install
		
- Vor dem ausführen einer Test-Datei **muss**  die gesamte Anwendung leer sein. Es darf kein Task, Label, Tracking existieren.
  
- Um die Tests ausführen zu können, muss man im Ordner [packages/cypress](packages/cypress) folgendem Befehl ausführen.

		npm run cypress

## Test Dateien

Es existieren bisher drei Dateien in denen Test ausgeführt werden.

### 1.  happyPath Detail Seite

<img  src="/packages/cypress/README_pictures/happyPath_DetailPage.png"  alt="Alt-Text"  title="Übersichts Seite"  />

In dieser Datei sind alle Tests implementiert um die korrekte Funktion der Detail Seite eines Tasks zu testen.
  
### 2.  happyPath Übersichts Seite

<img  src="/packages/cypress/README_pictures/happy_path.png"  alt="Alt-Text"  title="Übersichts Seite"  />

In dieser Datei sind alle Tests implementiert um die korrekte Funktion der Übersichtsseite zu testen.

### 3.  scaryPath Übersichts Seite

<img  src="/packages/cypress/README_pictures/scaryPath.png"  alt="Alt-Text"  title="Übersichts Seite"  />

In dieser Datei sind alle Tests implementiert um mögliche falsche Eingaben der Übersichtsseite zu testen.