# H5P Zustände


Die Sicht der Lehrenden und der Entwickelnden muss getrennt werden, da 
die Lehrenden lediglich interessiert, ob ein H5P nutzbar, nicht nutzbar oder
noch ungeprüft ist. Hingegen muss bei der Kommunikation zwischen Autorentool und 
der 3D-Lernumgebung mehr Information übertragen werden.

Beachte auch: [H5P-Zustände Autorentool](H5P-Zustände-Autorentool.md)

## Mapping der H5P-Zustände: Lehrende ↔ Entwickelnde

<table >
  <thead>
    <tr>
      <th style="width: 25%;">Sicht der Lehrenden</th>
      <th style="width: 25%;">Sicht der Entwickelnden</th>
      <th>Beschreibung (Entwickelnden)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Nutzbar</td>
      <td>primitive</td>
      <td>
        Das H5P kann aus technischer Sicht nicht abgeschlossen werden.
        Das bedeutet, diese H5P's können kein XAPI-Event feuern
        Jedoch kann man es semantisch gesehen abschließen.
        Beispiele hierfür sind H5P's, die nur aus Text oder Bildern bestehen.
      </td>
    </tr>
    <tr>
      <td>completable</td>
      <td>
        Das H5P ist abschließbar.
        Das bedeutet, diese H5P's feuern ein XAPI-Event, sobald sie abgeschlossen sind.
      </td>
    </tr>
    <tr>
      <td>Nicht Nutzbar</td>
      <td>not usable</td>
      <td>
        H5P ist defekt:
        - H5P wird nicht angezeigt
        - H5P kann trotz Aufgabe nicht abgeschlossen werden
      </td>
    </tr>
    <tr>
      <td>Ungeprüft</td>
      <td>not validated</td>
      <td>Der Zustand des H5P's ist nicht validiert.</td>
    </tr>
  </tbody>
</table>




## 3D-Lernumgebung:

H5P content:
- Das sind H5P's die ein XAPI-Event feuern, wenn sie abgeschlossen sind

H5P primitiv:
- Diese H5P's können kein XAPI-Event feuern, sind demnach nicht abschließbar.
- Beispiele hierfür sind H5P's die nur aus Text oder Bildern bestehen.


## State-Pattern in der Implementierung

Auf das State-Pattern wurde explizit verzichtet:

- Die Zustände repräsentieren Zustandsdaten, kein kompliziertes Verhalten
- Darum brauchen wir in einem Zustand keine Logik
- Statt Logik brauchen wir Statusverwaltung
- Zustandsänderungen passieren durch einfache Regeln 
-> Nutzer setzt den Zustand aktiv um

Anmerkung: Vorerst nicht testbar, keine ID vergeben in Writerside Topic