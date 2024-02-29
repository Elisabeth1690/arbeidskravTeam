Krav til innlevering
- Gruppeinnlevering bestående av 2-4 studenter
- Oppgaven må leveres med Github-link. Videobesvarelse legges inn i
Github-repositoryet. Alle gruppemedlemmer skal snakke og presentere i
videoen. Alle må ha på video og være synlige under presentasjonen.
- Videoen skal ikke overgå 8 minutter.
- Alle gruppemedlemmer må ha commitet og vist lik innsats i
Github-repositoryet. Dette betyr at ingen elever kan ta på seg mye mer
eller mindre ansvar enn andre. Det er viktig at dere ikke sletter noen
brancher eller commits, slik at all historikk er synlig.
- Arbeidskravet må bestås for å ta eksamen i faget. Hele gruppen får “ikke
bestått” dersom noe mangler, og må rette opp i manglene sammen for å få
godkjent.
- Dersom et eller flere gruppemedlemmer av ulike årsaker ikke er delaktige i
arbeidsprosessen, skal gruppen ta kontakt med Amina Brenneng.
Tekniske krav:
● Dere skal benytte dere av følgende API’er:
https://randomuser.me/
https://dog.ceo/
● Løsningen skal bestå av 2 HTML-sider, begge sidene skal utvikles.
1. Dating-app
2. Hundepasser-app
● Det er ikke et krav at nettsiden er responsiv for mobil og nettbrett, men den
skal være egnet for PC.
● Det stilles ingen krav til styling utover det som er spesifisert i oppgavene.


Oppgaver
1. Dating-app
Du skal bruke randomUser API’et for å lage en dating-app. Når brukeren går inn på
nettsiden skal brukeren se:
FULLFØRT ---   Faisal

- En score over brukerens antall “swipes”/liker-klikk. Brukeren starter med å ha
10 swipes/liker-klikk, og det vil bli trukket -1 hver gang brukeren
“swiper”/velger ja eller nei på en bruker.
FULLFØRT --- Elisabeth

- Tre knapper: en for filtrering av kvinner, en for filtrering av menn og en for
begge. (Det finnes kun kjønn for kvinner og menn i API’et i dag.) Brukeren
kan trykke på disse knappene for å velge å kun få vist frem enten kvinner,
menn eller begge.
FULLFØRT --- Elisabeth


- Det skal vises ett og ett kort om gangen med informasjon om en tilfeldig profil
på nettsiden som passer filterkriteriene til brukeren. Følgende informasjon
skal vises om en profil:
Bilde, navn, bosted
FULLFØRT --- Faisal

- Kortene skal få en egen styling avhengig av om det er en mann/dame på
kortet.
FULLFØRT --- Faisal

Funksjonalitet
1. Når brukeren går inn på nettsiden og det dukker opp ett kort kan brukeren
“swipe” på profilen ved å trykke på tastaturet sitt. Hvis brukeren trykker på
piltasten mot venstre ( <- ) på tastaturet symboliserer det “IKKE
INTERESSERT”. Hvis piltasten peker mot høyre ( -> ) symboliserer det
“INTERESSERT”.
FULLFØRT --- Elisabeth


1.1 Hvis brukeren ikke er interessert i profilen, byttes kortet ut med en ny profil
som fortsatt samsvarer med kjønnsfiltreringen.
FULLFØRT --- Elisabeth


2. Hvis brukeren er interessert så skal profilen legges inn i et nytt array og i en
oversikt på nettsiden som viser alle profiler brukeren er interessert i. Alle de
likte profilene skal også lagres i localStorage.


2.1 Når en profil legges inn i oversiktslisten får kortet to tilleggsknapper: En for
sletting og en for redigering.


3. Hvis brukeren har likt mer enn 10 profiler, er oversiktslisten full. Brukeren får
en feilmelding, og får ikke lov til å swipe mer før hen har slettet minst en
bruker fra listen ved å trykke på slette-knappen.


3.1 Hvis en bruker sletteren profil fra oversiktslisten skal de forsvinne fra
listen, arrayet og localStorage.


4. Når man trykker på rediger-knappen kan man redigere navn, alder og bosted
til profilen. Informasjonen skal oppdateres i oversiktslisten, arrayet og i
localStorage.


5. Hvis brukeren går tom for score-poeng etter 10 swipes skal man få en
melding. “Har du lyst til å swipe mer? Ja/Nei”. Dersom brukeren svarer nei,
skal spørsmålet bli stilt igjen og igjen helt til brukeren svarer ja. Når brukeren
svarer ja, får hen 10 nye poeng.
FULLFØRT --- ELISABETH




2. Hundepasser-app
Du skal bruke randomUser API’et og dog API’et for å lage en hundepasser
app. Når brukeren går inn på nettsiden skal brukeren se:

1. En fremvisning av 10 profilkort. Hvert kort skal inneholde:
● Bilde av en tilfeldig hund fra dog API’et, samt bilde, navn og
bosted til en tilfeldig profil fra randomUser API’et. FULLFØRT --- EDUARDO
● Slette-knapp for å slette et kort. FULLFØRT --- MOHIT
● Chatte-knapp. FULLFØRT --- EDUARDO



2. En knapp med “Vis 10 nye kort”. Om denne knappen trykkes på, skal de 10
forrige kortene forsvinne og byttes ut med 10 nye. FULLFØRT --- EDUARDO



3. Hvert kort skal inneholde en slette-knapp. Kortet skal slettes fra nettsiden hvis
den blir trykket på, og byttes ut med et nytt. Det skal altså fortsatt være 10
kort på nettsiden. FULLFØRT --- MOHIT



4. En filtreringsfunksjon for å filtrere basert på hunderase. Du må velge minst 5
hunderaser som brukeren kan filtrere etter. Hvis brukeren filtrerer etter
hunderase, skal kun kortene med disse hunderasene dukke opp på nettsiden.
Kortene skal inneholde samme informasjon som de andre, bortsett fra
slette-knapp. Filtrerte kort kan ikke slettes fra listen og det kan være færre
eller flere enn 10 kort på siden om gangen. FULLFØRT --- MOHIT



5. Hvis brukeren trykker på chatteknappen skal det åpnes en chatteboks.
Chatteboksen skal la brukeren skrive inn meldinger til eieren av hunden på
kortet. FULLFØRT --- EDUARDO



5.1 Chatteboksen fungerer slik:
- Det kommer opp en hilsen fra eieren av hunden. FULLFØRT --- EDUARDO
- Brukeren skal få lov til å sende meldinger som dukker opp i
boksen. (Input-felt og vise frem verdien i input-feltet).
- Brukeren kan slette meldinger hen har sendt.
- Brukeren skal kunne lukke chattefeltet.



6. Hvis brukeren trykker på et av kortene skal det dukke opp en snakkeboble til
kortet, hvor det står en tilfeldig hilsen fra hunden. Den tilfeldige hilsenen skal
bli hentet fra et array. De tilfeldige hilsenene man kan få er:
“Voff voff”, “Grrr!”, “Mjau??”, “Voff!”, “Voff voff voff”, “WRAFF!!!”.
Krav til kode
Gruppen har frihet til å bestemme selv hvilke fremgangsmåter dere ønsker å benytte
dere av med tanke på å manipulere DOM. Eksempler på dette kan være
getElementById vs querySelector, classList vs className osv. Gruppen må derimot
komme til enighet om hvilken standard som skal brukes av alle medlemmer i
besvarelsen. Dette gjelder også hvordan dere skal navngi klassenavn og variabler.
Gruppen velger selv strukturen til nettsiden. Dere kan ta dere kreative friheter som
for eksempel å benytte slette-ikoner i stedet for knapper etc, så lenge
funksjonaliteten fungerer.
