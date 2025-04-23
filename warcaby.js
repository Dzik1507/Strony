/*
Wnioski:
- C/C++ lepszy, od razu określa się typy zmiennych przez co nie zamienia mi numeru na string nagle
- JS ma dosyć łatwe diagnozowanie co jest nie tak w kodzie dzięki przeglądarce

*/

//dodać podwójne bicie i hetmana

//this poleID działa tylko trzeba go dać w Number

plansza = document.getElementById("plansza");
let tura = 0;
let czarne = 0;
let biale = 0;
//inicjalizacja tablicy pól;
const pola = []; //ewentualnie let
for (let i = 0; i < 8; i++) {
    pola[i] = [];
}

function usun_zaznaczenia() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if(pola[x][y].classList.contains("zaznaczony")) pola[x][y].classList.remove("zaznaczony");
            if(pola[x][y].firstChild && pola[x][y].firstChild.classList.contains("move_button")) pola[x][y].firstChild.remove();
        }
    }
}

function zaznacz_pole(pionek) {
    usun_zaznaczenia();
    pionek.parentElement.classList.add("zaznaczony");
}

function inicjuj_plansze() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            pola[x][y] = document.createElement("div");
            pola[x][y].setAttribute("id", `${x+1}${y+1}`);
            pola[x][y].setAttribute("class", "pole");
            if((y + x) % 2 == 0) pola[x][y].classList.add("czarne");
            else                 pola[x][y].classList.add("biale");;
            plansza.appendChild(pola[x][y]);
            //console.log(pola[x][y]);
        }
    }    
}

function dodaj_pionki() {    
    for (let x = 6; x < 8; x++) {//białe
        for (let y = 0; y < 8; y++) {
            if((y + x) % 2 == 0) {
                const pionek = new BialyP();
                pola[x][y].appendChild(pionek.pionek);
            }
        }
    }
    for (let x = 0; x < 2; x++) { //czarne
        for (let y = 0; y < 8; y++) {
            if((y + x) % 2 == 0) {
                const pionek = new CzarnyP();
                pola[x][y].appendChild(pionek.pionek);
            }
        }
    }
    
}

function restartuj_wszytko() {
    while(plansza.firstChild) {
        plansza.removeChild(plansza.firstChild);
    }
    inicjuj_plansze();
    dodaj_pionki();
    tura = 0;
    ile_pionkow(biale,czarne);
    
}

function ile_pionkow(biale, czarne) {
    for(let x = 0; x < 8; x++) {
        for(let y = 0; y <8; y++) {
            if(pola[x][y].firstChild){
                if(pola[x][y].firstChild.classList.contains("bialyp")) biale++;
                if(pola[x][y].firstChild.classList.contains("czarnyp")) czarne++;
            } 
        }
    }
    //wygrywanie przez wybicie wszystkich
    if(biale == 0) {
        plansza.remove();
        document.getElementById("punkty").textContent = `Czarne wygrały!!`;
    }
    else if(czarne == 0) {
        plansza.remove();
        document.getElementById("punkty").textContent = `Białe wygrały!!`;
    }
    else document.getElementById("punkty").textContent = `Białe: ${biale} Czarne: ${czarne} Tura: ${tura}`;
}

class BialyP {
    constructor() {
        this.pionek = document.createElement("button");
        this.pionek.setAttribute("class", "bialyp");

        this.pionek.addEventListener("click", function() {
            this.poleID = this.parentElement.getAttribute("id");
            if(tura % 2 == 0) {
                if(this.parentElement.classList.contains("zaznaczony")) {
                    usun_zaznaczenia();
                }
                else { //nie jest zaznaczony
                    zaznacz_pole(this);
                    try{
                        if(document.getElementById(this.poleID-11).firstChild) {
                            if(document.getElementById(this.poleID-11).firstChild.classList.contains("czarnyp") && !document.getElementById(this.poleID-22).firstChild)
                            {
                                //if -33 pionek -44 puste - podwójne bicie
                                
                                this.move_button = document.createElement("button");
                                this.move_button.classList.add("move_button");
                                this.move_button.addEventListener("click",function(){
                                    let pionek_index = Number(this.parentElement.getAttribute("id"))+11;
                                    console.log(`usuwam ${pionek_index+11} oraz zbijam ${pionek_index}`);
                                    document.getElementById(pionek_index).lastChild.remove();//this.parentElement.getAttribute("id")+Number(11)
                                    document.getElementById(pionek_index+11).lastChild.remove(); 
                                    const nowy_pionek = new BialyP;
                                    document.getElementById(pionek_index-11).appendChild(nowy_pionek.pionek);
                                    usun_zaznaczenia();
                                    tura++;
                                    ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                                });
                                document.getElementById(this.poleID-22).appendChild(this.move_button);
                            }
                            
                        }
                        else try {
                            this.move_button = document.createElement("button");
                            this.move_button.classList.add("move_button");
                            this.move_button.addEventListener("click",function(){
                                let pionek_index = Number(this.parentElement.getAttribute("id"))+11;
                                console.log(`usuwam ${pionek_index}`);
                                document.getElementById(pionek_index).lastChild.remove(); //this.parentElement.getAttribute("id")+Number(11)
                                const nowy_pionek = new BialyP;
                                document.getElementById(pionek_index-11).appendChild(nowy_pionek.pionek);
                                usun_zaznaczenia();
                                tura++;
                                ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                            });
                            document.getElementById(this.poleID-11).appendChild(this.move_button);
                        }catch{}
                    }catch{}

                    try{
                        if(document.getElementById(this.poleID-9).firstChild) {
                            if(document.getElementById(this.poleID-9).firstChild.classList.contains("czarnyp") && !document.getElementById(this.poleID-18).firstChild)
                            {
                                this.move_button = document.createElement("button");
                                this.move_button.classList.add("move_button");
                                this.move_button.addEventListener("click",function(){
                                    let pionek_index = Number(this.parentElement.getAttribute("id"))+9;
                                    console.log(`usuwam ${pionek_index+9} oraz zbijam ${pionek_index}`);
                                    document.getElementById(pionek_index).lastChild.remove();//this.parentElement.getAttribute("id")+Number(11)
                                    document.getElementById(pionek_index+9).lastChild.remove(); 
                                    const nowy_pionek = new BialyP;
                                    document.getElementById(pionek_index-9).appendChild(nowy_pionek.pionek);
                                    usun_zaznaczenia();
                                    tura++;
                                    ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                                });
                                document.getElementById(this.poleID-18).appendChild(this.move_button);
                            }
                            
                        }
                        else try { 
                            this.move_button = document.createElement("button");
                            this.move_button.classList.add("move_button");
                            this.move_button.addEventListener("click",function(){
                                let pionek_index = Number(this.parentElement.getAttribute("id"))+9;
                                console.log(`usuwam ${pionek_index}`);
                                document.getElementById(pionek_index).lastChild.remove(); //this.parentElement.getAttribute("id")+Number(11)
                                const nowy_pionek = new BialyP;
                                document.getElementById(pionek_index-9).appendChild(nowy_pionek.pionek);
                                usun_zaznaczenia();
                                tura++;
                                ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                                if(pionek_index-9 < 20)         plansza.remove();
                                document.getElementById("punkty").textContent = `Białe wygrały!!`;
                            });
                            document.getElementById(this.poleID-9).appendChild(this.move_button); }catch{}

                    } catch{}   
                }
            }
        });
    }
};

class CzarnyP {
    constructor() {
        this.pionek = document.createElement("button");
        this.pionek.setAttribute("class", "czarnyp");
        this.pionek.addEventListener("click", function() {
            this.poleID = this.parentElement.getAttribute("id");
            if(tura % 2 !== 0) {
                if(this.parentElement.classList.contains("zaznaczony")) {
                    usun_zaznaczenia();
                }
                else { //nie jest zaznaczony
                    zaznacz_pole(this);
                    try{
                        if(document.getElementById(Number(this.poleID)+11).firstChild) {
                            if(document.getElementById(Number(this.poleID)+11).firstChild.classList.contains("bialyp") && !document.getElementById(Number(this.poleID)+22).firstChild)
                            {
                                this.move_button = document.createElement("button");
                                this.move_button.classList.add("move_button");
                                this.move_button.addEventListener("click",function(){
                                    let pionek_index = Number(this.parentElement.getAttribute("id"))-11;
                                    console.log(`usuwam ${pionek_index-11} oraz zbijam ${pionek_index}`);
                                    document.getElementById(pionek_index).lastChild.remove();//this.parentElement.getAttribute("id")+Number(11)
                                    document.getElementById(pionek_index-11).lastChild.remove(); 
                                    const nowy_pionek = new CzarnyP;
                                    document.getElementById(pionek_index+11).appendChild(nowy_pionek.pionek);
                                    usun_zaznaczenia();
                                    tura++;
                                    ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                                });
                                document.getElementById(Number(this.poleID)+22).appendChild(this.move_button);
                            }
                            
                        }
                        else {
                            this.move_button = document.createElement("button");
                            this.move_button.classList.add("move_button");
                            this.move_button.addEventListener("click",function(){
                                let pionek_index = Number(this.parentElement.getAttribute("id"))-11;
                                console.log(`usuwam ${pionek_index}`);
                                document.getElementById(pionek_index).lastChild.remove(); //this.parentElement.getAttribute("id")+Number(11)
                                const nowy_pionek = new CzarnyP;
                                document.getElementById(pionek_index+11).appendChild(nowy_pionek.pionek);
                                usun_zaznaczenia();
                                tura++;
                                ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                            });
                            document.getElementById(Number(this.poleID)+11).appendChild(this.move_button);
                        }
                    }catch{}

                    try{
                        if(document.getElementById(Number(this.poleID)+9).firstChild) {
                            if(document.getElementById(Number(this.poleID)+9).firstChild.classList.contains("bialyp") && !document.getElementById(Number(this.poleID)+18).firstChild)
                            {
                                this.move_button = document.createElement("button");
                                this.move_button.classList.add("move_button");
                                this.move_button.addEventListener("click",function(){
                                    let pionek_index = Number(this.parentElement.getAttribute("id"))-9;
                                    console.log(`usuwam ${pionek_index-9} oraz zbijam ${pionek_index}`);
                                    document.getElementById(pionek_index).lastChild.remove();
                                    document.getElementById(pionek_index-9).lastChild.remove(); 
                                    const nowy_pionek = new CzarnyP;
                                    document.getElementById(pionek_index+9).appendChild(nowy_pionek.pionek);
                                    usun_zaznaczenia();
                                    tura++;
                                    ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                                });
                                document.getElementById(Number(this.poleID)+18).appendChild(this.move_button);
                            }
                            
                        }
                        else {
                            this.move_button = document.createElement("button");
                            this.move_button.classList.add("move_button");
                            this.move_button.addEventListener("click",function(){
                                let pionek_index = Number(this.parentElement.getAttribute("id"))-9;
                                console.log(`usuwam ${pionek_index}`);
                                document.getElementById(pionek_index).lastChild.remove(); //this.parentElement.getAttribute("id")+Number(11)
                                const nowy_pionek = new CzarnyP;
                                document.getElementById(pionek_index+9).appendChild(nowy_pionek.pionek);
                                usun_zaznaczenia();
                                tura++;
                                ile_pionkow(biale, czarne); //odświerzanie ilości pionków
                            });
                            document.getElementById(Number(this.poleID)+9).appendChild(this.move_button); 
                        } 
                    }  catch{}
                }
            }
        });
    }
}
restartuj_wszytko();    //zaczyna grę

/*
a
plansza = document.getElementById("plansza"); let tura = 0; let czarne = 0; let biale = 0; const pola = []; for (let i = 0; i < 8; i++) { pola[i] = []; } function usun_zaznaczenia() { for (let x = 0; x < 8; x++) { for (let y = 0; y < 8; y++) { if(pola[x][y].classList.contains("zaznaczony")) pola[x][y].classList.remove("zaznaczony"); if(pola[x][y].firstChild && pola[x][y].firstChild.classList.contains("move_button")) pola[x][y].firstChild.remove(); } } } function zaznacz_pole(pionek) { usun_zaznaczenia(); pionek.parentElement.classList.add("zaznaczony"); } function inicjuj_plansze() { for (let x = 0; x < 8; x++) { for (let y = 0; y < 8; y++) { pola[x][y] = document.createElement("div"); pola[x][y].setAttribute("id", `${x+1}${y+1}`); pola[x][y].setAttribute("class", "pole"); if((y + x) % 2 == 0) pola[x][y].classList.add("czarne"); else pola[x][y].classList.add("biale");; plansza.appendChild(pola[x][y]); } } } function dodaj_pionki() { for (let x = 6; x < 8; x++) { for (let y = 0; y < 8; y++) { if((y + x) % 2 == 0) { const pionek = new BialyP(); pola[x][y].appendChild(pionek.pionek); } } } for (let x = 0; x < 2; x++) { for (let y = 0; y < 8; y++) { if((y + x) % 2 == 0) { const pionek = new CzarnyP(); pola[x][y].appendChild(pionek.pionek); } } } } function restartuj_wszytko() { while(plansza.firstChild) { plansza.removeChild(plansza.firstChild); } inicjuj_plansze(); dodaj_pionki(); tura = 0; ile_pionkow(biale,czarne); } function ile_pionkow(biale, czarne) { for(let x = 0; x < 8; x++) { for(let y = 0; y <8; y++) { if(pola[x][y].firstChild){ if(pola[x][y].firstChild.classList.contains("bialyp")) biale++; if(pola[x][y].firstChild.classList.contains("czarnyp")) czarne++; } } } document.getElementById("punkty").textContent = `Białe: ${biale} Czarne: ${czarne} Tura: ${tura}`; } class BialyP { constructor() { this.pionek = document.createElement("button"); this.pionek.setAttribute("class", "bialyp"); this.pionek.addEventListener("click", function() { this.poleID = this.parentElement.getAttribute("id"); if(tura % 2 == 0) { if(this.parentElement.classList.contains("zaznaczony")) { usun_zaznaczenia(); } else { zaznacz_pole(this); try{ if(document.getElementById(this.poleID-11).firstChild) { if(document.getElementById(this.poleID-11).firstChild.classList.contains("czarnyp") && !document.getElementById(this.poleID-22).firstChild) { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))+11; console.log(`usuwam ${pionek_index+11} oraz zbijam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); document.getElementById(pionek_index+11).lastChild.remove(); const nowy_pionek = new BialyP; document.getElementById(pionek_index-11).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(this.poleID-22).appendChild(this.move_button); } } else try { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))+11; console.log(`usuwam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); const nowy_pionek = new BialyP; document.getElementById(pionek_index-11).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(this.poleID-11).appendChild(this.move_button); }catch{} }catch{} try{ if(document.getElementById(this.poleID-9).firstChild) { if(document.getElementById(this.poleID-9).firstChild.classList.contains("czarnyp") && !document.getElementById(this.poleID-18).firstChild) { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))+9; console.log(`usuwam ${pionek_index+9} oraz zbijam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); document.getElementById(pionek_index+9).lastChild.remove(); const nowy_pionek = new BialyP; document.getElementById(pionek_index-9).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(this.poleID-18).appendChild(this.move_button); } } else try { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))+9; console.log(`usuwam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); const nowy_pionek = new BialyP; document.getElementById(pionek_index-9).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(this.poleID-9).appendChild(this.move_button); }catch{} } catch{} } } }); } }; class CzarnyP { constructor() { this.pionek = document.createElement("button"); this.pionek.setAttribute("class", "czarnyp"); this.pionek.addEventListener("click", function() { this.poleID = this.parentElement.getAttribute("id"); if(tura % 2 !== 0) { if(this.parentElement.classList.contains("zaznaczony")) { usun_zaznaczenia(); } else { zaznacz_pole(this); try{ if(document.getElementById(Number(this.poleID)+11).firstChild) { if(document.getElementById(Number(this.poleID)+11).firstChild.classList.contains("bialyp") && !document.getElementById(Number(this.poleID)+22).firstChild) { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))-11; console.log(`usuwam ${pionek_index-11} oraz zbijam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); document.getElementById(pionek_index-11).lastChild.remove(); const nowy_pionek = new CzarnyP; document.getElementById(pionek_index+11).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(Number(this.poleID)+22).appendChild(this.move_button); } } else { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))-11; console.log(`usuwam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); const nowy_pionek = new CzarnyP; document.getElementById(pionek_index+11).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(Number(this.poleID)+11).appendChild(this.move_button); } }catch{} try{ if(document.getElementById(Number(this.poleID)+9).firstChild) { if(document.getElementById(Number(this.poleID)+9).firstChild.classList.contains("bialyp") && !document.getElementById(Number(this.poleID)+18).firstChild) { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))-9; console.log(`usuwam ${pionek_index-9} oraz zbijam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); document.getElementById(pionek_index-9).lastChild.remove(); const nowy_pionek = new CzarnyP; document.getElementById(pionek_index+9).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(Number(this.poleID)+18).appendChild(this.move_button); } } else { this.move_button = document.createElement("button"); this.move_button.classList.add("move_button"); this.move_button.addEventListener("click",function(){ let pionek_index = Number(this.parentElement.getAttribute("id"))-9; console.log(`usuwam ${pionek_index}`); document.getElementById(pionek_index).lastChild.remove(); const nowy_pionek = new CzarnyP; document.getElementById(pionek_index+9).appendChild(nowy_pionek.pionek); usun_zaznaczenia(); tura++; ile_pionkow(biale, czarne); }); document.getElementById(Number(this.poleID)+9).appendChild(this.move_button); } } catch{} } } }); } } restartuj_wszytko();
a
*/