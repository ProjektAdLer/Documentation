<show-structure for="chapter,procedure" depth="3"/>
# Styleguide 3D


## 1. Guidelines und Inspirationen
![](imageStyleguideHeader.PNG)

Beim Erstellen von 3D-Assets für die AdLer-Engine sollten Sie folgende Punkte beachten:

| Guidelines                      | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                           |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Low-Poly**                    | AdLer-Assets sollten eine simplifizierte Darstellung ihrer realen Counterparts sein.<br/>Ihre Geometrie sollte einfach, ladetechnisch unaufwendig und ohne minutiöse Details funktionieren.                                                                                                                                                                                                            |
| **Vereinfachte Erkennbarkeit**  | AdLer-Assets sollten auf den ersten Blick verständlich sein. Es ist also wichtig, sich auf die wesentliche Formsprache des jeweiligen Objektes zu konzentrieren.<br/>Erkennbarkeit kann aber genauso durch gezielte Farbgebung erreicht werden.                                                                                                                                                        |
| **Bevel**                       | AdLer-Assets sollten möglichst wenig harte Ecken und Kanten haben, benutzen Sie hierfür die Bevel-Option oder den zugehörigen Modifier in Blender.                                                                                                                                                                                                                                                     |
| **Locker**                      | AdLer-Assets sollten **stilisiert**, **humorös** aber **seriös** sein.<br/> Beispiel: _"Eine Badewanne ist ein weißes, einfarbiges Objekt mit einer hellblauen Fläche darin. Die Erkennbarkeit leidet hier durch zu wenig Details. Ein Glas Wein und eine übergroße Gummiente können hier helfen. Werden sie aber zu verspielt gestaltet, gefährden Sie die Ausrichtung auf ihre Zielgruppe"_.         |
| **Schwebend**                   | AdLer-Assets sollten wo möglich auf verbindende Elemente verzichten. <br/>Beispiel: Lampe/Lampenhalterung, Blume/Blätter, Hände/Torso, etc.<br/>Dies lässt die Objekte schwebend erscheinen und bricht die Seriosität des Lernspiels auf. Es unterstützt also mehr den Spiel- als den Lernaspekt.                                                                                                      |
| **Einfache Farbe statt Textur** | AdLer-Assets sollten mit einfachen Farben anstatt von Texturen funktionieren. Benutzen sie eine einfache Farbpalette (wie weiter unten angegeben).<br/>Farben können hierbei benutzt werden um **Materialien** (Holz/hellbraun, Metall/Grau, Glas/hellblau, etc.) sowie die **Form des Objektes** durch Shading (dunklere Farbabstufungen, vgl. Falten in Stoff mit dunklerer Farbe) zu verdeutlichen. |

Beachten sie, dass diese Punkte sich manchmal auch gegenseitig ausschließen.
Hierbei sollten Sie zuerst abwägen, ob Sie die obersten Punkte "**Low-Poly**" und "**Vereinfachte Erkennbarkeit**"
immer noch erfüllen.

### Inspirationen

Inspirationen für die verschiedenen Objekte können sie Beispielsweise aus folgenden Spielen ziehen:

- Animal Crossing
- Two Point Hospital
- Rayman
- Nintendo Mii
- Zelda: Links Awakening


## 2. Farben und Texturen

Um die Anzahl und den Aufwand an Draw-Calls durch Materialien und Texturen in AdLer zu verringern haben wir uns entschieden die Assets innerhalb eines Themas auf ein Material zu begrenzen und hierfür eine einzelne Farbpalette als Textur zu verwenden.

Bisher haben wir innerhalb der AdLer 3D-Engine folgende Farbpaletten verwendet:

| ![](imageStyleguideColorPaletteUrban.jpg) | ![](imageStyleguideColorPaletteUrban-40.jpg)                                                       |
|:-----------------------------------------:|----------------------------------------------------------------------------------------------------|
|     _Standard Color-Pallette "Urban"_     | _Color-Pallette "Urban" mit -40 Saturation, <br/>zur Verwendung für bspw. die Hintergrundumgebung_ |

| ![](imageStyleguideStonePalette.png)         | ![](imageStyleguideForrestPalette.png)                                                                  |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------|
| _Beispiel für eine Farbpallette für Gestein_ | _Beispiel für eine Farbpallette für Wälder, beide Texturen können natürlich auch zusammengelegt werden_ |

Für größere Flächen, wie Wiesen oder gepflasterte Wege, sollten allerdings einfache Texturen verwendet werden, um das Flächenvolumen etwas aufzubrechen.
Folgende Texturen wurden beispielsweise in den Hintergrundwelten von AdLer verwendet:

| ![](imageStyleguideGrass.png)         | ![](imageStyleguideRoad.png)          |
|---------------------------------------|---------------------------------------|
| _Seamless-Textur für eine Grasfläche_ | _Seamless-Textur für eine Kiesfläche_ |

| ![](imageStyleguideWegMaterial.png) | ![](imageStyleguideStone.png)             |
|-------------------------------------|-------------------------------------------|
| _Seamless-Textur für Gehwege_       | _Seamless-Textur für Stein/Pflasterboden_ |

In der AdLer 3D-Umgebung wurden aufwändigere Texturen für Wände und Boden des Lernraums verwendet, um die Aufmerksamkeit des Nutzers auf den Raum zu lenken:

| ![](imageStyleguideBeispielWandTextur.jpg)         | ![](imageStyleguideBeispielBodenTextur.jpg)           |
|----------------------------------------------------|-------------------------------------------------------|
| _Mauerwerk-Textur für Lernräume des Arcade-Themes_ | _Teppichboden-Textur für Lernräume des Arcade-Themes_ |

Alle interagierbaren Elemente in der 3D-Umgebung werden über eine farbliche Umrandung hervorgehoben. Folgende Farben wurden für folgende Zustände verwendet:

| ![](imageStyleguideBeispielElementHighlightFarbenInteraktionsradiusNo.png)                                       | ![](imageStyleguideBeispielElementHighlightFarbenInteraktionsradiusYes.png)                                      |
|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| _Hervorhebung nicht abgeschlossenes Lern- oder Adaptivitätselement außerhalb des Interaktionsradius des Avatars_ | _Hervorhebung nicht abgeschlossenes Lern- oder Adaptivitätselement innerhalb des Interaktionsradius des Avatars_ |

| ![](imageStyleguideBeispielStoryelementHighlightFarbenInteraktionsradiusNo.png) | ![](imageStyleguideBeispielStoryelementHighlightFarbenInteraktionsradiusYes.png) |
|---------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| _Hervorhebung Storyelement außerhalb des Interaktionsradius des Avatars_        | _Hervorhebung Storyelement innerhalb des Interaktionsradius des Avatars_         |

| ![](imageStyleguideBeispielElementAbgeschlossenHighlightFarbenInteraktionsradiusNo.png)    | ![](imageStyleguideBeispielElementAbgeschlossenHighlightFarbenInteraktionsradiusYes.png)                   |
|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| _Hervorhebung Lern- oder Adaptivitätselement außerhalb des Interaktionsradius des Avatars_ | _Hervorhebung abgeschlossenes Lern- oder Adaptivitätselement innerhalb des Interaktionsradius des Avatars_ |
## 3. Beispielbilder

Im Folgenden Absatz sollen die oben genannten Punkte anhand von einigen Beispielbildern veranschaulicht werden.

| ![](imageStyleguideDeko.png)   | ![](imageStyleguideVideoProjector.png) | ![](imageStyleguideTrophy_1.png) |
|--------------------------------|:---------------------------------------|----------------------------------|
| _Beispiel 1, Deko Komposition_ | _Beispiel 2, Video Projektor_          | _Beispiel 3, Silber Trophäe_     |

Beispiel 1: **Vereinfachte Erkennbarkeit** und **schwebend**<br/>
Die einzelnen Elemente des Bücherregals funktionieren ohne aufwendige Geometrie und sind auf dem ersten Blick klar erkennbar. Da es sich hier um eine Deko-Komposition handelt, ist jedoch mehr Detail als eigentlich nötig hinzugefügt worden.
Das Objekt ist hier also nicht "Bücherregal", sondern "Dekoration".

Beispiel 2: **Vereinfachte Erkennbarkeit** und **locker**<br/>
Statt eines modernen Projektors wurde hier ein stilisierter, altertümlicher Video-Projektor mit Filmspulen verwendet und außerdem die Symbolik und der Look einer Dia-Projektion auf der Leinwand benutzt, um die Funktion des Lernelements "Video" klar erkennbar abzubilden.
Außerdem soll damit auf die schlechte/veraltete technische Ausstattung von Schulen humorvoll hingewiesen werden. (vgl. außerdem Tageslichtprojektor und PC-Schreibtisch des Campus-Themas)

Beispiel 3: **Einfache Farbe statt Textur**<br/>
Durch verschiedene Farbabstufungen von Blau und Grau wurden hier unterstützend zur Geometrie die Stofffalten der Tischdecke verdeutlicht.
Außerdem ist das Material der Trophäe durch einfache Farbe und Kontext klar als Metall (in diesem Fall Silber) zu erkennen.


| ![](imageStyleguideDesk1.png) | ![](imageStyleguideDesk2.png) |
|-------------------------------|-------------------------------|

In unterschiedlichen Themen können natürlich die gleichen Objekte auftauchen, diese sollten aber ebenfalls auf den ersten Blick ihrem Thema zugeordnet werden können.
Hier z.B. das Objekt "PC-Schreibtisch" des Arcade-Themas (links) und des Campus-Themas (rechts). 

| ![](imageStyleguideSlotmachine1.png) | ![](imageStyleguideSlotmachine2.png) |
|--------------------------------------|--------------------------------------|
| ![](imageStyleguideSlotmachine3.png) | ![](imageStyleguideSlotmachine4.png) |

Je nach Thema kann es sinnvoll sein, mehrere Darstellungen eines Objekts innerhalb des gleichen Themas zu verwenden. Hier zum Beispiel mehrere Darstellungen des Objekts "Arcade-Maschine" aus dem Arcade-Theme.

| ![](imageStyleguideVendingMachine1.png) | ![](imageStyleguideVendingMachine2.png) | ![](imageStyleguideVendingMachine3.png) |
|-----------------------------------------|-----------------------------------------|-----------------------------------------|

Zu guter Letzt ist es wichtig, dass die Objekte von mehreren Winkeln aus erkennbar sind, da nicht klar ist in welcher Ausrichtung sie später in der Lernwelt platziert werden.
Oben sehen sie ein negatives Beispiel für diese Regel in Form des Objektes "Verkaufs-Automat", bei welchem nicht aus jeder Perspektive die Bedeutung ersichtlich ist.

## 4. Themes
Im Projekt gibt es unterschiedliche Themes, welche eine optische Repräsentation verschiedener realer Umgebungen darstellen. Aktuell implementiert sind:

| Campus Kempten | ![](image3DStyleguideThemeCampusTheme.png)|
| Campus Aschaffenburg | Noch keine Grafik vorhanden|
| Vorstadt | ![](image3DStyleguideThemeSuburbTheme.png)|
| Spielhalle | ![](image3DStyleguideThemeArcadeTheme.png)|
|---|---|

## 5. Grundrisse
Die Lernräume in der 3D-Lernumgebung basieren auf festen Grundrissen, in welchen Lernelemente durch die Lehrenden platziert werden und Dekoelemente automatisch vom Programm platziert werden.

Folgende Grundrisse sind vorhanden:

| 6-Elemente | ![](image3DStyleguideR6Example.png)|
| 8-Elemente | ![](image3DStyleguideR8Example.png)|
| 10-Elemente | ![](image3DStyleguideLExample.png)|
| 13-Elemente | ![](image3DStyleguideTExample.png)|
| 15-Elemente | ![](image3DStyleguideDExample.png)|
|---|---|