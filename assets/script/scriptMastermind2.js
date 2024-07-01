
let ligne=document.getElementsByClassName('ligne')
let buttonvalider=document.getElementById('valider')
let idligne=['one','tow','three','four']
let idlignereverse=['four','three','tow','one']
let listecouleur=['blue','green','yellow','red','black','white','neutre']
let listecouleurfr=['Bleu','Vert','Jaune','Rouge','Noir','Blanc','Neutre']
let couleurutilisé=['','','','']
let valide=true
let code=[]
let compteurLigne=0
let stock=""
let statut=document.getElementById('statut')




function poser(id){
    if (valide==false){
        let line=document.getElementById(id)
        let pos=idligne.indexOf(id);
        
        if (stock=='neutre'){
            couleurutilisé[pos]=''
            line.innerText=''
            line.style.background='grey'
            let fullneutre=0
            for (let i=0;i<4;i++){
                let l=document.getElementById(idligne[i])
                if (l.innerText==''){
                    fullneutre++
                }
            }
            if (fullneutre==4){
                statut.innerText='Sélectionnez une nouvelle couleur'
            }
        }else{
            if (!(couleurutilisé.includes(stock))){
                if (!(line.innerText=='')){
                    couleurutilisé[pos]=''
                }
                couleurutilisé[pos]=(stock)
                line.innerText=stock
                line.style.background=stock
            }else{
                for (let i=0;i<4;i++){
                    let l=document.getElementById(idligne[i])
                    if(l.innerText==stock){
                        l.innerText=''
                        l.style.background='grey'
                    }
                }
                couleurutilisé[pos]=(stock)
                line.innerText=stock
                line.style.background=stock
            }
            
        }
    }
}

function jouer(couleur){
    if (valide==false){
        stock=couleur
        let pos=listecouleur.indexOf(stock);
        statut.innerText='Couleur sélectionnée : '+listecouleurfr[pos]
        
        let fullneutre=0
        for (let i=0;i<4;i++){
            let l=document.getElementById(idligne[i])
            if (l.innerText==''){
                fullneutre++
            }
        }
        if (fullneutre==4){
            statut.innerText='Sélectionner une nouvelle couleur'
        }
    }
}

function retour(){
    let statut=document.getElementById('statut')
    if (valide==false){
        couleurutilisé=['','','','']
        for (let i=0;i<4;i++){
            let line=document.getElementById(idligne[i])
            line.innerText=''
            line.style.background='grey'
        }
    }
    statut.innerText='Sélectionner une couleur'
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
    couleurutilisé=['','','','']
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
    couleurutilisé=['','','',''];
    
    for (let i=0;i<4;i++){
        let line=document.getElementById(idlignereverse[i])
        line.style.background='grey'
        line.innerText=''
    }
    for (let i=0;i<4;i++){
        let line=document.getElementById(idligne[i])
        line.style.background=code[i]
    }
    
    statut.innerText='Appuyer sur rejouer'
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
    couleurutilisé=['','','','']
    
    for (let i=0;i<4;i++){
        let line=document.getElementById(idlignereverse[i])
        if (line.innerText!==''){
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
    let statut=document.getElementById('statut')
    
    
    if (!(couleurutilisé.includes(''))){
        valide=true
        verifier()
        return
    }
    
    if (buttonvalider.innerText=='Rejouer'){
        supprimerLignesEnTrop()
        compteurLigne=0
        buttonvalider.innerText='Valider'
        code=[]
        generationCode()
        statut.innerText='Sélectionner une couleur'
        valide=false
        return
    }
    if (buttonvalider.innerText=='Jouer'){
        buttonvalider.innerText='Valider'
        statut.innerText=''
        generationCode()
        statut.innerText='Sélectionner une couleur'
        valide=false
        return
    }
    
}