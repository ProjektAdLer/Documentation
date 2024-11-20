# 3D Asset Creation Code Einbindung

Dieser Artikel beschreibt den Workflow zur 3D Asset Einbindung in den Code und soll als Leitfaden und Cheatsheet für 3D Modellierer dienen, die Modelle in die AdLerEngine einbauen möchten.

## Standardprinzip der Einbindung von 3D Modellen

1. Einpflegen des Modells ins Repo
2. Im Domain Ordner die passende "types.ts" Datei suchen und einen Typ festlegen
3. Im Domain Ordner die passende "Lookup" Datei suchen und den Typ mit einem String verknüpfen
4. Modell in der Datei verknüpfen, in der die tatsächlichen Informationen verknüpft werden (Bsp. Räumliche Dimensionen festlegen, Models laden)

### Einpflegen der Modelle ins Repo

Modelle müssen an die korrekte Stelle in der Ordnerstruktur des Repos abgelegt werden.

**src/assets/3dmodels/"passendesTheme"/"ggfPassenderOrdner"**

## Ausnahmen
Wenn ein Modell nur an einer Stelle im Code genutzt wird, wird dieses direkt in der "View" Datei per ``import`` eingepflegt (Bsp. 3D Icons in LearningSpaceView.ts)