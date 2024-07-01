# AdLer installieren

Dieser Leitfaden beschreibt die Installation von AdLer auf einem Linux-Server.

## Voraussetzungen

- root-Zugriff auf einen Linux Server. In diesem Guide wird ein Debian 12 Server verwendet. Die Installation auf anderen Linux-Distributionen wird in gewissen Punkten abweichen und hier nicht behandelt.
- Der Server hat eine öffentliche statische IP-Adresse.
- Docker (**nicht Docker-Desktop**) ist installiert (siehe [Docker-Installationsanleitung](https://docs.docker.com/engine/install/)).
- Es besteht Zugriff auf eine Domain, für die Subdomains erstellt werden können.

### Kenntnisse
- Kenntnisse in der Bedienung eines Linux-Servers.
- Docker-Kenntnisse.
- Grundlegende Netzwerkkenntnisse 

**Hinweis:** Für die Installation und den sicheren/stabilen Betrieb von AdLer sind diese Kenntnisse zwingend erforderlich.
Diese werden im folgenden als bekannt vorausgesetzt.

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
- Docker Netzwerk zur Kommunikation zwischen Treafik und den AdLer-Containern für den Zugriff aus dem Internet erstellen: `docker network create --gateway 172.16.2.1 --subnet 172.16.2.0/24 traefik_gateway`

## Traefik
Traefik übernimmt die Funktion unseres Reverse-Proxy und ermöglicht es uns, dass alle AdLer-Services auf dem gleichen Server
auf Port 80 auf unterschiedlichen Domains erreichbar sind:

> Sofern Sie in ihrem Setup keinen Reverse-Proxy benötigen oder wünschen (z.B. nur lokalen Zugriff über interne IP und Ports)
oder bereits einen anderen Reverse-Proxy eingerichtet haben, können Sie das Setup dahingehend anpassen, in dem sie
diesen Konfigurationsschritt überspringen.
{style='note'}

![](https://www.plantuml.com/plantuml/png/VOynJyKm38Jt_0ehUzkX6mEgK1S6DYH651AtH4riv3f8_7jQeY1uUdgRp_hETvvsTQ8b9-CJbm2Ff2Y4QeW3mhCuNE9MnHDpI5Zd1-Stf535EB--uDkEyea2RWSxpjtlmfg4Yu8oI5pV5K8Kz1gPJ8k2hhjlIN07-ITcS1znG5eZOV_5HG9d5wdtd4r3JrljTBXijLsmzY_SIf_qSVqc-k-bWx_Qn1ep8OMIqpS0)
- Wir verwenden Traefik in einem eigenen Docker-Compose Projekt um den Reverse-Proxy und die Services, welche an diesen angeschlossen sind,
  unabhängig voneinander verwalten zu können.
- Die eigentliche Konfiguration der (Sub-)Domains ist in [.env](#env) gegeben.

In einem eigenen Ordner müssen die folgenden beiden Dateien erstellt werden:


´traefik.yml´:
`<EMAIL>` durch die eigene E-Mail-Adresse ersetzen.
```yaml
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


`docker-compose.yml`:
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
     - "./traefiklogs:/accesslogs"
     - "./acme:/acme"

networks:
  default:
  traefik_gateway:
    name: traefik_gateway
    external: true
```

Nun muss noch das `traefik_gateway` Netzwerk manuell in Docker erstellt werden: 
```Shell
docker network create -d bridge traefik_gateway
```
> Dieses separat definierte Netzwerk ist erforderlich, um die getrennten Docker Compose Stacks miteinander zu verbinden
> und hat zusätzlich den Vorteil, dass wir den Zugriff von Traefik auf Container, zu diesen kein Zugriff von außen 
> möglich sein sollte (bspw. Datenbanken), verhindern können.

Traefik kann nun mit `docker-compose up -d` gestartet werden.

## AdLer
In einem eigenen Ordner müssen die Dateien `.env`, `stack.env` und `docker-compose.yml` erstellt werden.
Danach kann AdLer mit `docker-compose up -d` gestartet werden.

### Dateien
#### .env
In dieser Datei werden die Umgebungsvariablen gesetzt, die zur Konfiguration von AdLer benötigt werden.

- `_MOODLE_USER` und `_MOODLE_PW` sind die Anmeldedaten für den Moodle-Administrator. Für `_MOODLE_PW` muss ein sicheres Passwort gewählt werden.
- `_DB_BACKEND_PW` und `_DB_MOODLE_PW` sind die Passwörter für die Datenbanken, die von den Backend- und Moodle-Containern verwendet werden.
Hier müssen ebenfalls sichere Passwörter gewählt werden.
- `_DB_ROOT_PW` ist das Passwort für den Datenbank-Root-Benutzer. Dieser Nutzer wird nur für den administrativen Zugriff des Server-Administrators genutzt.
Hier muss ebenfalls ein sicheres Passwort gewählt werden. 
- `_DOMAIN` ist der gemeinsame Teil der URLs für die drei Subdomains. Hier wird die Domain eingetragen, für die die Subdomains erstellt wurden.
- `_DEPLOYMENT_NAME` ist der Name des Deployments. Er muss für jedes AdLer-Deployment eindeutig sein und wird für interne Zwecke verwendet.
- `_URL_MOODLE`, `_URL_BACKEND` und `_URL_3D` sind die URLs für die drei Subdomains. Die Einträge müssen mit `.${_DOMAIN}` enden.
Dies müssen die Subdomains sein, für die die DNS-Einträge erstellt wurden.
- `_DB_BACKEND_USER`, `_DB_BACKEND_NAME`, `_DB_MOODLE_USER` und `_DB_MOODLE_NAME` sind die Benutzer- und Datenbanknamen für die Backend- und Moodle-Datenbanken.
In der Regel ist es nicht notwendig diese Werte anzupassen.

```Shell
# moodle admin user
_MOODLE_USER=administrator
_MOODLE_PW=<a unique secret password>

# db passwords
_DB_ROOT_PW=<a unique secret password>
_DB_BACKEND_PW=<a unique secret password>
_DB_MOODLE_PW=<a unique secret password>

# url stuff
_DOMAIN=projekt-adler.eu # this is the projects "shared" url part

# deployment name
_DEPLOYMENT_NAME=prod   # this name is used for internal stuff, it has to be unique for each AdLer deployment

######################################################################

# Probably these values are already fine for you
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

#### stack.env
Diese Datei ist notwendig, da unsere deployments von Portainer verwaltet werden. 
Bei einem normalen deployment wird diese Datei nicht genutzt, muss aber vorhanden sein.
Daher ist es ausreichend eine leere Datei mit dem Namen `stack.env` zu erstellen.

#### docker-compose.yml

Diese Datei steht [hier](https://github.com/ProjektAdLer/deployment-adler-prod/blob/main/docker-compose.yml) in der aktuell von uns genutzten Version zum Download bereit.
Im Normalfall sind in dieser Datei lediglich die Versionen der Images anzupassen.
Während der Projektlaufzeit wird diese Datei regelmäßig aktualisiert, um die neuesten Versionen der Images zu verwenden.

Es werden die folgenden Anwendungen gestartet:
- Moodle mit den AdLer-Plugins. Beim ersten Start wird Moodle automatisch für die Nutzung von AdLer konfiguriert.
- AdLer-Backend
- AdLer-Frontend
- PHPMyAdmin zum Zugriff des Admins auf die Datenbanken. Auf PHPMyAdmin kann nicht über das Internet zugegriffen werden. 
Es ist ein Proxy (bspw. ein SSH-Proxy) auf den Server notwendig.
- Datenbanken für Moodle und das Backend

Abgesehen von den Versionen der Images (siehe Abschnitt [Updates](#updates)) müssen in der Regel keine Änderungen an der `docker-compose.yml` vorgenommen werden.

### Updates
Der einfachste Weg Updates einzuspielen, ist es die jeweils aktuelle [docker-compose.yml](https://github.com/ProjektAdLer/deployment-adler-prod/blob/main/docker-compose.yml) herunterzuladen.
Bis zum Ende der Projektlaufzeit spiegelt diese jeweils den Stand wider, welchen wir in der Produktion nutzen und somit als stabil erachten.
Danach wird es keine offiziellen Updates, auch nicht von den einzelnen Komponenten, mehr geben.

Nach dem Aktualisieren der `docker-compose.yml` muss AdLer mit `docker-compose down && docker-compose up -d` neu gestartet werden.

**Hinweis:** Bevor ein Update eingespielt wird sollte ein [Backup](#backup) der AdLer-Instanz angelegt werden.

**Achtung bei Updates von Moodle:**
Moodle kann nicht durch Ändern des Wertes von `MOODLE_VERSION` aktualisiert werden. 
Somit wird moodle auch nicht automatisch aktualisiert, wenn die `docker-compose.yml` aktualisiert wird.
Hierfür siehe [Moodle-Update](Moodle-aktualisieren-VP.md).

#### Manuelle Updates
Für alle Anwendungen, außer Moodle, muss das jeweilige Image in der `docker-compose.yml` aktualisiert werden und 
AdLer mit `docker-compose down && docker-compose up -d` neu gestartet werden.
Für das Update von Moodle siehe [Moodle-Update](Moodle-aktualisieren-VP.md).
Beim Ändern der Versionen muss die Kompatibilität der Versionen untereinander beachtet werden.
Diese sind für jedes Teilprojekt in der entsprechenden Readme dokumentiert.

- **Update des Frontends**: Im [Frontend Projekt](https://github.com/ProjektAdLer/2D_3D_AdLer) die benötigte Backend-Version nachschauen.
Die Abhängigkeiten der neuen Backend-Version sind dann ebenfalls zu beachten.
- **Update des Backends**: Im [Backend Projekt](https://github.com/ProjektAdLer/AdLerBackend) die unterstützte Moodle-Plugin-Version nachschauen.
Die Abhängigkeiten der neuen Moodle-Plugin-Version sind dann ebenfalls zu beachten.
Im Backend ist auch die unterstützte Version des Autorentools dokumentiert.
- **Update von Moodle**: siehe [Moodle-Update](Moodle-aktualisieren-VP.md).

## Backup
Um ein Backup der AdLer Instanz zu erstellen, kann wie folgt vorgegangen werden:

1) Docker stoppen: `systemctl stop docker`
2) Kopie aller Docker-Volumes erstellen (Standard-Pfad: `/var/lib/docker/volumes`): `cp -r /var/lib/docker/volumes <bakup directory>`
3) Kopie der Docker Compose Ordner (mindestens des AdLer-Ordners) erstellen: `cp -r <adler-compose-dir> <bakup directory>`
4) Docker starten: `systemctl start docker`

Dies ist ein sehr einfaches Vorgehen, erfüllt jedoch den Zweck einwandfrei.
Es ist jedoch wichtig folgende Punkte zu beachten:
- Es kommt zu einer Downtime aller Docker-Services, einschließlich AdLer
- Es werden potenziell unnötige Daten, auch von anderen Docker-Containern, gesichert

Der Backup-Prozess sollte außerdem automatisiert und regelmäßig durchgeführt werden.
Hierfür sollte die Nutzung von Standard-Backup-Tools, wie bspw. das von uns genutzte [Restic](https://restic.net/), 
in Kombination mit einem Cronjob, in Betracht gezogen werden.
