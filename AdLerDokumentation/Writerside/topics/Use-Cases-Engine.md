# Use Cases

Alle Use Cases implementieren ein oder zwei Interfaces die ihren Typ bestimmen und ihrer Funktion entsprechende execute-Methoden definieren. Use Cases sind entweder **asynchon** oder **synchron** und können sowohl **allgemein** als auch **internal** sein. Internal Use Cases sind nur für die Verwendung innerhalb der Application Schicht (also aus anderen Use Cases heraus) gedacht.

## Verwendung der User Location
Die User Location ist ein Tuple aus IDs (Lernwelt- und Lernraum-ID). Allgemeine Use Cases sollten immer nur mit der aktuellen User Location arbeiten. Dies stellt sicher, dass immer nur Daten des vom Spielenden zuletzt betretenen Lernwelt und Lernraum bearbeitet werden. Interne Use Cases können IDs als Parameter ihrer execute-Methode erhalten, um flexiblere Funktionalitäten zu implementieren.

# Use Case Ablauf
Die beiden folgenden Diagramme zeigen die typische Ausführung eines generischen Use Cases, der aus der GUI heraus angestoßen wird. Das Klassendiagramm zeigt alle am Prozess beteiligten Klassen. Das Aktivitätsdiagramm bescheibt die vor, bei und nach der Ausführung des Use Cases durchlaufenen Schritte.

<img src="imageUseCaseClassesEngine.png" alt="Use Case Klassendiagramm" style="inline" height="490"/> <img src="imageUseCaseActivity.jpg" alt="Use Case Ablauf" style="inline" height="490"/>
