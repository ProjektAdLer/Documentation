#    3D Asset Creation Workflow und Tipps

Dieser Artikel beschreibt den Workflow zur 3D Asset Erstellung und soll als Leitfaden und Cheatsheet für 3D Modellierer dienen.

![](ImageAssetworkflowHead.png)

## Modelling
In diesem Abschnitt soll es weniger um die konkrete Umsetzung sondern mehr um nützliche Hilfestellungen zum Vorgang des 
3D Modellierens gehen. Es wird sich hierbei vorrangig auf das 3D Modelling-Tool "Blender" bezogen. Für einen Einstieg oder
genauere Tutorials konsultieren sie am besten Video-Tutorials aus dem Internet.

### Moodboards
Es empfiehlt sich vor der Asset Creation zu neuen AdLer-Themes oder Charakter Accessoires ein Moodboard zum jeweiligen Themen-Bereich
zu konsultieren oder anzufertigen.

Das Moodboard soll ihnen dann beim anschließenden Modellieren als kreative Stütze dienen und bietet ihnen die Möglichkeit ihre
Ideen und Konzepte auf einem Blick einzusehen. Dies soll ihren Workflow außerdem beschleunigen.

|         ![](ImageAssetworkflowMoodboard.PNG)         |
|------------------------------------------------------|
| _Beispiel für ein mögliches Moodboard zum Theme Labor_ |

### References
Neben der Verwendung von Moodboards empfiehlt es sich außerdem, References direkt im Programm hinzuzuziehen um die ungefähre
Form des gewünschten Assets schnell und einfach zu erreichen.

### Shortcuts Cheatsheet (Blender)

| **Shortcut**      |      **Funktion**       |
|-------------------|:-----------------------:|
| G + Achse (X,Y,Z) |          Move           |
| R + Achse (X,Y,Z) |         Rotate          |
| S + Achse (X,Y,Z) |          Scale          |
| A                 |       Select All        |
| L                 |    Select Connected     |
| Alt + Left Click  | Select Edge/Face - Loop |
| E                 |         Extrude         |
| I                 |       Insert Face       |
| Strg + R          |     Insert Edgeloop     |
| M                 |     Merge Vertices      |
| Strg + B          |   Bevel Edge/Vertices   |


## Texturing
Um die Anzahl an Draw-Calls und damit die Ladezeiten in der 3D Umgebung gering zu halten empfehlen wir bei der Erstellung
von Assets auf ein einziges Material als Textur für möglichst viele Assets zu verwenden. Vorallem einfache Farbpalletten eignen
sich hierfür hervorragend, da sie ein breites Spektrum anbieten. Beispiele finden sie in unserem 3D Styleguide unter [Farben und Texturen](http://localhost:63342/Documentation/preview/styleguide-3d-engine.html#2-farben-und-texturen).

### Image Texture
_(Blender spezifisch)_

Um eine Farbpalletten-Textur für ein 3D-Objekt anzulegen, fügen sie dem Objekt zuerst ein neues Material hinzu.
Die Eigenschaften dieses Materials können sie unter dem Reiter "Shading" am besten bearbeiten. Hier ist es auch möglich unter "Add" einen "Image Texture"-Node hinzuzufügen
und ihn mit der Farbkomponente des Standard BSDF-Shader-Nodes zu verbinden um das Bild der gewünschten Farbpallette als Textur für das Material einzubinden.

Das letztendliche Setup sollte ungefähr wie folgt aussehen:

![](ImageAssetworkflowTextureNode.PNG)


### UV-Mapping

Um die Farbpallette sinnvoll als Textur für ein Objekt zu nutzen ist es vonnöten dessen UV-Mapping anzupassen.
Um die UVs eines Meshes zu editieren, wechseln sie in den UV Editing Tab, wählen sie ihre Bildtextur aus und gehen sie im 3D Viewport in den Edit Mode.

|                                                                  ![](ImageAssetworkflowUVstart.PNG)                                                                  |
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                                   _Standard Unwrapping der UV-Map bei hinzufügen eines Materials_                                                    |
|                                                                 ![](ImageAssetworkflowUVfinish.PNG)                                                                  |
| _Gewolltes Ergebnis, verschiedene Farbbereiche werden im 3D Viewport ausgewählt und im UV-Editing Bereich auf 0 gescaled um sie zu einem einzelnen Punkt zu bringen_ |


## Export als GLB
_3D-Assets werden in der AdLer Engine ausschließlich über das glTF-Dateiformat 2.0 (Graphics Library Transmission Format, ehemals WebGL) geladen. Die Extensions hierfür sind .glb / .glTF, in AdLer verwenden wir .glb._

Eine genaue Beschreibung des Exports in Blender finden sie [hier](http://localhost:63342/Documentation/preview/gltf-3d-format.html#export-in-blender).


## Icon und Thumbnail Creation

Handelt es sich bei dem von ihnen erstellte Asset um ein im Lernraum platzierbares Objekt, ist es notwendig ein Icon oder Thumbnail
für die Repräsentation des Objektes innerhalb des AdLer Authorentools zu erstellen.
Hierfür ist es nötig ein Kamera und Licht-Setup in Blender zu erstellen sofern keines in der aktuellen Datei verfügbar ist.

![](ImageAssetworkflowIcon.png)

### Kamera

Folgende Kameraeinstellungen wurden bei den bisher erstellten Icons verwendet:
- Orthografische Kamera
- Ortografische Skalierung variiert je nach Größe des Objektes
- Rotation: (X: 55° / Y: 0° / Z: 45°)
- Seitenverhältnis 1:1, also quadratisches Bild
- Achten sie darauf das das Objekt mittig platziert ist und nichts verdeckt ist

### Licht

Beim Erstellen der Renders ist außerdem auf eine gute Auslichtung des Objektes zu achten.
Es sollte gut erkennbar sein und keine allzu harten Schlagschatten besitzen.
Hierfür eignen sich in Blender zb ein Sun-Light in Kombination mit einer Drei-Punkt-Belichtung bestehend aus drei Area Lights aus drei verschiedenen Winkeln.
Da die Thumbnails und Icons aber ohnehin in Eevee gerendert werden sollten, fällt die Ausleuchtung des Objektes nicht allzu sehr ins Gewicht und es sollte vorrangig auf die Erkennbarkeit geachtet werden.

