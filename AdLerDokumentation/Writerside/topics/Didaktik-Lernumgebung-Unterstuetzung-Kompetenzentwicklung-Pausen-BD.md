# Unterstützung individueller Kompetenzentwicklung - Pausenempfehlung

<show-structure/>
<chapter title="Pausenempfehlungen" collapsible="true" default-state="expanded">
    <chapter title="Erkenntnisse aus dem Bereich der Learning Analytics (LA)" id="Didaktik-Learning-Analytics-Zeit" collapsible="true" default-state="expanded">
        <p>
            Neben dem bereits beschriebenen Adaptivitätselement (Schwerpunkt: Performance on test) 
            <a href="Didaktik-Autorentool-Adaptivitaetselement-BD.md">in Kapitel 4.3 (Autorentool - Adaptivitätselement)</a>, 
            soll in AdLer das Thema „Adaptivität“ auf einer zweiten Datengrundlage adressiert werden. 
            Durch eine Pausenempfehlung seitens der AdLer-Software (Schwerpunkt: Time Spent) 
            soll die individuelle Kompetenzentwicklung der Lernenden zusätzlich unterstützt werden.
        </p>
        <p>
            In Zusammenhang mit der verbrachten Zeit (Time Spent) wird der Bereich der Learning Analytics relevant:
        </p>
        <tip>
            <p><i>“Learning analytics have been defined as the use of static and dynamic information about learners and learning environments, 
            assessing, eliciting and analysing it, for real-time modelling, prediction and optimisation of learning processes, 
            learning environments, as well as educational decision-making (Ifenthaler 2015).”</i><br/> 
            <a href="Didaktik-Literaturverzeichnis-BD.md#21-Ifenthaler-2020">(Ifenthaler, 2020, S. 2)</a>.
            </p>
        </tip>
        <p>
            Das Ziel von LA ist es relevante Metriken in Bezug auf Verhalten von Lernenden zu generieren und den Blick 
            auf die Typen von Interventionen zu richten, die den Lernprozess verbessern können. 
            <br/>Es ist aber klar: Eine Voraussetzung für LA ist, dass diese erhoben und analysiert werden k&ouml;nnen. 
            Aufgrund der Tatsache, dass in AdLer nur sehr bedingt Verhaltensdaten für die individuellen Lernenden 
            erhoben und gespeichert werden, konzentrieren wir uns auf den Parameter der verbrachten Zeit (Time Spent).
        </p>
    </chapter>
    <chapter title="Lernzeit und Lernpausen" id="Didaktik-Lernzeit-Lernpausen" collapsible="true" default-state="expanded">
        <p>
            Die verbrachte Zeit im Lernprozess ist deswegen von Bedeutung und ein relevanter Messwert, 
            da die Konzentration der meisten Menschen nur für ca. 30 Minuten effiziente Lernzeit reicht. [//]: # (TODO: RR: Gibt es hierzu eine einschlägige Quelle?)
            Einige Zeit kann sie darüber hinaus noch durch Willensanstrengung hochgehalten werden, 
            dann aber nur noch durch Pausen wiederhergestellt werden.<br/>
            Eine <a href="Lernpausen-GE.md">Lernpause</a> wirkt damit der Ermüdung entgegen. 
            Es ist sinnvoll mehrere kleine Pausen nach kürzeren Lernphasen einzulegen. 
            Ein Schema zur optimalen Gestaltung der Pausen kann wie folgt aussehen:
        </p>
        <img src="imageManualDidaktik_Abbildung_Pausengestaltung.jpg" alt="Bessere und ineffizientere Pausengestaltung veranschaulicht" width="675"/>
        <p>
            Manche Tätigkeiten sind so interessant, dass man sie stundenlang mit hoher Konzentration ausf&uuml;hren kann. 
            Bei anderen Tätigkeiten dagegen schweift man schnell gedanklich ab und denkt an alle anderen Dinge, 
            nur nicht an die Aufgabe selbst. Wenn dies der Fall ist, dann ist eine Pause sinnvoll 
            <a href="Didaktik-Literaturverzeichnis-BD.md#18-Hofmann-2012">(Hofmann & Löhle, 2012)</a>.
            <br/>Wenn man sich bewusst mit dem Lernstoff auseinandergesetzt hat, arbeitet das Gehirn auch in der Pause im Hintergrund daran. 
            Informationen werden also auch unbewusst weiterverarbeitet, wenn man sich nicht aktiv damit beschäftigt. 
            Manchmal führt das dazu, dass Lernende plötzlich eine neue Erkenntnis haben, ohne bewusst darüber nachgedacht zu haben. 
            Das liegt daran, dass das Gehirn während der Pause Informationen aus dem Gedächtnis hervorholt, ohne dass dies die Lernenden steuern. 
            Es sortiert auch Informationen aus, die vielleicht nicht richtig waren. 
            Das hilft den Lernenden besser zu verstehen, was sie lernen. Pausen sind also gut, um das Gehirn dabei zu unterstützen, 
            das Gelernte zu verarbeiten und neue Erkenntnisse zu gewinnen 
            (<a href="Didaktik-Literaturverzeichnis-BD.md#19-Antosch-2011">Antosch-Badohn, 2011</a>; 
            <a href="Didaktik-Literaturverzeichnis-BD.md#20-Antosch-2018">Antosch-Badohn, 2018)</a>.
        </p>
    </chapter>
    <chapter title="Automatisierte Pausenempfehlung in AdLer" id="Didaktik-Pausen-in-AdLer" collapsible="true" default-state="expanded">
        <p>
            Aus diesen Gründen bietet die 3D-Lernumgebung von AdLer eine automatische Pausenempfehlung. 
            Dazu misst das AdLer-System die gesamte Zeit, sobald der Lernende eine Lernwelt geöffnet hat, 
            bis zu dem Zeitpunkt, an dem die Person die Lernwelt wieder schließt.
            <br/>Mit Hilfe der Zeitmessung können den Lernenden generische Hinweise angezeigt werden, 
            welche das Thema Pausen beim Lernen betreffen und entsprechende Hintergrundinformationen geben. 
            <br/>Dies ist zeitlich wie folgt gestaffelt:
        </p>
        <table style="both">
            <tr>
                <td><b>Pausentyp</b></td>
                <td><b>Abstand (nach …)</b></td>
                <td><b>Empfehlung der Pausendauer</b></td>
            </tr>
            <tr>
                <td>Minipause</td>
                <td>nach 30min (0,5h)</td>
                <td>5min</td>
            </tr>
            <tr>
                <td>Entspannungspause</td>
                <td>nach 120min (2h)</td>
                <td>20min</td>
            </tr>
            <tr>
                <td>Erholungspause</td>
                <td>nach 240min (4h)</td>
                <td>90min</td>
            </tr>
        </table>
        <p>
            Die entsprechenden Zeitwerte und inhaltlichen Hinweise werden vom AdLer-System festgelegt und 
            können nicht durch die Autorin/den Autor beeinflusst werden. 
        </p>
        <p>
            Im Lernraum erhalten die Lernenden nach Ablauf der entsprechenden Zeit in der linken unteren Ecke des Bildschirms 
            einen Hinweis mit einer Pausenempfehlung. 
            Diesen können die Lernenden öffnen und sich die Inhalte anschauen oder auch ignorieren und „wegklicken“.<br/>
            Ignorieren die Lernenden die Pausenempfehlung oder klicken diese weg, dann passiert gar nichts und 
            die Personen können wie bisher auch im Lernraum agieren. <br/>
            Öffnen die Lernenden jedoch die Pausenempfehlung, dann erhalten die Personen …
        </p>
        <list type="decimal">
            <li>
                <p>
                    … zum einen je nach vergangener Zeit eine Empfehlung, den entsprechenden Pausentyp mit der dazugehörigen Pausendauer durchzuführen. 
                </p>
            </li>
            <li>
                <p>
                    … zum anderen eine inhaltliche Information zu Pausen aus einer der folgenden vier Kategorien: 
                </p>
                <list>
                    <li><p>Informationen zu Lernpausen allgemein,</p></li>
                    <li><p>Ernährung,</p></li>
                    <li><p>Bewegung,</p></li>
                    <li><p>Lernumgebung.</p></li>
                </list>
                <p>Diese werden in Form von Abbildungen mit Text präsentiert.</p>
            </li>
        </list>
        <p>
            Es wurden 10 Pausenhinweise für Minipausen formuliert.
            Damit Lernende beim Neustart der Lernwelt nicht immer wieder dieselben Pausenhinweise zuerst angezeigt bekommen, 
            wird mit einem <i>„Pool“</i> gearbeitet, aus dem <i>zufällig</i> für jede Pause ein Pausenhinweis 
            den Lernenden angezeigt wird. Mit diesem Verfahren ist zumindest die Wahrscheinlichkeit geringer, 
            dass die Lernenden zum wiederholten Mal dieselben Pausenhinweise angezeigt bekommen.<br/>
            Der <i>„Zufallspool“</i> startet bei jedem Betreten der Lernwelt neu, wird also nach dem Schließen von der AdLer-Software zurückgesetzt.
            <br/>Die Beschreibung gilt ebenfalls für Entspannungs- und Erholungspausen.
        </p>
    </chapter>
    <chapter title="Praktisches Beispiel" id="header-praktisches-Beispiel" collapsible="true" default-state="expanded">
        <procedure title="Praktisches Beispiel zur Empfehlung einer Lernpause (3D-Lernumgebung)" id="praktisches-Beispiel">
            <p>In folgenden Abbildungen ist ein praktisches Beispiel für die Empfehlung einer Lernpause in der 3D-Lernumgebung abgebildet. </p>
            <img src="imageManualDidaktik_Abbildung_Lernpause-1_3D-Lernumgebung.JPG" alt="Beispiel einer Lernpausen-Benachrichtigung in der Lernumgebung" width="675" thumbnail="true"/>
            <img src="imageManualDidaktik_Abbildung_Lernpause-2_3D-Lernumgebung.JPG" alt="Beispiel eines geöffneten Pausenhinweises in der Lernumgebung" width="675" thumbnail="true"/>
            <br/>
            <p>In folgendem Video ist ein praktisches Beispiel für die Empfehlung einer Lernpause in der 3D-Lernumgebung zu sehen. </p>
            <video src="videoManualDidaktik_Lernpause_3D-Lernumgebung.mp4" alt="Beispiel-Video einer Lernpause in der Lernumgebung" preview-src="videoManualDidaktik_Lernpause_3D-Lernumgebung.png" width="675"/>
        </procedure>
    </chapter>
</chapter>