# Dokumentation zum Softwaremodul: Charakters
Charaktere sind in Pen-and-Paper-Spielen und Romanen das Salz in der Suppe. Sie sind die Akteure innerhalb einer Geschichte, erzählen diese, treibe diese voran und interagieren untereinander. In Pen and Paper Spielen werden diese durch allgemeine Attribute sowie durch ihre Attributswerte beschrieben. Unter allgemeine Attribute fallen die spielsystemübergreifende Angaben, also wie ein Charakter äußerlich wahrgenommen werden kann, welches Verhalten dieser an den Tag legt und welche Motivation seine Handlungen prägen. Die Charakterwerte hingegen sind spielsystemspezifische Angaben und beschreiben die Fähigkeiten und Fertigkeiten eines Charakters, also wie gut (oder schlecht) dieser eine Fähigkeiten bzw. Fertigkeiten beherrscht.

Technisch können die allgemeinen Attribute von Charakteren als eigene Klasse und Vorlage für die spielsystemspezifischen Charakterbögen genutzt werden. Von dieser globalen Beschreibung werden dann die systemspezifischen Beschreibungen abgeleitet (Vererbung) und um deren Wertesysteme ergänzt, um so schlussendlich den spielsystemtypischen Charakterbogen generieren zu können.



## Auswählte Spielsysteme für den Prototypen
Für den Prototyp wurde eine Auswahl bei den Spielsystemen getroffen, welche nachfolgend aufgeführt sind:
* 7te See (2. Edition)
* Call of Cthulhu (3. Edition)
* Shadowrun (5. und 6. Edition)
* Symbaroum
* The Witcher
* Warhammer Fantasy (4. Edition)

Von den gelisteten Spielsystemen werden für den Prototypen vereinzelte Attribute aus den Grundregelwerken angezeigt, um die Funktionalität zu zeigen. Diese Beispiele repräsentieren einen minimalen Ausschnitt der Charakterbögen und sind nicht vollständig. Die Aufnahme von zusätzlichen Charakterentwicklungsmöglichkeiten durch ergänzende Regelwerke können in späteren Entwicklungsstufen sukzessiv ausgebaut werden.

Als Vorlagen dienten die Charakterbögen der jeweiligen Spielsysteme, welche im Verzeichnis *docs/software/modules/characters/templates* abgelegt sind.

* [7te See](templates/7te_See.pdf)

* Call of Cthulhu 3. Edition (*Anm.: Beim Spielsystem Call of Cthulhu können Spielrunden wahlweise in unterschiedlichen Epochen gespielt werden. Um eine bessere Unterscheidbarkeit zwischen den vorhandener Charaktere eines Spielers für verschiedene Epochen zu gewährleisten sind diese optisch voneinander verschieden. Sie sind jedoch überwiegend gleich und unterscheiden sich nur vereinzelt in ihren Attributsausprägungen. Der Einfachheit halber wurde für den Prototypen dieser Umstand außen vor gelassen.*)
  * [1890er Jahre](templates/Cthulhu_now_3th_Edition.pdf)
  * [1920er Jahre](templates/Cthulhu_1920er_3th_Edition.pdf)
  * [now](templates/Cthulhu_now_3th_Edition.pdf)

* Shadowrun
  * [Shadowrun 5. Edition](templates/Shadowrun_5.pdf)
  * [Shadowrun 6. Edition](templates/Shadowrun_6.pdf)

* [Symbaroum](templates/Symbaroum.pdf)

* [The Witcher](templates/The_Witcher.pdf)

* [Warhammer Fantasy](templates/Warhammer_Fantasy_4_Edition.pdf)



## Ausblick und Weiterentwicklungsoptionen für das Modul

Das *Character* Modul soll in späteren Ausbaustufen um weitere Spielsysteme ergänzt werden. Ebenso sind eine spielsystemspezifische Logik zur Prüfung der regelwerkspezifischen Anforderungen bei der Charaktererstellung und ein darauf aufbauendes Schritt-für-Schritt-System (Wizard) geplant.

Eine weitere Erweiterungsmöglichkeit ist die Implementierung eines Editors zum leichteren Erzeugung von neuen Spielsystemen bzw. Editionen bestehender Spielsysteme für die automatische Generierung von Charakterbögen und die Möglichkeit zur Bearbeitung von bereits erfassten Spielsystemen.

Ebenfalls interessant ist die Verwaltung von Belohnungen aus Abenteuern und Stufenaufstiegen eines Charakters. Hierfür ist die Implementierung eines Tagebuchs des Charakters (Submodul *CharacterDiary*) vorgesehen, in welchem die Verknüpfung zu den bestandenen Abenteuer und die Erfassung des Abenteuerausgang sowie Auflistung der Belohnungen (Gegenstände, Aufstiegspunkte, neue Fähigkeiten und ähnliches) erfolgen soll.



## Datenstruktur des Moduls
Die Daten für die Charaktere sowie die Beschreibung der Charakterbögen werden in einer NoSQL Datenbank gespeichert. Die Datenbank wird über eine API angesprochen, dessen Dokumentation an anderer Stelle erfolgt.

## Anlegen neuer Spielsysteme oder Editionen vorhandener Spielsysteme
Um ein Spielsystem oder eine Edition bereits erfasster Spielsysteme anlegen zu können ist die Erzeugung eines neuen Datenbankeintrags notwendig. Dazu müssen die in der API Dokumentation beschriebenen Felder ausgefüllt werden.

Erklärungsbedürftig ist die Beschreibung der Attribute, in welcher die Beschreibung des Charakterbogens als JSON abgespeichert wird. Die JSON Beschreibungen enthalten Angaben zum Aufbau des Eingabeformulars, mit welchem die Werte der Charakterattribute erfasst und per Parsing in HTML transformiert werden.

Nachfolgend die BEschreibung Struktur und Beschreibung der einzelnen Felder für ein Eingabeformulare:

### Verfügbare Arten an Eingabefelder
Zur Beschreibung eines Feldes/Attributes eines Charakterbogens stehen folgende Eingabearten zur Verfügung:

#### übergreifende Schlüssel
Die übergreifenden Schlüssel sind für alle Eingabefeldarten gleich.

| Schlüssel     | mögliche Werte                                               | Pflichtfeld? | Beschreibung                                                 |
| ------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| **label**     | beliebig                                                     | Ja           | Über den Schlüssel *labe* wird die Bezeichnung des Eingabefelds gesteuert.<br /> |
| **inputtype** | check \|<br />color \|<br />combo \|<br />file \|<br />longtext \|<br />radio \|<br />text \|<br /> | Ja           | Der Schlüssel *inputtype* steuert die Art des Eingabefeldes.<br /><br />Eine Unterscheidung in Text und nur Ziffern erfolgt derzeit nicht, ist für die spätere Logikprüfung jedoch geplant. |
| **value**     | beliebig                                                     | ja           | Wird genutzt um Wertvorgaben für das Eingabefeld vorgeben zu können.<br /> |
| **required**  | true \| false                                                | nein         | Wird zur Steuerung genutzt, ob ein Eingabefeld verpflichtend befüllt werden muss oder eben nicht.<br />Die Angabe ist optional und wird beim fehlen standardmäßig so interpretiert als wenn der Wert *false* gesetzt ist.<br /> |


#### einzeiliges Textfeld (Inputtyp: text)
| Schlüssel       | mögliche Werte  | Pflichtfeld? | Beschreibung                                                 |
| --------------- | --------------- | ------------ | ------------------------------------------------------------ |
| **placeholder** | beliebiger Text | nein         | Über *placeholder* kann ein im Hintergrund des Eingabefeldes angezeigter Text hinterlegt werden.<br /> |
| **length**      | Zahl            | nein         | Legt die maximale Länge des einzugebenden Textes fest.<br /> |


#### mehrzeiliges Textfeld (Inputtyp: longtext)
| Schlüssel | mögliche Werte | Pflichtfeld? | Beschreibung |
| --------- | -------------- | ------------ | ------------ |
| **placeholdeR** | beliebiger Text | nein | Über *placeholder* kann ein im Hintergrund des Eingabefeldes angezeigter Text hinterlegt werden.<br /> |


#### Ja/Nein (vorhanden/nicht vorhanden) Feld (Inputtyp: check)
*Value* kann nur true oder false annehmen. Keine zusätzlichen Steuerungsangaben.


#### Farbauswahl (Inputtype: color)
Angabe erfolgt als Hexedezimalangabe (z.B. *#FF0000* für Rot). Im *value* wird so auch der Standardwert festgelegt. Keine weiteren Steuerungsangaben.


#### Auswahlliste (Inputtyp: combo)
Es ist nur die einfache Combobox (HTML Tag *select*) realisiert. Eine Mehrfachauswahl ist derzeit also nicht vorgesehen. Die Steuerungsangaben *value* wird nicht behandelt. Stattdessen wird die Standardvorgabewerte über die Steuerungsangaben *defaultvalue* realisiert.

| Schlüssel | mögliche Werte | Pflichtfeld? | Beschreibung |
| --------- | -------------- | ------------ | ------------ |
| **valuelist** | Liste von key-value-Paaren als Objekt | ja | Die möglichen Optionen werden jeweils als Objekt in der Liste hinterlegt und enthalten ein *key* Attribut für den anzuzeigenden Text und ein *value* Attribut für den einzigartigen Zahlenwert, der zur Kodierung der Auswahl gespeichert wird.<br />Die Zahlenwerte in *value* werden beginnend mit 0 oder 1 aufwärts gezählt. |
| **defaultvalue** | Zahl | ja | Gibt die Standardoption vor. Sollte 0 oder 1 sein. |


#### Dateien
Wird zum Abspeichern von Dateien (z.B. Bilddateien oder PDFs) genutzt. *Ist derzeit noch ohne Funktion*

| Schlüssel | mögliche Werte | Pflichtfeld? | Beschreibung |
| --------- | -------------- | ------------ | ------------ |
| **permittedvalues** | Liste mit Strings | ja | Enthält die erlaubten Dateiendungen.<br />*Prüfung findet derzeit noch nicht statt* |


#### Auswahlliste (Inputtyp: radio)
Ähnlich wie die Combobox, nur das alle Auswahlmöglichkeiten direkt angezeigt werden. Das Feld enthält nicht das Attribut **defaultvalue**!

| Schlüssel | mögliche Werte | Pflichtfeld? | Beschreibung |
| --------- | -------------- | ------------ | ------------ |
| **valuelist** | Liste von Objekten | ja | Enthält eine Liste von Objekten, welche ebenfalls die Attribute *key* für die Bezeichnung und *value* enthält.<br />*value* ist i.d.R. als Zahlenwert anzugeben, kann aber auch true oder false annehmen.<br />Soll ein Wert als Standard vorgegeben werden ist das Attribut *default* mit dem Wert *true* im Objekt anzugeben. Idealerweise sollte dieser für den Wert *true* oder 0 oder 1 festgelegt werden. |


#### Zahlenfeld (Inputtyp: number)
Spezielles Eingabefeld, welches Zahlen entgegen nimmt. Umfasst nur die übergreifenden Schlüssel *label*, *inputtype: number* und *value*.


#### Zahlenregeler (Inputtyp: range)
Schieberegler für Zahlenwerte.

| Schlüssel | mögliche Werte | Pflichtfeld? | Beschreibung |
| --------- | -------------- | ------------ | ------------ |
| **min** | Zahl | ja | Angabe legt den kleinstmöglichen Wert des Schiebereglers fest, welcher zu gleich auch der Vorgabewert ist. |
| **max** | Zahl | ja | Legt den größtmöglichen Wert des Schiebereglers fest. |
| **step** | Zahl | ja | Legt die Schritte fest, die beim verschieben des Schiebereglers vorgenommen werden. Ist der Wert z.B. 2, wird in 2er Schritten der Wert beim Verschieben des Reglers um einen Schritt erhöht oder verringert. |


### Grundstruktur in JSON
Für die Beschreibung des Charakterbogens (HTML Formulars) ist die Einhaltung der Grundstruktur in JSON notwendig.

Jeder Charakterbogen wird durch ein JSON Objekt repräsentiert. Dieses Objekt enthält derzeit ein einziges Attribut mit der Bezeichnung *sections*. Das Attribut *sections* ist eine Liste (Array) von Objekten und dient zur Strukturierung der Eingabemaske. Dadurch können zusammenhängende Eingabefelder in einzelne Abschnitte gruppiert werden.

Für spätere Entwicklungsstufen ist die Hinzunahme eines Attributes *meta* für weitere Metaangaben, welche nicht in der Datenbank direkt als Tabellenspalte hinterlegt werden sollen denkbar.

Die Grundstruktur ist derzeit:

```json
{
    "sections": [
        ...
    ]
}
```

Jeder Abschnitt enthält eine Überschrift als Bezeichnung des Abschnitts (Attribut *subheaders*) und eine Liste der Eingabefelder (Attribut *attributes*). Die Anzahl der Abschnitte ist beliebig festlegbar.

Mehrere Abschnitte würden dann beispielsweise wie folgt angelegt:

```json
{
    "sections": [
        // Abschnitt 1
        {
            "subheader": "gewünschte Überschrift Abschnitt 1",
            "attributes": [
                ...
            ]
        },
        // Abschnitt 2
        {
            "subheader": "gewünschte Überschrift Abschnitt 1",
            "attributes": [
                ...
        	]
        },
        // Abschnitt 3
        {
            "subheader": "gewünschte Überschrift Abschnitt 1",
            "attributes": [
                ...
            ]
        },
        ...
        // Abschnitt n
        {
        	"subheader": "gewünschte Überschrift Abschnitt 1",
            "attributes": [
                ...
            ]
        }
    ]
}
```

Die Beschreibung der einzelnen Eingabefelder erfolgt im jeweiligen Abschnitt als ein Objekt in der Liste *attributes*.

Die Struktur eines Objektes setzt sich aus den im Abschnitt *Verfügbare Arten an Eingabefelder* (siehe oben) beschriebenen Attributen zusammen und umfasst den klein und zusammenhängend geschriebenen Feldnamen (HTML Attribut *name*).

```json
...
"attributes": [
    // Beispiel für die Beschreibung eines Eingabefeldes (einzeiliges Textfeld)
    {
        "feldname": {
            "label": "Beschriftung des Feldes",
            "inputtype": "text",
            "placeholder": "Im Hintergrund des Eingabefeldes angezeigter Platzhalter",
            "value": "Dies ist der voreingestellte Wert des Textfeldes",
            "length": 100,
            "required": false
        }
    }
]
...
```

##### Beispiel zur Beschreibung eines Charakterbogens
```json
{
    "sections": [
        // Abschnitt Allgemeine Merkmale
        {
            "subheader": "Allgemeine Merkmale",
            "attributes": [
                "groesze": {
                	"label": "Größe des Charakters (in cm)",
                	"inputtype": "text",
                	"placeholder": "z.B. 160",
                	"length": 5,
                	"required": true
                },
        	    "geschlecht": {
        			"label": "Geschlecht",
        			"inputtype": "radio",
        			"valuelist": [
        				{
        					"key": "unbestimmt",
        					"value": 1,
        					"default": true
						},
						{
							"key": "männlich",
							"value": 2
						},
						{
							"key": "weiblich",
							"value": 3
						},
						{
							"key": "zwitter",
							"value": 4
						}
			    	]
        		}
            ]
        },
		{
            "subheader": "innere Merkmale",
            "attributes": [
                {
                    "motivation": {
                        "label": "Motivation des Charakters",
                        "inputtype": "text",
                        "placeholder": "Was treibt den Charakter an?"
                    }
                }
            ]
        }
    ]
}
```


## Anlegen von Parsingvorlagen für weitere Spielsysteme
Die Charakterbögen werden anhand von JSON Vorlagen durch das System erzeugt. Diese JSON Vorlagen enthalten die Beschreibungen der entsprechenden Felder der Charakterbögen (und bieten optional weitere Felder). Die in JSON beschriebenen Vorlagen werden in der Tabelle *gamesystem* hinterlegt und über die API angesteuert.