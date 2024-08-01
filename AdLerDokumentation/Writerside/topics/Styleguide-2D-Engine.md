# Styleguide 2D

## 3D-Lernumgebung 2D(UI) Styleguide

Dieser **Styleguide** beschreibt die in der Umsetzung der AdLer-Engine zu verwendenden Farben, Typografie, textliche Ansprache von Rezipienten und der Verwendung des Logos.

### Farben

#### Zuordnung der Farben 3D-Lernumgebung

| Name                 | HEX / RGB Code        | Beschreibung                                                           |
|----------------------|-----------------------|------------------------------------------------------------------------|
| babylonbg:           | #33334d               | Babylon Default Hintergrundfarbe                                       |
| blacktrans           | rgba(0,0,0,0.5)       | Schwarz mit 50% Transparenz zur Abdunklung der Hintergründe von Modals 
| whitetrans           | rgba(255,255,255,0.3) | Weiß mit 30% Transparenz                                               
| adlerblue            | #a1c8e5               | Blau                                                                   
| adlerdarkblue        | #172d4d               | Dunkelblau                                                             
| adlergreen           | #59b347               | Grün                                                                   
| buttonbgblue         | #e9f2fa               | Hintergrundfarbe für Buttons                                           
| buttonpressedblue    | #ace8fc               | Hintergrundfarbe für Buttons im Zustand nachdem sie geklickt wurden    
| adlertextgrey        | #111111               | Textfarbe                                                              
| adlerbuttonlocked    | #b9bfc6               | Farbe zur Kennzeichnung nicht benutzbarer Buttons                      
| adlerdeactivatedtext | #e9e9e9               | Textfarbe für Texte in nicht benutzbaren Buttons                       
| adlerbggradientfrom  | #a1c8e5               | Startfarbe (Blau) des Hintergrundverlaufs der Menüs                    
| adlerbggradientto    | #e2eaf2               | Zielfarbe (Hellblau) des Hintergrundverlaufs der Menüs                 
| nodehandlecolor      | #e9d6b3               | Farbe der einzelnen Nodes in der Graphen Ansicht des Lernweltmenüs     
| adleroceanblue       | #45a0e5               | Farbe zur Hervorhebung von Links                                       
| iconfillcolor        | #cfd8e5               | Icon Füllfarbe                                                         |

### Texte
#### Ansprache der Rezipienten
Das AdLer-Projekt steht für ein inklusives Miteinander aller Menschen ein. Aus diesem Grund verwenden wir in der textlichen Ansprache von Personen, eine neutrale Sprache. Aus Lehrern wird Lehrende, aus Studenten wird Studierende. Ist die Bildung eines Worts mit der Endung „-ende“ nicht möglich, so wird im zweiten Schritt geprüft, ob sich eine Ansprache mit dem Anhang „-person/en“ realisieren lässt (Bsp.: **Lehrpersonen**).

#### Art zu Schreiben
Wir stellen den Nutzer in den Mittelpunkt der Entwicklung unserer Anwendung. Auch das geschriebene Wort soll nutzerzentriert sein. Wir verwenden Sprache, die so einfach wie möglich und gleichzeitig so detailliert wie nötig ist. Kurze prägnante Sätze, optische Hervorhebungen zur Leitung der Aufmerksamkeit des Nutzers, Verwendung von Aufzählungen mit Bulletpoints oder nummerierten Aufzählungen, wo möglich.

#### Verwendung des/der Logos
Das Logo ist in seinen verschiedenen Ausführungen auf der Cloud zu finden. Nach Möglichkeit sollten zur Bildschirmdarstellung die Vektorgrafiken (.svg) bevorzugt genutzt werden, da diese unendlich skalierbar sind. Ist dies nicht möglich werden die Pixeldateien (.png) verwendet.

### Erstellung und Design von Icons

![Beispiel Icon "Bild"](imageStyleguide2DSampleIcon.png){width="200"}

Um Icons einheitlich gestalten zu können, soll sich an folgende Konventionen gehalten werden:

- Icons werden immer als ***Vektorgrafiken*** erstellt.
    - Als offene Dateien sind ***.svg*** zu bevorzugen (***.ai, erlaubt, da auch in quelloffener Software, wie Inkscape geöffnet werden kann)
    - Der Export erfolgt immer als ***.svg*** und/oder ***.png***
- Icons werden immer in der Größe **2000 px x 2000 px** angelegt
- Icons erhalten immer einen Hintergrund in der Farbe ***#e6e6e6***, ***quadratisch***, ***2000px x2000px***, mit ***80 px abgerundeten Ecken***
- Der vom Hintergrund, durch die abgerundeten Ecken, nicht abgedeckte Teil bleibt ***frei*** und wird als ***transparent*** angelegt
- Icons sollten eine Kontur (bedingt durch die Farbänderung beim Hover-Effekt in der 3D-Lernumgebung)
  - Es muss immer bedacht werden, dass beim Hover über einen Button in der 3D-Lernumgebung der Button Hintergrund die Farbe adlerdarkblue (#172d4d) annimmt
- Icon Füllfarbe: #CFD8E5
- Icon Kontur-Farbe: #172D4d
- Bevorzugte Highlight Farben
  - adleroceanblue: #45a0e5
  - nodehandlecolor: #e9d6b3
- Icon Kontur-Stärke: 30 pt
- Bei Schriften immer ***Roboto Black*** verwenden
- Die ***Form*** des Icons soll den ***verfügbaren Raum***, so gut wie möglich ***ausnutzen***
- Das Icon ***muss*** für die Verwendung in der AdLer-Engine und im Autorentool auch in ***sehr kleiner Größe*** erkennbar sein, sprich der Detailgrad sollte im Rahmen bleiben und sich auf eine einfache Erkennbarkeit konzentriert werden.