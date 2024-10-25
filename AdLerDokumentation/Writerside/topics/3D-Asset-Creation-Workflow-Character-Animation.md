#    3D Asset Creation Workflow Charakter und Animation

Dieser Artikel beschreibt den Workflow zur Erstellung von Charakteren und deren Animation und soll als Leitfaden und Cheatsheet für 3D Modellierer dienen.
Der Artikel wurde auf Basis eines Online-Workshops erstellt.

Dieser ist über die AdLer-Cloud abrufbar: https://cloud.projekt-adler.eu/f/176695

## Basics Animation in Blender

![](3dWorkflowCharAnimBlenderOverview.png)

Der Reiter Animations mit geöffnetem Action Editor ist gut zum Animieren, aber liefert zu viele Infos auf einmal. Darum: Im Standardlayout die Timeline und das Dopesheet nutzen.
Alles steuert sich über Keyframes. 1 Sekunde 30 Frames, Einstellungen nur für Renderings relevant.
Keyframe setzen: Shortcut i – im 3D-Viewport öffnet sich ein Menü mit den animierbaren Eigenschaften. In der Seitenleiste kann auch direkt auf eine Eigenschaft i gedrückt werden.
Um Animation zu erstellen: Zeit A Keyframe setzten, Zeit B Objekt Eigenschaft verändern & Keyframe setzen.
Interpolation Mode im Kontextmenü des Dopesheets nutzen (Shortcut T), um Übergänge zu verändern, z.B. linear für immer gleichbleibende Geschwindigkeit. Genauere Einsicht im Graph Editor (kompliziert).
Dinge im Action Editor werden im glb gespeichert. Wird gespeichert im NLA-Strip (Non Linear Animation).

## Basics Armature in Blender

![](3dWorkflowCharAnimRig.png)

Add > Armature. Im Edit Mode kann ein Bone extrudiert werden, wenn alles fertig ist, ist es ein Rig. Jeder Bone hat einen Einflussbereich (Kugelförmig) auf das Mesh (kann über Weightpainting verändert werden). Die Bones sind aneinandergekettet und können verschoben werden.
Aufbau: Spine (Position des ganzen Objektes im Raum), Arm (bestehend aus Oberarm, Unterarm, Hand, Daumen), Kopf, Bein (Oberbein, Unterbein, Fuß). Notiz: Bones immer sinnvoll benennen!
Rig zu Mesh hinzufügen: Rig auswählen, Mesh auswählen, Rechtckslick-Kontextmenü: Parent > Armature Deform with automatic weights.

![](3dWorkflowCharAnimWeightpainting.png)

Weightpainting: Bone im Vertex Groups Menü auswählen, im 3D-Viewport auf Weightpaint wechseln und Spaß beim Fehler finden haben. Blau: Kein Einfluss, Rot voller Einfluss, Grün/Gelb dazwischen. Anmerkung: Knie sollte niemals rot sein, sonst entstehen Knicke. Falls ein Child Bone Einfluss auf einen anderen Bone ausübt, ist dieser bei Bewegung des Parent auch betroffen. Darum können vermeintlich unbeteiligte Bones auch bewegt werden > muss über Weightpainting des Verursachers behoben werden.

## Bewegungsanimationen

Am besten nach Referenz (Bildsequenz) animieren. Für realistisches Aussehen müssen sich alle Bones in irgendeiner Form bewegen, sonst sieht es künstlich aus. Für korrektes Loopen die Start/End Values anpassen. Übergänge im Action Editor zwischen Animationen/Bewegungen sind wichtig.
Die einzelnen Animationsstrips sollten für spätere Wiederfindbarkeit im Export sinnvoll benannt werden, bspw. „anim_wave“ für ein Winken. Die Namen werden im NLA-Editor vergeben; links sind die Action Namen, rechts in der Zeitleiste die Namen im jeweiligen Strip.
Normalerweise sind Animationen relativ kurz, Idle Animationen hingegen länger, sodass die Wiederholung nicht so stark auffällt. Für „Easter-Eggs“ bzw. Aktionen nach längerer Zeit am besten nicht in die Animation direkt rein-animieren, sondern aus dem Code heraus triggern.
Beim Deaktivieren von Animation im NLA-Editor, durch Abwählen der Action, wird die Bone Position nicht zurückgesetzt, obwohl die Animation nicht mehr spielt. Dazu in den Pose Modus gehen und Alt + r und Alt + g drücken, um Rotation und Position zurückzusetzen.
Notiz zum Standard-AdLer-Rig: Es werden keine Inverse-Kinematiks verwendet, alle Bones sind einzeln manuell animiert.
Notiz zum Roboter: Dieser ist mit Federn (Springs) animiert, d.h. nicht das Mesh selbst wird deformiert, sondern vielmehr die Position der Bestandteile, die sich ineinander verschieben, da die Federn auf einen speziellen Punkt zeigen.
Notiz zu Shapekeys/Morph Targets: Werden derzeit nicht verwendet. Sollten sie verwendet werden, zuerst einen Basis Key hinzufügen, dann Mesh Transformation im Edit Mode ausführen und neuen Key hinzufügen. Zwischen beiden lässt sich durch Anpassung des Value Wertes interpolieren; 1 ist neue Form, 0 ist Basis Form. Potentieller Use Case: Charakter dünner machen im Charakter Editor.

## Export

![](3dWorkflowCharAnimExportDialog.png)

-	Alles auswählen, was zu dem Charakter gehört
-	Export gltf (alle NLA-Tracks sind enthalten) mit folgenden Einstellungen:
-	Überprüfung in Babylon (sandbox.babylonjs.com), ob alle Animationstracks exportiert wurden und diese korrekt angezeigt werden

## Angepassten Charakter erstellen

Im Outliner in der Collection New Character Concept sind die passenden Elemente.
Unter dem Kopf Element können die passenden Einträge zu Frisuren, Bärte, Brillen etc. an-/abgewählt werden.
Selbiges gilt für Schuhe im entsprechend passenden Elterneintrag.
Um die Kleidungsfarbe zu ändern, wird das UV Mapping verschoben. Dazu im Edit Mode die enstprechenden Faces auswählen und im UV-Editor die Punkte auf die passende Farbe der Farbpalette verschieben.
Um das Gesicht zu ändern, werden alle Gesichtselemente ausgewählt und im UV-Editor auf die passende Stelle der Face Samples Datei verschoben. Beachte: Die Verschiebungen müssen für Babylon denselben konstanten Wert haben.
Für weitergehende Änderungen muss das Mesh selbst angepasst werden. So bspw. der Oberkörper für ein neues Kleidungsteil, welches sich nicht per Farbe/Textur erstellen lässt.
Nach der Anpassung kann wie gewohnt exportiert werden.

## Fragen im Video

-	Kaffemaschine: Für den Export werden alle Objekte mit dem Basisobjekt gejoint (ctrl + j), der Origin des Gesamtobjektes muss bei 0 liegen, am mittigen Boden des Objektes. Notiz zum joinen: Davor müssen die Modifier angewandt werden, nur die vom Parent Objekt bleiben bestehen.
-	Kombinationsassets aus der Library: Um bspw. die Maus wiederzuverwenden im Edit Mode diese mit l auswählen, separieren mit p und den Origin wieder auf das Objekt setzen, da der alte Origin vom Ursprungsobjekt übernommen wurde.
-	Räume in Blender werden nicht exportiert, diese sind nur eine Hilfe für das Modellieren. Die Räume werden in Babylon aus den Eckpunkten heraus generiert (siehe bspw. LearningSpaceTemplate_R6.ts).
-	Umgebung/Themes: Wichtig wo liegt der Ursprung. Die Sichtbarkeit aus verschiedenen Perspektiven muss immer wieder überprüft werden mit der Engine Kamera; nicht alles muss ausgestaltet werden, nur das Sichtbare. Beachte: alle Räume müssen auf die Karte passen.
-	Umgebung Animation: Alle Animationen sollten in einer Aktion sein, da nur die erste Aktion von Babylon wiederholt wird.
