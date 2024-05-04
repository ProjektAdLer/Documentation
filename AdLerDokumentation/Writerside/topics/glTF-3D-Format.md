# glTF Dateiformat
3D-Assets werden in der AdLer Engine ausschließlich über das glTF-Dateiformat 2.0 (**G**raphics **L**ibrary **T**ransmission **F**ormat, ehemals WebGL) geladen.
Die Extensions hierfür sind *.glb / .glTF*, in AdLer verwenden wir .glb.
## Kurzbeschreibung

**glTF** ist ein Open-Source, "Royalty-Free Format für die effiziente Übertragung und das Laden von 3D Szenen und Modellen in Applikationen" (Khronos Group).

| ![](imageGLTFFormat.png)  |
|---------------------------|
| *Khronos Group glTF Logo* |

Vorteile:

- Einfach zu Lesen und zu schreiben (Da JSON basiert)
- Schnell und Effizient (Perfekt für Web-basierte Anwendung)
- Industrie Standard
- Komplexe Szenen Daten (siehe unten)

glTF speichert Modelle, Material, Animationsdaten, Bones, UV-Skinning, Szenen Hierarchie und mittels Erweiterung auch simple Beleuchtung (Point Lights).

## *.glb statt *.babylon

Die AdLer 3D-Engine basiert auf der JavaScript-Bibliothek und 3D-Engine **[Babylon.js](Babylon-js-Engine.md)**. 
Diese unterstützt eine Reihe an 3D-Dateiformaten wie fbx, obj und glb. Allerdings entwickelt Babylon auch ihr eigenes Dateiformat für ihre Engine, mit der Extension **.babylon**.

Warum verwenden wir in der AdLer Engine also .glb statt .babylon?

Die Antwort hierfür beschreibt [Babylon.js](Babylon-js-Engine.md) auf seiner eigenen Website wie folgt:

| *"glTF is the preferred 3D file format for Babylon.js, though there are times where it is appropriate to use the Babylon.js file format, [...]"* <br/> *"[.babylon] can handle the most functionality out of all supported formats but is limited in that it can only be loaded in Babylon.js. [...]"*
*"It’s preferable to use the glTF file format, unless there is certain functionality that is not yet supported, such as light maps or particle systems."* |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|

Desweiteren ist der Verlässlichkeit und Effizienz von Exporting-Plug-Ins (zb. auch für Blender) des glTF-Formats durch die breitere Nutzer-Base deutlich höher.
Zwar gibt es diese Exporter auch für das .babylon-Format, jedoch sind sie meist noch in der Entwicklung oder erhalten nicht ausreichende Updates.

## Export in Blender

Es folgt eine kurze Erklärung des Exports von Assets im .glb Format durch Blender. Die Optionen hierfür sind unter "File/Export/gltf 2.0 (.glb/.gltf)" zu finden (vgl. Bild unten).

![*Export in Blender*](imageGLTFBlenderex.png)

Innerhalb des Export Menüs sind folgende Punkte zu beachten, das Bild rechts in der Tabelle zeigt die empfohlenen Einstellungen zum Export. 

| **Format**, wählbar sind glTF Binary (.glb), glTF Seperated und glTF Embedded (.glTF), beachten sie hierbei die zugehörigen Tooltips von Blender<br/>**Include**, Auswahl der zu exportierenden Objekte<br/>**Transform**, Ausrichtung der Objekte nach Achsen im 3-Dimensionalen Raum<br/>**Geometry**, Einstellungen der zu exportierenden Geometrie, auch im Hinblich auf deren Material. Hier ist unbedingt die Kompression zu beachten um die Datei-Größe in Grenzen zu halten.<br/>**Animation**, Einstellungen hinsichtlich der Animationen, der Shape Keys oder des Bone-Skinnings. | ![](imageGLTFExport.png) |
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|

