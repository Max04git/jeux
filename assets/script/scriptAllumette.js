let affichage=document.getElementById('affichage');
let reste=document.getElementById('reste');
let joueur=document.getElementById('joueur');
let newvaleur='';
let go=false;




function restart(){
    affichage.innerText='|||||||||||||||||||||';
    newvaleur='|||||||||||||||||||||';
    go=true
    var buttons=document.querySelectorAll('.button#start');
    buttons.forEach(button => button.removeAttribute('id'));
    compte();
}

function prendre(valeur){
    if (go==true){
        if (affichage.innerText=='Le joueur 2 a perdu' || affichage.innerText=='Le joueur 1 a perdu'){
            return
        }else{
            if ((affichage.innerText=='|||' && valeur==3) || (affichage.innerText=='||' && valeur>=2) || (affichage.innerText=='|' && valeur>=1) || (affichage.innerText=='Perdu')){
                if (joueur.innerText=='Le joueur 1 joue'){
                    affichage.innerText='Le joueur 1 a perdu';
                }else{
                    affichage.innerText='Le joueur 2 a perdu';
                }
            }else{
                newvaleur=newvaleur.slice(0,-valeur) || affichage.innerText;
                affichage.innerText=newvaleur;
            }
            compte();
        }
    }
}

function compte(){
    if (affichage.innerText=='Le joueur 2 a perdu' || affichage.innerText=='Le joueur 1 a perdu'){
        joueur.innerText='Partie finie'
        reste.innerText=`Il reste 0 allumette`;
    }else{
        const string=affichage.innerText;
        if (string.length==1){
            reste.innerText=`Il reste ${string.length} allumette`;
        }else{
            reste.innerText=`Il reste ${string.length} allumettes`;
        }
        if (joueur.innerText=='Le joueur 1 joue'){
            joueur.innerText='Le joueur 2 joue'
        }else{
            joueur.innerText='Le joueur 1 joue'
        }
    }
}
