# Software Architektur

## Überblick

Bei dem Autorentool des AdLer Systems handelt es sich um eine Desktopapplikation, welche als 
[ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-8.0) Web-App
entwickelt und mittels [ElectronSharp](https://github.com/theolivenbaum/Electron-sharp) als 
[Electron-Desktopapplikation](https://www.electronjs.org/) gebaut wird.

Die Webanwendung geht davon aus, dass nur ein Benutzer sie benutzt und dass sie auf dem Computer des Benutzers
ausgeführt wird.
### Deploymentstruktur
![](image-AuthoringTool-Electron-Applikationsstruktur.png)

Das Autorentool wird als eine gebündelte Electron-App ausgeliefert. Bei Start dieser führt ein Node.js Server eine 
von [ElectronSharp vorbereitete main.js](https://github.com/theolivenbaum/electron-sharp/blob/8a94e88715be7e07ae79669ecb48ff191bd528b3/ElectronSharp.Host/main.js#L4)
aus, welche nach Setup unsere vorkompilierte .NET Webapp via `dotnet run` Aufruf startet. Die Electron-App startet dann intern
einen Blazor-Webserver, welche auf HTTP-Requests antwortet und die Seiten des Autorentools ausliefert. Auf die Startseite dieses
Servers wird dann der in Electron integrierte Chromium-Browser von dem main.js gelenkt, welcher die Seite anzeigt.

### Buildprozess
siehe [](ManualAuthoringEinrichtenUndKompilieren.md)

### Applikationsarchitektur
![](image-AuthoringTool_architecture.png)

Das Autorentool selbst besteht aus einer klassischen Schichtenarchitektur mit Dependency-Inversion zwischen den DataAccess
und BusinessLogic Schichten. Dies wurde erreicht, indem das API-Interface `IDataAccess` in dem Projekt BusinessLogic 
definiert ist und die Dependencies zur Laufzeit im Projekt AuthoringTool mittels Dependency Injection (IoC) zusammengesteckt
werden. 

Das Projekt ElectronWrapper stellt mockbare Interfaces und Wrapperklassen für die 3rd-Party-Dependency 
ElectronSharp zur Verfügung, welche wir für gewisse OS-Operationen und die Electron-Fenster betreffende Operationen 
benötigen.

Für jedes Projekt (außer ElectronWrapper) gibt es zusätzlich ein Testprojekt, welche auf diesem Diagramm aus Gründen
der Übersichtlichkeit nicht eingezeichnet sind.

#### Beschreibung der Projekte

- Presentation enthält alle Views, Dialoge und sonstige UI-Komponenten, die im Autorentool verwendet werden. 
- BusinessLogic enthält alle Commands, die die Use Cases des Autorentools erfordern (z.B. Welt erstellen, ändern, löschen, ...).
- DataAccess stellt alle Funktionen zur Verfügung, die zum speichern, laden, exportieren und importieren von Lernwelten notwendig sind.
  - PersistEntities enthält die hierfür notwendigen Entity-Klassen.
- BackendAccess stellt die Anbindung zum AdLer-Backend dar.
- ElectronWrapper ist der Wrapper um die ElectronSharp Dependency.
- Shared enthält Utilities, die in mehreren Projekten Anwendung finden.
- AuthoringTool ist der Einstiegspunkt der Applikation und führt alle anderen Teile mittels ASP.NET Hosted App zusammen.