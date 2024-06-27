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

#### Aktivitätsdiagramm
![](image-AuthoringTool-Buildprozess.png)

#### Dependencies
Um unsere Applikation als Electron-App zu bauen, verwenden wir das [ElectronNET.CLI](https://www.nuget.org/packages/ElectronNET.CLI/)
Paket, welches mittels 
```Shell
dotnet tool install --global ElectronNET.CLI --version 23.6.2
```
installiert werden kann. Zusätzlich muss [npm installiert werden](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm),
da die electronize Applikation `npm` und `npx` benötigt um die Electron-App zu bauen.

Bevor das Autorentool gebaut werden kann, muss zusätzlich einmalig die Node.js Abhängigkeiten installiert werden. 
Hierfür muss im `AuthoringTool` Ordner folgendes Kommando ausgeführt werden:
```Shell
npm install && npm run tailwind-build
```

#### Konfigurationsdateien
Vor Build muss der Versionsstring in der Electron-Manifestdatei `AuthoringTool/electron.manifest.json` angepasst werden:
```json
{
  "build": {
    "buildVersion": "X.Y.Z"
  }
}
```


#### Build Commands
Nach dem Build sind die Artefakte im Ordner `AuthoringTool/bin/Desktop_Publish` vorhanden.

Ausführung im `AuthoringTool` Ordner:
##### Windows
```Shell
dotnet electronize build /target win
```
##### Linux
```Shell
dotnet electronize build /target linux
```
##### MacOS (Universal)
```Shell
dotnet electronize build /target osx
```
> Dieses Kommando baut die Applikation standardmäßig für die Intel-Prozessorarchitektur, d.h. die Applikation läuft 
> sowohl auf Intel Macs als auch auf Apple Silicon Geräten (M1, M2, M3, ...),
> dort dann unter Rosetta-Übersetzung mit entsprechenden Performance-Implikationen.
{style='note'}
##### MacOS (Apple Silicon)
```Shell
dotnet electronize build /target custom "osx-arm64;macos" /electron-arch arm64
```
> Dieses Kommando baut die Applikation spezifisch für die Apple Silicon Architektur (arm64). Das erzeugte Binary ist daher
> **nur** auf Apple Silicon Macs ausführbar.
{style='warning'}

> Standardmäßig erlaubt Gatekeeper die Ausführung von heruntergeladenen Apple Silicon Binaries nur, wenn diese mit einem
> validen Apple Developer ID Certificate signiert sind 
> (mehr Infos siehe [hier](https://www.electronjs.org/docs/latest/tutorial/code-signing), 
> [hier](https://www.electron.build/code-signing.html#how-to-export-certificate-on-macos) und
> [hier](https://discussions.apple.com/thread/253714860?sortBy=best)).
> Dies lässt sich umgehen, in dem man die Applikation nach dem Installieren von der .DMG File manuell aus der Quarantäne nimmt: 
> `sudo xattr -d com.apple.quarantine /Applications/AuthoringTool.app`
{style='warning'}

### Applikationsarchitektur
![](image-AuthoringTool_architecture.png)

Das Autorentool selbst besteht aus einer klassischen Schichtenarchitektur mit Dependency-Inversion zwischen den DataAccess
und BusinessLogic Schichten. Dies wurde erreicht, indem das API-Interface `IDataAccess` in dem Projekt BusinessLogic 
definiert ist und die Dependencies zur Laufzeit im Projekt AuthoringTool mittels Dependency Injection (IoC) zusammengesteckt
werden. 

Das Projekt ElectronWrapper stellt mockbare Interfaces und Wrapperklassen für unsere 3rd-Party-Dependency 
Electron.NET zur Verfügung, welche wir für gewisse OS-Operationen und die Electron-Fenster betreffende Operationen 
benötigen.

Für jedes Projekt (außer ElectronWrapper) gibt es zusätzlich ein Testprojekt, welche auf diesem Diagramm aus Gründen
der Übersichtlichkeit nicht eingezeichnet sind.