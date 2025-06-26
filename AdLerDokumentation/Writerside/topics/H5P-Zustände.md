# H5P Zustände

- unknown 
  - Der Zustand des H5P's ist nicht bekannt.

- not completable 
  - Das H5P kann aus technischer sicht nicht abgeschlossen werden. 
        Das bedeutet, dass das H5P kein explizites Ereignis liefert, das den Abschluss des H5P's festlegt.

- primitiv
  - Das H5P ist zwar aus  technischer Sicht nicht abschließbar, jedoch kann man es semantisch gesehen abschließen.
Biespiele hierfür sind H5P's die nur aus Text oder Bildern bestehen.

- completable 
  - Das H5P ist abschließbar.



Anmerkung: Vorerst nicht testbar, keine ID vergeben in Writerside Topic

## State-Pattern in der Implementierung

Auf das State-Pattern wurde explizit verzichtet:

- Die Zustände repräsentieren Zustandsdaten, kein kompliziertes Verhalten
- Darum Brauchen wir in einem Zustand keine Logik
- Statt Logik brauchen wir Statusverwaltung
- Zustandsänderungen passieren durch einfache Regeln 
-> Nutzer setzt den Zustand aktiv um