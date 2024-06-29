
let ligne=document.getElementsByClassName('ligne')
let buttonvalider=document.getElementById('valider')
let idligne=['one','tow','three','four']
let idlignereverse=['four','three','tow','one']
let listecouleur=['yellow','blue','red','green','black','white']
let couleurutilisé=[]
let valide=true
let code=[]
let compteurLigne=0






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
        let line=document.getElementById(idlignereverse[i])
        line.style.background='grey'
        line.innerText=''
        
    }
    for (let i=0;i<4;i++){
        let line=document.getElementById(idligne[i])
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
        return
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generationCode(){
    let num=[]
    for (let i=0;i<4;i++){
        num.push(getRandomInt(6))
    }
    
    for (let i=0;i<4;i++){
        for (let j=i+1;j<4;j++){
            if (num[i]==num[j]){
                generationCode()
                return
            }
        }
    }
    
    for (let i=0;i<4;i++){
        code.push(listecouleur[num[i]])
    }
    
}

function valider(){
    let buttonvalider=document.getElementById('valider')
    
    
    if (couleurutilisé.length==4){
        valide=true
        verifier()
        return
    }
    
    if (buttonvalider.innerText=='Rejouer'){
        supprimerLignesEnTrop()
        compteurLigne=0
        buttonvalider.innerText='Valider'
        generationCode()
        valide=false
        return
    }
    if (buttonvalider.innerText=='Jouer'){
        buttonvalider.innerText='Valider'
        generationCode()
        valide=false
        return
    }
    
}