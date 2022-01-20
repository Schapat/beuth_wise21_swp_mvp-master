# swtpwise2021
Willkommen beim gitLab-Repository des Projektes Gamemaster Suite (GMS). Das Projekt entsteht im Rahmen des Beuth Hochschule Modul "Softwaretechnik-Projekt" im Wintersemester 2020/2021.

GMS ist eine Toolsammlung für Spielleiter von Pen and Paper Rollenspielrunden, die diese bei der Planung und Durchführung von Spieleabenden und bei der Erstellung von den dort ausgespielten Abenteuern dient. Teil der Suite sind u.a. Tools zur Erstellung und Verwaltung von Abenteuerplots/-geschichten samt ihrer Anlagen (z.B. Grafiken, Textdokumente, Nichtspielercharaktere), Kalenderfunktionen für Spielgruppen, Marktplace etc.

Einige Module wie der Storyplotter können darüber hinaus auch abseits von Pen and Paper z.B. durch Autoren oder Spieledesigner genutzt werden.

# Links

[Plattform](http://swp-mvp.benschdev.net/)

[Swagger](http://swp-docs.benschdev.net/)
 
# Installation


```console
$ mkdir swp
$ cd swp
$ git clone git@gitlab.com:edu_sebastian_bensch/beuth_wise21_swp_mvp.git
```

```console
$ npm install
```

Zum Starten des Localhost Dev Servers

```console
$ npm start
```

Zum Erstellen eines Local Build

```console
$ npm run build
```

# Deployment

```console
$ git checkout -b YOUR_FEATURE_BRANCH
```

Commit changes
```console
$ git add .
$ git commit -m "Here comes your commit message"
```

Push branch
```console
$ git push origin my-new-branch
...
...
remote: To create a merge request for docs-new-merge-request, visit:
remote:   <FOLLOW THIS LINK>
```



## Übersicht zur Verzeichnisstruktur
| Verzeichnisname | Kurzbeschreibung |
| ------ | ------ |
| [docs](docs/README.md) | Verzeichnis zur Projektdokumentation. |
| [src](src/) | Verzeichnis mit dem eigentlichen Programmcode |
| ggf. [node_modules](node_modules/) | Von Node.JS angelegtes Verzeichnis, welches die verwendeten Node.JS Module enthält auf welchen aufbauend die Software implementiert wurde. |
| [public](public/) | Verzeichnis für die Ressourcen der Suite, also Grafiken, Oberflächenbeschreibungen etc. |


## Inbetriebnahme des Prototypen
Die nachfolgende Beschreibung dient zur lokalen Testinbetriebnahme des Prototypen auf einem Desktoprechner/Laptop.

### Voraussetzungen
Auf dem Testsystem müssen folgende Voraussetzungen erfüllt sein für die Inbetriebnahme:
1. Es muss eine lokale Node.JS Installation eingerichtet sein
2. Die Quelldateien des Prototypen müssen heruntergeladen worden sein (entweder wie *git clone* oder per Download über gitLab).

### Vorgehen zur Inbetriebnahme
1. Wechsel in das Verzeichnis des Prototypen
2. Aufruf von *npm install* im Verzeichnis des Prototypen (das korrekte Verzeichnis enthält die Datei *package.json*). Der Packagemanager *npm* lädt die notwendigen Abhängigkeiten (Node.JS Module) automatisch herunter und installiert diese lokal im Prototypenverzeichnis.
3. Nach Abschluss der Installation der Abhängigkeiten kann die Anwendung via *npm run start* gestartet werden. Im Erfolgsfall startet Node.JS einen lokalen simplen Webserver für Entwickler und öffnet den Prototypen in einem neuen Browsertab.

### Hinweise
Beim Testen hat sich in einigen Fällen herausgestellt, dass die globale Installation von im Prototypen genutzte Node.JS Module eine Inbetriebnahme verhindern können. Es wird daher angeraten mit einer frischen Vanilla Node.JS Installation zu arbeiten.


## Projektteam

### Sebastian Bensch

...

### Roman Guttzeit

...

### Tim  Jaap (Webprogrammierer)
Studierender im Studiengang B.Sc. Wirtschaftsinformatik online an der Beuth Hochschule für Technik Berlin. Zuvor Studierender an der Technischen Universität Berlin in den Studiengängen B.Sc. Technische Informatik und B.Sc. Informatik.


### Dominika Pudelko

...

### Patrick Scharnow

...


## Weitere Hilfestellungen
Anbei einige Links als Hilfestellung:

### Einführungen zu Technologien

#### Markdown
- Wikipedia-Artikel zu Markdown: https://de.wikipedia.org/wiki/Markdown

#### Arbeiten mit git
- freies Buch zum Arbeiten mit git: https://git-scm.com/book/de/v2

#### React
...

#### sonst
...