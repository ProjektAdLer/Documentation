<show-structure for="chapter,procedure" depth="3"/>
# Styleguide 2D

## 3D-Lernumgebung 2D(UI) Styleguide

Dieser **Styleguide** beschreibt die in der Umsetzung der AdLer-Engine zu verwendenden Farben, Typografie, textliche Ansprache von Rezipienten und der Verwendung des Logos.

### Farben

#### Zuordnung der Farben 3D-Lernumgebung

| Name                 | HEX / RGB Code        | Beschreibung                                                           |
|----------------------|-----------------------|------------------------------------------------------------------------|
| babylonbg:           | #33334d               | Babylon Default Hintergrundfarbe                                       |
| blacktrans           | rgba(0,0,0,0.5)       | Schwarz mit 50% Transparenz zur Abdunklung der Hintergründe von Modals |
| whitetrans           | rgba(255,255,255,0.3) | Weiß mit 30% Transparenz                                               |
| adlerblue            | #a1c8e5               | Blau                                                                   |
| adlerdarkblue        | #172d4d               | Dunkelblau                                                             |
| adlergreen           | #59b347               | Grün                                                                   |
| buttonbgblue         | #e9f2fa               | Hintergrundfarbe für Buttons                                           |
| buttonpressedblue    | #ace8fc               | Hintergrundfarbe für Buttons im Zustand nachdem sie geklickt wurden    |
| adlertextgrey        | #111111               | Textfarbe                                                              |
| adlerbuttonlocked    | #b9bfc6               | Farbe zur Kennzeichnung nicht benutzbarer Buttons                      |
| adlerdeactivatedtext | #e9e9e9               | Textfarbe für Texte in nicht benutzbaren Buttons                       |
| adlerbggradientfrom  | #a1c8e5               | Startfarbe (Blau) des Hintergrundverlaufs der Menüs                    |
| adlerbggradientto    | #e2eaf2               | Zielfarbe (Hellblau) des Hintergrundverlaufs der Menüs                 |
| nodehandlecolor      | #e9d6b3               | Farbe der einzelnen Nodes in der Graphen Ansicht des Lernweltmenüs     |
| adleroceanblue       | #45a0e5               | Farbe zur Hervorhebung von Links                                       |
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

### Nutzung von SVG Icons in der AdLer-Engine
Um SVG-Dateien sicher zu nutzen, müssen diese vorher komprimiert werden.

Dabei werden unnötige Informationen aus der Datei entfernt. Dies führt zum einen dazu, dass die Datei kleiner wird, zum anderen entfernt die Komprimierung von SVG Dateien allerdings auch einige XML-Features, welche von uns nicht genutzt werden und unsere Engine zum Absturz bringen würden.

**Deshalb ist es zwingend notwendig, dass SVG Dateien vor dem Nutzen komprimiert (oder auch minified) werden.**

Dazu nutzen das Visual Studio Code Plugin <a href="https://github.com/1000ch/vscode-svgo" alt="SVGO GitHub Repo">SVGO</a>. Durchsuchen nach "SVGO" kann es als Visual Studio Code Erweiterung installiert werden.

#### Nutzung
- SVG File ins Projekt laden (src/Assets/icons)
- SVG File in Visual Studio Code öffnen
- Rechtsklick im SVG-Code
- "svgo: Format current SVG file" auswählen
- SVG speichern
  -> Das SVG sollte nun benutzbar sein und korrekt sowie ohne Fehlermeldung angezeigt werden

Zur Referenz und für zukünftige Suchen, ist hier eine Beispielhafte Fehlermeldung, welche entsteht, wenn die Komprimierung von SVG Dateien nicht durchgeführt wird:

> SyntaxError: unknown: Namespace tags are not supported by default. React's JSX doesn't support namespace tags. You can set `throwIfNamespace: false` to bypass this warning.
{.is-danger}

#### Nutzen der Icons im Code
Um die Assets im Code zu nutzen, sollen sie in den /src/Assets/ Ordner gezogen werden.
Danach können sie durch `import` in den code mit einbezogen werden:

```Typescript
import fullscreenIcon from "../../../../../Assets/icons/fullscreen-icon.svg";
// Hier wird das logo importiert

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="flex flex-col ml-0">
      <StyledButton>
        <img className="w-6 lg:w-10" src={fullscreenIcon}></img>
					// Hier kann es dann wie eine Variable genutzt werden
      </StyledButton>
    </StyledContainer>
  );
}
```
Anmerkung: Es kann sein, dass beim Importieren des Logos mittels `import` die IntelliSense-Funktion der IDE nicht funktioniert. Davon bitte nicht irritieren lassen.

### Anwendungsnavigation in AdLer

Überblick über die Navigation zwischen den einzelnen Teilen der 3D-Lernumgebung und den Menüs der Anwendung.

![Beispiel Icon "Bild"](imageStyleguide2DSoftwareSchnittstellenLernumgebung.png){width="300" thumbnail="true"}