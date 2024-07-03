# H5P herunterladen

## Definition:

Das Backend muss in der Lage sein, Dateien aus dem H5P-Format zum Download bereitzustellen.

## Beschreibung
Ein H5P-Element ist eine ZIP-Datei, die eine HTML-Datei, CSS-Dateien, JavaScript-Dateien und Medien-Dateien enthält.
Diese müssen einzeln herunterladbar sein.

## Akzeptanzkriterien:
- Jedes Unterelement eines H5P-Elements kann separat heruntergeladen werden.


## Aktivitätsdiagramm
```mermaid
stateDiagram-v2
    [*] --> CheckFilePath
    CheckFilePath --> ContainsH5P: filePath contains ".h5p/"
    CheckFilePath --> InvokeNextMiddleware: filePath doesn't contain ".h5p/"
    ContainsH5P --> ExtractPaths: Extract pathToZipFile and pathInsideZipFile
    ExtractPaths --> OpenZipFile: Open ZIP file
    OpenZipFile --> SearchFile: Iterate through ZIP entries
    SearchFile --> FileFound: File found
    SearchFile --> FileNotFound: File not found
    FileFound --> SetContentType: Set actual content type
    SetContentType --> SendFileContent: Send file content
    SendFileContent --> [*]
    FileNotFound --> Set404Status: Set 404 status code
    Set404Status --> [*]
    InvokeNextMiddleware --> [*]
```