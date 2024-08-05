# Autorentool kompilieren


## Aktivitätsdiagramm
![](image-AuthoringTool-Buildprozess.png)

## Dependencies
Um unsere Applikation als Electron-App zu bauen, verwenden wir das [ElectronNET.CLI](https://www.nuget.org/packages/ElectronNET.CLI/)
Paket, welches mittels
```Shell
dotnet tool install --global ElectronNET.CLI --version 23.6.2
```
installiert werden kann. Zusätzlich muss [node installiert werden](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm),
da die electronize Applikation `npm` und `npx` benötigt um die Electron-App zu bauen.

Bevor das Autorentool gebaut werden kann, muss zusätzlich einmalig die Node.js Abhängigkeiten installiert werden.
Hierfür muss im `AuthoringTool` Ordner folgendes Kommando ausgeführt werden:
```Shell
npm install && npm run tailwind-build
```

## Konfigurationsdateien
Vor Build muss der Versionsstring in der Electron-Manifestdatei `AuthoringTool/electron.manifest.json` angepasst werden:
```json
{
  "build": {
    "buildVersion": "X.Y.Z"
  }
}
```


## Build Commands
Nach dem Build sind die Artefakte im Ordner `AuthoringTool/bin/Desktop_Publish` vorhanden.

Ausführung im `AuthoringTool` Ordner:
### Windows
```Shell
dotnet electronize build /target win
```
### Linux
```Shell
dotnet electronize build /target linux
```
### MacOS (Universal)
```Shell
dotnet electronize build /target osx
```
> Dieses Kommando baut die Applikation standardmäßig für die Intel-Prozessorarchitektur, d.h. die Applikation läuft
> sowohl auf Intel Macs als auch auf Apple Silicon Geräten (M1, M2, M3, ...),
> dort dann unter Rosetta-Übersetzung mit entsprechenden Performance-Implikationen.
{style='note'}
### MacOS (Apple Silicon)
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
