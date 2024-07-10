# AdLer installieren

Dieser Leitfaden beschreibt die Installation und das Setup von AdLer auf einem Linux-Server.

> Da in diesem Leitfaden technische Aspekte genauer erläutert werden, ist dieser sehr ausführlich. Für einen Quick Start
> des AdLer Systems verwenden Sie unsere
> [Entwicklerumgebung](https://github.com/ProjektAdLer/AdlerDevelopmentEnvironment/tree/main/non-moodle).


> Eine Nutzung im LAN ist mit diesem Guide nicht ohne korrekte Konfiguration von Traefik möglich. 
> Falls Sie eine lokale Testumgebung aufsetzen möchten (nur lokalen
> Zugriff über interne IP und Ports), dann verwenden Sie unsere
> [Entwicklerumgebung](https://github.com/ProjektAdLer/AdlerDevelopmentEnvironment/tree/main/non-moodle).
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
  - [Frontend](Engine-BG.md) (hier: `engine.projekt-adler.eu`)

## Traefik
Traefik übernimmt die Funktion unseres Reverse-Proxy und ermöglicht es uns, dass alle AdLer-Services auf dem gleichen Server
auf Port 80 auf unterschiedlichen Domains erreichbar sind:

> Sofern Sie bereits einen anderen Reverse-Proxy eingerichtet haben können Sie diesen Konfigurationsschritt überspringen
> und Ihren Reverse Proxy separat für AdLer konfigurieren.

![Deploymentdiagramm für Traefik](https://www.plantuml.com/plantuml/png/VOynJyKm38Jt_0ehUzkX6mEgK1S6DYH651AtH4riv3f8_7jQeY1uUdgRp_hETvvsTQ8b9-CJbm2Ff2Y4QeW3mhCuNE9MnHDpI5Zd1-Stf535EB--uDkEyea2RWSxpjtlmfg4Yu8oI5pV5K8Kz1gPJ8k2hhjlIN07-ITcS1znG5eZOV_5HG9d5wdtd4r3JrljTBXijLsmzY_SIf_qSVqc-k-bWx_Qn1ep8OMIqpS0)
- Wir verwenden Traefik in einem eigenen Docker-Compose Projekt um den Reverse-Proxy und die Services, welche an diesen angeschlossen sind,
  unabhängig voneinander verwalten zu können.
- Die eigentliche Konfiguration der (Sub-)Domains ist in [.env](#env) gegeben.

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
In einem Ordner separat des Traefik Ordners müssen die folgenden Dateien `.env`, `stack.env` und `docker-compose.yml` 
erstellt werden. Danach kann AdLer mit `docker-compose up -d` gestartet werden.

### Dateien
#### .env
In dieser Datei werden die Umgebungsvariablen gesetzt, die zur Konfiguration von AdLer benötigt werden.

```Shell
# moodle admin user
_MOODLE_USER=administrator
_MOODLE_PW=<a unique secret password>

# db passwords
_DB_ROOT_PW=<a unique secret password>
_DB_BACKEND_PW=<a unique secret password>
_DB_MOODLE_PW=<a unique secret password>

# url stuff
_DOMAIN=projekt-adler.eu # URL-Basis, muss angepasst werden

# deployment name
_DEPLOYMENT_NAME=prod   # Interner Name, kann so belassen werden

######################################################################

# Die nachfolgenden Werte können so belassen oder angepasst werden
## urls
_URL_MOODLE=moodle.${_DOMAIN}
_URL_BACKEND=api.${_DOMAIN}
_URL_3D=engine.${_DOMAIN}

## db
_DB_BACKEND_USER=adler_backend
_DB_BACKEND_NAME=adler_backend
_DB_MOODLE_USER=bitnami_moodle
_DB_MOODLE_NAME=bitnami_moodle
```
{collapsible="true" collapsed-title=".env"}
<deflist collapsible="true">
  <def title="Erklärung der Variablen" default-state="collapsed">
    <list>
      <li>
        <code>_MOODLE_USER</code> und <code>_MOODLE_PW</code> sind die Anmeldedaten für den Moodle-Administrator. Für <code>_MOODLE_PW</code> muss ein sicheres Passwort gewählt werden.
      </li>
      <li>
        <code>_DB_BACKEND_PW</code> und <code>_DB_MOODLE_PW</code> sind die Passwörter für die Datenbanken, die von den Backend- und Moodle-Containern verwendet werden.
        Hier müssen ebenfalls sichere Passwörter gewählt werden.
      </li>
      <li>
        <code>_DB_ROOT_PW</code> ist das Passwort für den Datenbank-Root-Benutzer. Dieser Nutzer wird nur für den administrativen Zugriff des Server-Administrators genutzt.
        Hier muss ebenfalls ein sicheres Passwort gewählt werden. 
      </li>
      <li>
        <code>_DOMAIN</code> ist der gemeinsame Teil der URLs für die drei Subdomains. Hier wird die Domain eingetragen, für die die Subdomains erstellt wurden.
      </li>
      <li>
        <code>_DEPLOYMENT_NAME</code> ist der Name des Deployments. Er muss für jedes AdLer-Deployment eindeutig sein und wird für interne Zwecke verwendet.
      </li>
      <li>
        <code>_URL_MOODLE</code>, <code>_URL_BACKEND</code> und <code>_URL_3D</code> sind die URLs für die drei Subdomains. Die Einträge müssen mit <code>.${_DOMAIN}</code> enden.
        Dies müssen die Subdomains sein, für die die DNS-Einträge erstellt wurden.
      </li>
      <li>
        <code>_DB_BACKEND_USER</code>, <code>_DB_BACKEND_NAME</code>, <code>_DB_MOODLE_USER</code> und <code>_DB_MOODLE_NAME</code> sind die Benutzer- und Datenbanknamen für die Backend- und Moodle-Datenbanken.
        In der Regel ist es nicht notwendig diese Werte anzupassen.
      </li>
    </list>
  </def>
</deflist>

#### docker-compose.yml (AdLer Stack)
Diese Datei steuert das Deployment der AdLer Instanz:
```yaml
version: '3'
services:
  moodle:
    build:
      context: https://github.com/ProjektAdLer/moodle-docker.git
      args:
        PLUGIN_VERSION: 3.2.0
        MOODLE_VERSION: 4.3
    environment:
      BITNAMI_DEBUG: true
      MOODLE_DATABASE_HOST: db_moodle
      MOODLE_DATABASE_PORT_NUMBER: 3306
      MOODLE_DATABASE_USER: ${_DB_MOODLE_USER}
      MOODLE_DATABASE_PASSWORD: ${_DB_MOODLE_PW}
      MOODLE_DATABASE_NAME: ${_DB_MOODLE_NAME}
      MOODLE_USERNAME: ${_MOODLE_USER}
      MOODLE_PASSWORD: ${_MOODLE_PW}
      MOODLE_HOST: ${_URL_MOODLE}
      PHP_POST_MAX_SIZE: 2048M
      PHP_UPLOAD_MAX_FILESIZE: 2048M
      USER_NAME: ${_MOODLE_USER_NAME}
      USER_PASSWORD: ${_MOODLE_USER_PASSWORD}
      USER_ROLE: ${_MOODLE_USER_ROLE}
    volumes:
      - moodle_moodle:/bitnami/moodle
      - moodle_moodledata:/bitnami/moodledata
    networks:
      - traefik_gateway
      - internal
    depends_on:
      - db_moodle
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.moodle_${_DEPLOYMENT_NAME}.rule=Host(`${_URL_MOODLE}`)"
      - "traefik.http.routers.moodle_${_DEPLOYMENT_NAME}.tls=true"
      - "traefik.http.routers.moodle_${_DEPLOYMENT_NAME}.tls.certresolver=le"
      - "traefik.http.routers.moodle_${_DEPLOYMENT_NAME}.entrypoints=websecure"

  db_moodle:
    image: docker.io/bitnami/mariadb:10.11
    environment:
      MARIADB_USER: ${_DB_MOODLE_USER}
      MARIADB_PASSWORD: ${_DB_MOODLE_PW}
      MARIADB_ROOT_PASSWORD: ${_DB_ROOT_PW}
      MARIADB_DATABASE: ${_DB_MOODLE_NAME}
      MARIADB_CHARACTER_SET: utf8mb4
      MARIADB_COLLATE: utf8mb4_unicode_ci
    volumes:
      - db_moodle_data:/bitnami/mariadb
    networks:
      - internal
    restart: unless-stopped

  db_backend:
    image: docker.io/bitnami/mariadb:10.11
    environment:
      MARIADB_USER: ${_DB_BACKEND_USER}
      MARIADB_PASSWORD: ${_DB_BACKEND_PW}
      MARIADB_ROOT_PASSWORD: ${_DB_ROOT_PW}
      MARIADB_DATABASE: ${_DB_BACKEND_NAME}
      MARIADB_CHARACTER_SET: utf8mb4
      MARIADB_COLLATE: utf8mb4_unicode_ci
    volumes:
      - db_backend_data:/bitnami/mariadb
    networks:
      - internal
    restart: unless-stopped

  backend:
    image: ghcr.io/projektadler/adlerbackend:2.2.2
    environment:
      ASPNETCORE_ENVIRONMENT: "Production"
      ASPNETCORE_DBUSER: ${_DB_BACKEND_USER}
      ASPNETCORE_DBPASSWORD: ${_DB_BACKEND_PW}
      ASPNETCORE_DBNAME: ${_DB_BACKEND_NAME}
      ASPNETCORE_DBHOST: db_backend
      ASPNETCORE_DBPORT: 3306
      ASPNETCORE_ADLER_MOODLEURL: https://${_URL_MOODLE}
      ASPNETCORE_ADLER_HTTPPORT: 80
      ASPNETCORE_ADLER_USEHTTPS: false
      ASPNETCORE_ADLER_ADLERENGINEURL: https://${_URL_3D}
    volumes:
      - backend_wwwroot:/app/wwwroot
    networks:
      - traefik_gateway
      - internal
    depends_on:
      - db_backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api_${_DEPLOYMENT_NAME}.rule=Host(`${_URL_BACKEND}`)"
      - "traefik.http.routers.api_${_DEPLOYMENT_NAME}.tls=true"
      - "traefik.http.routers.api_${_DEPLOYMENT_NAME}.tls.certresolver=le"
      - "traefik.http.routers.api_${_DEPLOYMENT_NAME}.entrypoints=websecure"
      - "traefik.http.services.api_${_DEPLOYMENT_NAME}.loadbalancer.server.port=80"
    restart: unless-stopped

  frontend:
    image: ghcr.io/projektadler/2d_3d_adler:2.2.0
    networks:
      - traefik_gateway
    environment:
      API_URL: "https://${_URL_BACKEND}/api"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.3d_${_DEPLOYMENT_NAME}.rule=Host(`${_URL_3D}`)"
      - "traefik.http.routers.3d_${_DEPLOYMENT_NAME}.tls=true"
      - "traefik.http.routers.3d_${_DEPLOYMENT_NAME}.tls.certresolver=le"
      - "traefik.http.routers.3d_${_DEPLOYMENT_NAME}.entrypoints=websecure"
      - "traefik.http.services.3d_${_DEPLOYMENT_NAME}.loadbalancer.server.port=80"
    restart: unless-stopped

volumes:
  moodle_moodle:
    driver: local
  moodle_moodledata:
    driver: local
  db_moodle_data:
    driver: local
  db_backend_data:
    driver: local
  backend_wwwroot:
    driver: local


networks:
  traefik_gateway:
    external: true
  internal:
```
{collapsible="true" collapsed-title="docker-compose.yaml"}

> Die aktuelle Version der docker-compose.yaml Datei, welche für das Deployment der 
> [Beispielinstanz](https://engine.projekt-adler.eu/) verwendet wird, finden Sie 
> [hier](https://github.com/ProjektAdLer/deployment-adler-prod/blob/main/docker-compose.yml).
> Bitte beachten Sie, dass diese Datei aufgrund von Unterschieden im Deployment etwas von der oben gezeigten Version abweicht.
{style="note"}

Es werden die folgenden Anwendungen definiert:
- Moodle mit den AdLer-Plugins 
  - Beim ersten Start wird Moodle automatisch für die Nutzung von AdLer konfiguriert
- AdLer-Backend
- AdLer-Frontend
- Datenbanken für Moodle und das Backend

Abgesehen von den Versionen der Images (siehe Abschnitt [Updates](AdLer-aktualisieren-VP.md#adler-aktualisieren)) müssen 
in der Regel keine Änderungen an der `docker-compose.yml` vorgenommen werden.

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