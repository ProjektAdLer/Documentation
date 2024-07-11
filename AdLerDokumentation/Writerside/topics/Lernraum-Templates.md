# Lernraum Templates

## Inhalte
Im Code sind die 3D Grundrisse die vom Autoren übergeben werden als sogenanntes “[Learning Space Template](Lernraum-Template-GE.md)” abgespeichert.

Templates sind im Projektordner unter folgendem Pfad zu finden: 
src/Components/Core/Domain/LearningSpaceTemplates
Hier können bestehende Templates verändert, oder weitere Templates zugefügt werden.

Folgende Informationen werden zum Erstellen eines 3D Grundrisses im Code benötigt:

- **Name:** Der Name des Templates ist in der LearningSpaceTemplateType.ts (unter Types, zu finden neben den Templates) angegeben und wird unter LearningSpaceTemplatesLookup referenziert.\
***Beispiel:*** LearningSpaceTemplateType.L 

- **CornerPoints**: Array von Eckpunkten des Raumes in Form ihrer X-/Y-Koordinaten.\
  ***Beispiel:***
```yaml 
[ 
  { x: 4, y: -4 }, // A
  { x: -4, y: -4 }, // B
  { x: -4, y: 4 }, // C
  { x: 4, y: 4 }, // D
]
``` 

- Walls: Array von Wänden die angezeigt werden sollen, von Eckpunktindex zu Eckpunktindex.\
  ***Beispiel:***
```yaml
[
  { start: 1, end: 2 },
  { start: 2, end: 3 }
]
```
- ElementSlots: Array von Lernelement-Slots in Form ihrer X-/Y-Koordinaten, sowie die Rotation in Grad die den reingeladenen Objekten mitgegeben wird.\
  ***Beispiel:***
```yaml
[
  {
    // 1
    position: { x: -2.8, y: -2.8 },
    orientation: { rotation: 90 },
  },
  {
    // 2
    position: { x: -2.8, y: 0 },
    orientation: { rotation: 90 },
  },
]
```

- EntryDoor: Object mit Position und Rotation der Eingangstür.\
  ***Beispiel:***
```yaml
{
  position: { x: 0, y: -4 },
  orientation: { rotation: 90 },
}
```
- ExitDoor: Object mit Position und Rotation der Ausgangstür.\
  ***Beispiel:***
```yaml
{
  position: { x: 4, y: 0 },
  orientation: { rotation: 0 },
}
```
- Windows: Array von Objekten mit der Position und Rotation von Fenster.\
  ***Beispiel:***
```yaml
[
  {
    position: { x: -2, y: 4.15 },
    orientation: { rotation: 270 },
  },
  {
    position: { x: 2, y: 4.15 },
    orientation: { rotation: 270 },
  },
]
```
- PlayerSpawnPoint: Objekt mit der Startposition und Rotation des Spielcharakters.\
  ***Beispiel:***
```yaml
{
  position: { x: 0, y: -3.2 },
  orientation: { rotation: 0 },
}
```
- IntroStoryElementIdlePoint: Objekt mit der Start-und-Idle Position und Rotation des Intro Storyelements.\
  ***Beispiel:***
```yaml
{
  position: { x: 1.4, y: -3.4 },
  orientation: { rotation: 315 },
}
```
- OutroStoryElementIdlePoint: Objekt mit der Start-und-Idle Position und Rotation des Outro Storyelements.\
  ***Beispiel:***
```yaml
{
  position: { x: 1.4, y: -3.4 },
  orientation: { rotation: 315 },
}
```

## Beispiel eines Schemas zur Raumerstellung

*Notiz: Hier fehlen noch die zwingend erforderlichen Intro und Outro Storyelement Punkte. Diese können sich irgendwo im Raum befinden.*
![Beispiel eines Schemas zur Raumerstellung](imageEngineSampleTemplate.png)

## Anmerkungen

- vgl: [Lernraum Template Glossar Eintrag](Lernraum-Template-GE.md)