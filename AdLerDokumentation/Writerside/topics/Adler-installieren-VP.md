# AdLer installieren

Dieser Leitfaden beschreibt unsere Installation von AdLer. 


> Eine Nutzung im LAN ohne Domain (nur über IP und Ports) wird von uns nicht unterstützt.
> Unsere lokale Entwicklungsumgebung kann mit Anpassungen aber eingeschränkt für dieses Scenario verwendet werden.
> Siehe hierzu die Notizen zum [Thema Hostname im Repo der Entwicklungsumgebung](https://github.com/ProjektAdLer/AdlerDevelopmentEnvironment/tree/main/non-moodle#hostname).
{style="info"}

## Voraussetzungen

> Es wird davon ausgegangen, dass umfassende Kenntnisse im Umgang mit Linux Servern und Docker vorhanden sind, welche
> dem Betrieb einer produktiven, im Internet erreichbaren Anwendung mit sensiblen Daten gerecht werden.
{style="warning"}

- root-Zugriff auf einen Linux Server. Wir nutzen Debian 13, auf anderen Distributionen kann es zu Abweichungen kommen.
- Der Server hat eine öffentliche statische IP-Adresse.
- Docker ist installiert (siehe [Docker-Installationsanleitung](https://docs.docker.com/engine/install/)).
- Es besteht Zugriff auf eine Domain, für die Subdomains erstellt werden können.

## Überblick
Das gesamte Setup besteht aus zwei Docker Compose Projekten:
- [Traefik](https://traefik.io/traefik/) als [reverse-Proxy](https://www.cloudflare.com/en-gb/learning/cdn/glossary/reverse-proxy/)
- Die AdLer Umgebung

### Domains
- Festlegen der Domains für die drei sub-Anwendungen von AdLer und erstellen der DNS Einträge. Diese müssen Subdomains einer gemeinsamen Domain sein.
  - [API/Backend](Backend-GE.md) (hier: `api.projekt-adler.eu`)
  - Moodle (hier: `moodle.projekt-adler.eu`)
  - [Frontend](Engine-BG.md) (hier: `play.projekt-adler.eu`)

## Traefik
Die Aufgabe von Traefik als Reverse-Proxy ist es den eingehenden HTTP(S)-Verkehr auf die verschiedenen Services weiterzuleiten.
Außerdem übernimmt Traefik die automatische Ausstellung und Erneuerung von SSL-Zertifikaten über [Let's Encrypt](https://letsencrypt.org/).

Wird bereits Traefik oder ein anderer Reverse-Proxy verwendet, muss dieser genutzt werden. 

![Deploymentdiagramm für Traefik](https://www.plantuml.com/plantuml/png/VOynJyKm38Jt_0ehUzkX6mEgK1S6DYH651AtH4riv3f8_7jQeY1uUdgRp_hETvvsTQ8b9-CJbm2Ff2Y4QeW3mhCuNE9MnHDpI5Zd1-Stf535EB--uDkEyea2RWSxpjtlmfg4Yu8oI5pV5K8Kz1gPJ8k2hhjlIN07-ITcS1znG5eZOV_5HG9d5wdtd4r3JrljTBXijLsmzY_SIf_qSVqc-k-bWx_Qn1ep8OMIqpS0)

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
    transport:
      respondingTimeouts:
        writeTimeout: 0s
        readTimeout: 0s
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

Bei der Installation von AdLer sind die oben definierten Domains zu verwenden.

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