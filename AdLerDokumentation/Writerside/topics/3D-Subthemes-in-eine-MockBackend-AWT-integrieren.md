# 3D Subthemes in eine MockBackend AWT integrieren

# Anleitung: Neues Subtheme im MockBackend einbauen

Diese Anleitung beschreibt, wie du ein neues Subtheme in das MockBackend integrierst und testest. Es gibt zwei Hauptmethoden:

**A) Neues Subtheme mit *einem* Grundriss testen**

Diese Methode eignet sich, um schnell einen einzelnen Raum mit dem neuen Subtheme zu überprüfen.

1.  **Datei öffnen:**
    Navigiere zu folgendem Pfad und öffne die Datei `ThemeWorldAWT.ts`:
    `src\Components\Core\Adapters\BackendAdapter\MockBackendData\ThemeWorldAWT.ts`

2.  **Raumobjekt kopieren und einfügen:**
    * Suche das Objekt des letzten Raumes im `spaces` Array (oder einem Array, das Raumobjekte enthält).
    * Kopiere dieses gesamte Objekt.
    * Füge die Kopie direkt unterhalb des Originals in das Array ein.

    Ein Beispiel für ein solches Raumobjekt könnte so aussehen (deine Struktur kann leicht variieren):

    ```typescript
    {
      spaceId: 10, // Dies ist die ID des ursprünglichen Raumes
      spaceName: "Labor Theme",
      spaceDescription: "Raumbeschreibung der kleinen Welt",
      requiredPointsToComplete: 0,
      spaceSlotContents: [
        null, 5, null, null, 2, null, null, 6, 3, null, 1, null, null,
      ],
      requiredSpacesToEnter: "9", // ID des Raumes, der vorher betreten werden muss
      spaceGoals: [
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
      ],
      spaceTemplate: "T_40X32_13L",
      spaceTemplateStyle: "CampusLabor", // Dies ist der Style des ursprünglichen Raumes
      spaceStory: {
        introStory: {
          storyTexts: [
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod sto ",
          ],
          elementModel: "a-npc-studendark-male",
          modelFacialExpression: "disappointed",
        },
        outroStory: {
          storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
          elementModel: "a-npc-studenlight-female",
          modelFacialExpression: "thumbsup",
        },
      },
    }
    ```

3.  **`spaceId` anpassen:**
    * Erhöhe im neu eingefügten Raumobjekt den Wert von `spaceId` um 1 (oder auf die nächste freie, eindeutige ID). Wenn das Original `spaceId: 10` hatte, setze es auf `spaceId: 11`.

4.  **`requiredSpacesToEnter` anpassen (optional, aber empfohlen):**
    * Passe den Wert von `requiredSpacesToEnter` im neuen Raumobjekt an. Üblicherweise wird hier die `spaceId` des *vorherigen* Raumes eingetragen. Wenn der vorherige Raum die `spaceId: 10` hatte, setze `requiredSpacesToEnter: "10"`. Wenn es der erste Raum in einer Kette ist oder keine Abhängigkeit besteht, kann dieser Wert auch leer sein (`""`) oder entsprechend deiner Logik angepasst werden. *In der Vorlage steht "+1", was sich vermutlich auf die ID des *vorherigen* Raumes bezieht, wenn man sequentiell vorgeht.*

5.  **`spaceTemplateStyle` auf das neue Subtheme setzen:**
    * Ändere im neuen Raumobjekt den Wert von `spaceTemplateStyle` auf den Namen deines neuen Subthemes. Zum Beispiel, wenn dein neues Subtheme `MeinNeuesLabor` heißt:
      `spaceTemplateStyle: "MeinNeuesLabor",`

**B) Neues Subtheme mit *allen* Grundrissen testen**

Diese Methode ist dafür gedacht, dein neues Subtheme umfassend mit verschiedenen Raum-Layouts zu testen.

1.  **Datei öffnen:**
    Navigiere zu folgendem Pfad und öffne die Datei `SubthemeWorldAWT.ts` (oder eine ähnlich benannte Datei für Subtheme-spezifische Testwelten):
    `src\Components\Core\Adapters\BackendAdapter\MockBackendData\SubthemeWorldAWT.ts`

    Diese Datei enthält wahrscheinlich bereits eine Sammlung von Räumen mit unterschiedlichen `spaceTemplate` (Grundrissen). Hier ein Auszug, wie die Struktur aussehen könnte:

    ```typescript
    [ // Array von Raumobjekten
      {
        spaceId: 21,
        spaceName: "Labor R6",
        // ... weitere Eigenschaften ...
        spaceTemplate: "R_20X20_6L", // Ein bestimmter Grundriss
        spaceTemplateStyle: "CAMPUSLABOR", // Der zu testende Style
        // ...
      },
      {
        spaceId: 22,
        spaceName: "Labor R8",
        // ... weitere Eigenschaften ...
        requiredSpacesToEnter: "21", // Hängt vom vorherigen Raum ab
        spaceTemplate: "R_20X30_8L", // Ein anderer Grundriss
        spaceTemplateStyle: "CAMPUSLABOR",
        // ...
      },
      // ... weitere Räume mit unterschiedlichen Grundrissen
    ]
    ```

2.  **Grundrisse kopieren und einfügen (falls nötig):**
    * Wenn du eine neue Testwelt für dein Subtheme erstellen möchtest, kopiere die relevanten Raumobjekte (typischerweise eine Gruppe von 5 oder mehr Räumen mit unterschiedlichen `spaceTemplate`-Werten) aus einer bestehenden Theme- oder Subtheme-Konfiguration.
    * Füge diese kopierten Raumobjekte in das Array in `SubthemeWorldAWT.ts` ein (oder in eine neue, von dir erstellte Testdatei).

3.  **`spaceId` anpassen:**
    * Passe die `spaceId` für *jeden* der neu eingefügten oder zu ändernden Räume an. Stelle sicher, dass jede `spaceId` eindeutig ist und erhöhe sie fortlaufend (z.B. wenn der letzte Raum `spaceId: 25` hatte, beginne mit `spaceId: 26`, dann `27`, usw.).
    * Denke auch daran, die `requiredSpacesToEnter` Werte entsprechend anzupassen, damit die Raumabfolge korrekt ist. Wenn Raum `27` nach Raum `26` kommen soll, muss bei Raum `27` `requiredSpacesToEnter: "26"` stehen.

4.  **`spaceTemplateStyle` auf das neue Subtheme stellen:**
    * Ändere in *jedem* der betreffenden Raumobjekte den Wert von `spaceTemplateStyle` auf den Namen deines neuen Subthemes. Zum Beispiel: `spaceTemplateStyle: "MeinNeuesLabor",`

---

**Wichtige Hinweise:**

* **Namen und Pfade:** Die genauen Dateinamen (`ThemeWorldAWT.ts`, `SubthemeWorldAWT.ts`) und Pfade können in deinem Projekt leicht abweichen. Passe sie entsprechend an.
* **Konsistenz:** Achte darauf, dass der Name deines neuen Subthemes (`spaceTemplateStyle`) exakt so geschrieben wird, wie er im System definiert ist (Groß-/Kleinschreibung beachten).
* **JSON-Syntax:** Da es sich um JavaScript/TypeScript-Objekte handelt, achte penibel auf die korrekte Syntax (Kommas, Klammern, Anführungszeichen).
* **Backup:** Es ist immer eine gute Idee, eine Sicherungskopie der Dateien zu erstellen, bevor du größere Änderungen vornimmst.
* **Placeholder-Texte:** Die "Lorem ipsum"-Texte in den Beispielen sind Platzhalter. Du solltest sie durch sinnvolle Beschreibungen und Story-Texte für deine Räume ersetzen.

Nachdem du diese Schritte durchgeführt hast, solltest du dein Projekt neu bauen/starten, um die Änderungen im MockBackend zu sehen und dein neues Subtheme testen zu können.
