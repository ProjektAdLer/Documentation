# AdLer installieren

Dieser Leitfaden beschreibt die Installation und das Setup von AdLer auf einem Linux-Server.

> Da in diesem Leitfaden technische Aspekte genauer erläutert werden, ist dieser sehr ausführlich. Für einen Quick Start
> des AdLer Systems verwenden Sie unsere
> [Entwicklerumgebung](https://github.com/ProjektAdLer/AdlerDevelopmentEnvironment/tree/main/non-moodle).


> Eine Nutzung im LAN ohne Domain (nur über IP und Ports) wird von uns nicht unterstützt.
> Unsere lokale Entwicklungsumgebung kann mit Anpassungen aber eingeschränkt für dieses Scenario verwendet werden.
> Siehe hierzu die Notizen zum [Thema Hostname im Repo der Entwicklungsumgebung](https://github.com/ProjektAdLer/AdlerDevelopmentEnvironment/tree/main/non-moodle#hostname).
{style="warning"}

## Voraussetzungen

- root-Zugriff auf einen Linux Server. In diesem Guide wird ein Debian 12 Server verwendet. Die Installation auf anderen Linux-Distributionen wird in gewissen Punkten abweichen und hier nicht behandelt.
- Der Server hat eine öffentliche statische IP-Adresse.
- Docker (**nicht Docker-Desktop**) ist installiert (siehe [Docker-Installationsanleitung](https://docs.docker.com/engine/install/)).
- Es besteht Zugriff auf eine Domain, für die Subdomains erstellt werden können.

### Kenntnisse
- Grundlegende Administration eines Linux-Servers
- Docker und Docker Compose
- Grundverständnis von Netzwerkkonfiguration

> Für die Installation und den sicheren/stabilen Betrieb von AdLer sind diese Kenntnisse zwingend erforderlich.
> Diese werden im folgenden als bekannt vorausgesetzt.
{style="warning"}

## Überblick
Das gesamte Setup besteht aus zwei Docker Compose Projekten:
- [Traefik](https://traefik.io/traefik/) als [reverse-Proxy](https://www.cloudflare.com/en-gb/learning/cdn/glossary/reverse-proxy/)
- Die AdLer Umgebung

## Setup
### Vorbereitungen
- Festlegen der Domains für die drei sub-Anwendungen von AdLer und erstellen der DNS Einträge. Diese müssen Subdomains einer gemeinsamen Domain sein.
  - [API/Backend](Backend-GE.md) (hier: `api.projekt-adler.eu`)
  - Moodle (hier: `moodle.projekt-adler.eu`)
  - [Frontend](Engine-BG.md) (hier: `play.projekt-adler.eu`)

## Traefik
Traefik übernimmt die Funktion unseres Reverse-Proxy und ermöglicht es uns, dass alle AdLer-Services auf dem gleichen Server
auf Port 80 auf unterschiedlichen Domains erreichbar sind:

> Sofern Sie bereits einen anderen Reverse-Proxy eingerichtet haben können Sie diesen Konfigurationsschritt überspringen
> und Ihren Reverse Proxy separat für AdLer konfigurieren.

![Deploymentdiagramm für Traefik](https://www.plantuml.com/plantuml/png/VOynJyKm38Jt_0ehUzkX6mEgK1S6DYH651AtH4riv3f8_7jQeY1uUdgRp_hETvvsTQ8b9-CJbm2Ff2Y4QeW3mhCuNE9MnHDpI5Zd1-Stf535EB--uDkEyea2RWSxpjtlmfg4Yu8oI5pV5K8Kz1gPJ8k2hhjlIN07-ITcS1znG5eZOV_5HG9d5wdtd4r3JrljTBXijLsmzY_SIf_qSVqc-k-bWx_Qn1ep8OMIqpS0)
- Wir verwenden Traefik in einem eigenen Docker-Compose Projekt um den Reverse-Proxy und die Services, welche an diesen angeschlossen sind,
  unabhängig voneinander verwalten zu können.
- Die eigentliche Konfiguration der (Sub-)Domains ist in [.env Datei des AdLer Stacks](#adler) gegeben.

In einem Ordner `/traefik` müssen die folgenden beiden Dateien erstellt werden:

### traefik.yml
```yaml
#file: noinspection WrsCodeBlockWidthInspection
providers:
  docker:
    #nicht alle Docker Container per default erreichbar machen
    exposedByDefault: false
    network: traefik_gateway

entrypoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
          permanent: true
  websecure:
    address: :443

#diese Section regelt automatische Zertifikatvergabe 
#durch Lets Encrypt.
#sofern ein eigenes Zertifikat vorhanden ist, kann stattdessen dieses
#verwendet werden (siehe Traefik Dokumentation)
certificatesresolvers:
  le:
    acme:
      email: <EMAIL> #ersetzen
      storage: /acme/acme.json
      tlschallenge: true

accessLog: #optional
  filePath: "/accesslogs/access.log"

log:
  level: WARN

http: #optional, verhindert web scraping durch Suchmaschinen
  middlewares:
    add-robots-headers:
      headers:
        X-Robots-Tag: „noindex,nofollow,nosnippet,noarchive,notranslate,noimageindex“
  middlewaresChain:
    default:
      middlewares:
        - add-robots-headers
```
{collapsible="true" collapsed-title="traefik.yml"}
> Diese Datei enthält wichtige Konfiguration für Traefik. Falls Sie Änderungen an Traefik vornehmen müssen, sollten Sie
> diese in dieser Datei vornehmen.

### docker-compose.yml

```yaml
services:
  traefik:
    image: traefik:v3.0
    restart: unless-stopped
    networks:
      default:
      traefik_gateway:
    ports:
     - "80:80"
     - "443:443"
     - "24550:24550"
    volumes:
     - "/var/run/docker.sock:/var/run/docker.sock"
     - "./traefik.yml:/etc/traefik/traefik.yml"
     - "./traefiklogs:/accesslogs" #benötigt für accessLog in traefik.yml
     - "./acme:/acme"

networks:
  default:
  traefik_gateway:
    name: traefik_gateway
    external: true
```
{collapsible="true" collapsed-title="docker-compose.yml"}
> Diese Datei definiert den Traefik Service selbst.

### Docker Netzwerk erstellen
Nun muss noch das `traefik_gateway` Netzwerk manuell in Docker erstellt werden: 
```Shell
docker network create -d bridge traefik_gateway
```
> Dieses separat definierte Netzwerk ist erforderlich, um die getrennten Docker Compose Stacks miteinander zu verbinden
> und hat zusätzlich den Vorteil, dass wir den Zugriff von Traefik auf Container, zu diesen kein Zugriff von außen 
> möglich sein sollte (bspw. Datenbanken), verhindern können.

Traefik kann nun mit `docker-compose up -d` gestartet werden.

## AdLer
Die Anleitung zum Setup des AdLer-Stacks findet sich [hier](https://github.com/ProjektAdLer/AdLerStack/blob/main/docs/deploying_adler.md#production-deployment).

## Backup
Um ein Backup der AdLer Instanz zu erstellen, kann wie folgt vorgegangen werden:

1) Docker stoppen: `systemctl stop docker`
2) Kopie aller Docker-Volumes erstellen (Standard-Pfad: `/var/lib/docker/volumes`): `cp -r /var/lib/docker/volumes <backup directory>`
3) Kopie der Docker Compose Ordner (mindestens des AdLer-Ordners) erstellen: `cp -r <adler-compose-dir> <backup directory>`
4) Docker starten: `systemctl start docker`

Bei diesem Vorgehen sind folgende Punkte zu beachten:
>Bei der Sicherung wird temporär Docker auf dem Host gestoppt. Es kommt daher zu einer Downtime aller Docker-Services,
>einschließlich AdLer
{style="note"}

>Dieses Vorgehen sichert *alle* Docker Volumes. Es werden daher potenziell unnötige Daten von anderen Docker-Containern gesichert.
{style="note"}

>Der Backup-Prozess sollte automatisiert und regelmäßig durchgeführt werden.
>Hierfür sollte die Nutzung von Standard-Backup-Tools, wie bspw. [Restic](https://restic.net/), 
>in Kombination mit einem Cronjob in Betracht gezogen werden.
{style="warning"}