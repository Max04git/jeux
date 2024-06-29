
let ligne=document.getElementsByClassName('ligne')
let buttonvalider=document.getElementById('valider')
let idligne=['one','tow','three','four']
let idlignereverse=['four','three','tow','one']
let listecouleur=['yellow','blue','red','green','black','white']
let couleurutilisé=[]
let valide=false
let code=['yellow','blue','red','green']
let compteurLigne = 0;


function removeLigne(indices) {
    indices.forEach(i=>document.getElementById(grille[i]).classList.remove("ligne"));
}

function restart(){
    
}

function jouer(couleur){
    
    if (valide==false){
        for (let i=0;i<4;i++){
            let line=document.getElementById(idligne[i])
            if (line.innerText=='' && !(couleurutilisé.includes(couleur))){
                couleurutilisé.push(couleur)
                line.innerText=couleur
                line.style.background=couleur
                return
            }
        }
    }
}

function retour(){
    if (valide==false){
        for (let i=0;i<4;i++){
            let line=document.getElementById(idlignereverse[i])
            if (line.innerText!==''){
                couleurutilisé.pop()
                line.style.background='grey'
                line.innerText=''
                return
            }
        }
    }
}

function creerNouvelleLigne() {
    compteurLigne++
    let container=document.querySelector('.container')
    let plateauActuel=document.querySelector('.plateau')
    let nouveauPlateau=plateauActuel.cloneNode(true)

    container.insertBefore(nouveauPlateau,container.firstChild)
    
    let bon=document.getElementById('bon')
    let mal=document.getElementById('mal')
    bon.innerText=''
    mal.innerText=''
    couleurutilisé=[];
    valide=false;
    for (let i=0;i<4;i++){
        let line=document.getElementById(idlignereverse[i])
        line.style.background='grey'
        line.innerText=''
        
    }
    
}

function creerLigneSolution(victoire) {
    let container=document.querySelector('.container')
    let plateauActuel=document.querySelector('.plateau')
    let nouveauPlateau=plateauActuel.cloneNode(true)
    container.insertBefore(nouveauPlateau,container.firstChild)
    
    let bon=document.getElementById('bon')
    let mal=document.getElementById('mal')
    if (victoire){
        bon.innerText='Victoire'
    }else{
        bon.innerText='Défaite'
    }
    mal.innerText='Solution'
    mal.style.fontSize='20px'
    bon.style.fontSize='20px'
    couleurutilisé=[];
    for (let i=0;i<4;i++){
        let line=document.getElementById(listecouleur[i])
        line.style.background=code[i]
    }
    valide=true;
    buttonvalider.innerText='Rejouer'
}


function verifier(){
    let bon=document.getElementById('bon')
    let mal=document.getElementById('mal')
    let numbon=0
    let nummal=0
    for (let i=0;i<4;i++){
        if(code[i]==couleurutilisé[i]){
            numbon++
        }else{
            if (code.includes(couleurutilisé[i])){
                nummal++
            }
        }
    }
    bon.innerText='Bien placé : '+numbon
    mal.innerText='Mal placé : '+nummal
    if (numbon==4){
        creerLigneSolution(true)
        return
    }
    if (compteurLigne==9){
        creerLigneSolution(false)
    }
    creerNouvelleLigne();
}

function supprimerLignesEnTrop() {
    let plateaux=document.querySelectorAll('.plateau')
    plateaux.forEach((plateau, index)=>{
        if (index<plateaux.length-1){
            plateau.remove()
        }
    })
    couleurutilisé=[]
    
    for (let i=0;i<4;i++){
        let line=document.getElementById(idlignereverse[i])
        if (line.innerText!==''){
            couleurutilisé.pop()
            line.style.background='grey'
            line.innerText=''
        }
    }
    
    let bon=document.getElementById('bon')
    let mal=document.getElementById('mal')
    bon.innerText=''
    mal.innerText=''
}



function valider(){
    let buttonvalider=document.getElementById('valider')
    
    if (couleurutilisé.length==4){
        valide=true
        verifier()
        return
    }
    
    if (buttonvalider.innerText='Rejouer'){
        supprimerLignesEnTrop()
        buttonvalider.innerText='Valider'
        valide=false
        return
    }
    
}