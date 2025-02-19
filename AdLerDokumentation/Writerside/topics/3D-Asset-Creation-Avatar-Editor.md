# 3D Avatar Asset Implementation

Die Dokumentation, zu Erzeugung und Export von Assets, ist hier beschrieben: <br>
[Link zu AdLer Wiki Artikel](https://wiki.projekt-adler.eu/de/AdLerEngine/Entwicklung/AdLerEngine)

Diese Anleitung beschreibt, wie Assets in den Avatar Editor integriert werden. Es gibt zwei Hauptkategorien:

**1. 3D-Modelle** <br> 
    Schuhe 
    - Hosen
    - Oberteile
    - Accessoires
    - Kopfbedeckungen
    - Rucksäcke
    - Brillen
    - Haare
    - Bart

**2. Texturen** <br>
    Münder
    - Nasen
    - Augen
    - Augenbrauen

> **Hinweis:**  
> Im Moment wird nur die Integration von 3D Modelle beschrieben. <br> 
> Die Integration von Texturen wird zukünftig ergänzt.

---

## 1. Integration von 3D-Modellen

### Anforderungen an 3D-Modelle

- **Format:**  
  Das Modell muss im GLB-Format vorliegen.

- **Skeleton:**  
  Das Skeleton des Basis-Model-Mesh muss verknüpft sein. Alle 3D-Assets müssen exakt das gleiche Skeleton wie der Basis-Avatar verwenden. Und das Asset muss über den korrekten Anchor für die jeweiligen Kategorie mit dem Skeleton verknüpft sein.

- **Dimensionen:**  
  Das Modell muss in seinen Abmessungen passen – es sollten definierte Grenzen eingehalten werden, sodass das Asset innerhalb der erlaubten Dimensionen bleibt.

- **Materialien:**
    - **mat-primary:** Wird für Klamotten verwendet; Standardfarbe ist schwarz (laut Farbpalette links oben), außer bei Haaren (dann braun).
    - **mat-skin:** Standard-Hautfarbe, typischerweise die fünfte Farbe in der Farbpalette.

### Schritte zur Integration

1. **Eindeutige Benennung:**  
   Definieren Sie einen eindeutigen Namen für das Asset. Es gilt dabei folgendes Benennungsschema einzuhalten: <br>
    **"aa-"** + _Bezeichnung Kategorie_ + _Eindeutige individuelle Asset Bezeichnung_ <br>
    z.B. `aa-glasses-sunglass`

2. **3D-Modell importieren:**  
   Importieren Sie das 3D-Modell (GLB) in das 2D3DAdLer Repo in das Verzeichnis `"src/Assets/3dModels/sharedModels/avatar/` + jeweilige Kategorie"

3. **Thumbnail integrieren:**  
   Importieren Sie das zugehörige Thumbnail (PNG) in das 2D3DAdLer Repo in das Verzeichnis `"src/Assets/avatarEditorThumbnails` + jeweilige Kategorie". 
> **Wichtig:**  
> Das Thumbnail muss den gleichen Namen wie das GLB haben!

4. **Asset als Type hinzufügen:**  
   Legen Sie in der Datei `src/Components/Core/Domain/AvatarModels/AvatarModelTypes.ts` einen neuen Typ für das Modell in der jeweiligen Kategorie an.  <br>
   z.B. `"GlassesSunglass: "glasses-sunglass",`
   > **Wichtig:**
    > Integrieren Sie den Typ ohne die Präfix **"aa-"**

5. **Übersetzung anpassen:**  
   Ergänzen Sie in der Lokalisierungsdatei `src/localize/de/avatarEditor.json` den entsprechenden deutschen Übersetzungsnamen für den neuen Typ (z. B. `"glasses-sunglass": "Sonnenbrille",`).

6. **Überprüfung:**  
   Testen Sie in der Vorschau, ob:
    - Die Farbe des Modells und der Haut korrekt dargestellt wird und korrekt verändert werden kann 
    - Die Animationen und Positionierung stimmen.
    - Das Asset in verschiedenen Konstellationen anderes Assets korrekt angezeigt wird.

---

## 2. Integration von Texturen

*Dieser Abschnitt wird noch ergänzt.*
