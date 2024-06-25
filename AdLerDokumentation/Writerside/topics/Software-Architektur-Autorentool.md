# Software Architektur

## Überblick

Bei dem Autorentool der AdLer Systems handelt es sich um eine Desktopapplikation, welche als 
[ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-8.0) Web-App
entwickelt und mittels [Electron.NET](https://github.com/ElectronNET/Electron.NET) als 
[Electron-Desktopapplikation](https://www.electronjs.org/) gebaut wird.

Unsere Webapplikation operiert daher unter der Annahme, dass nur jemals ein User sie verwendet und dass die Applikation
lokal auf dem Rechner des Benutzers ausgeführt wird.

### Deploymentstruktur
![](image-AuthoringTool-Electron-Applikationsstruktur.png)

Das Autorentool wird als eine gebündelte Electron-App ausgeliefert. Bei Start dieser führt ein Node.js Server eine 
von [Electron.NET vorbereitete main.js](https://github.com/ElectronNET/Electron.NET/blob/main/src/ElectronNET.Host/main.js)
aus, welche nach Setup unsere vorkompilierte .NET Webapp via `dotnet run` Aufruf startet. Unsere App startet dann intern
einen Blazor-Webserver, welche auf HTTP-Requests antwortet und unsere Seiten ausliefert. Auf die Startseite dieses
Servers wird dann der in Electron integrierte Chromium-Browser von dem main.js gelenkt, welcher die Seite anzeigt.

### Buildprozess

![](image-AuthoringTool-Buildprozess.png)

TODO: Beschreibung folgt

### Applikationsarchitektur
![](image-AuthoringTool_architecture.png)

Das Autorentool selbst besteht aus einer klassischen Schichtenarchitektur mit Dependency-Inversion zwischen den DataAccess
und BusinessLogic Schichten. Dies wurde erreicht, indem das API-Interface `IDataAccess` in dem Projekt BusinessLogic 
definiert ist und die Dependencies zur Laufzeit im Projekt AuthoringTool mittels Dependency Injection (IoC) zusammengesteckt
werden. Das Projekt ElectronWrapper stellt mockbare Interfaces und Wrapperklassen für unsere 3rd-Party-Dependency 
Electron.NET zur Verfügung, welche wir für gewisse OS-Operationen und die Electron-Fenster betreffende Operationen 
benötigen.

Für jedes Projekt (außer ElectronWrapper) gibt es zusätzlich ein Testprojekt, welche auf diesem Diagramm aus Gründen
der Übersichtlichkeit nicht eingezeichnet sind.