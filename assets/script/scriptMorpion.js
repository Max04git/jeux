
let joueur=document.getElementById('joueur');
let compteur=0;
let grille=[1,2,3,4,5,6,7,8,9]
let stock0=[]
let stock1=[]
let stock2=[]
let line=[]
let gagnant=true
let go=false;



function removeLigne(indices) {
    indices.forEach(i=>document.getElementById(grille[i]).classList.remove("ligne"));
}

function restart(){
    stock0=[]
    stock1=[]
    stock2=[]
    if (compteur!==0){
        for (let i=0;i<9;i++){
            let sq=document.getElementById(grille[i])
            sq.innerText=''
        }
        if (gagnant){
            joueur.innerText='Le joueur 2 joue'
        }else{
            joueur.innerText='Le joueur 1 joue'
        }
        removeLigne(line)
    }
    line=[]
    go=true
    compteur=0
    compte();
}

function jouer(num){
    if (go==true){
        let sq=document.getElementById(num)
        if (joueur.innerText=='Le joueur 1 joue' && sq.innerText==''){
            sq.innerText='o'
            compte()
        }else{
            if (joueur.innerText=='Le joueur 2 joue' && sq.innerText==''){
                sq.innerText='x'
                compte()
            }
        }
    }
}


function victoire(){
    stock0=[]
    stock1=[]
    stock2=[]
    for (let i=0;i<3;i++){
        sq=document.getElementById(grille[i])
        stock0.push(sq.innerText)
    }
    for (let i=3;i<6;i++){
        sq=document.getElementById(grille[i])
        stock1.push(sq.innerText)
    }
    for (let i=6;i<9;i++){
        sq=document.getElementById(grille[i])
        stock2.push(sq.innerText)
    }
    function addLine(className, indices) {
        indices.forEach(i=>document.getElementById(grille[i]).classList.add(className));
    }
    
    //ligne
    if (stock0[0]=='x' && stock0[1]=='x' && stock0[2]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[0,1,2]
    }
    if (stock0[0]=='o' && stock0[1]=='o' && stock0[2]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[0,1,2]
    }
    if (stock1[0]=='x' && stock1[1]=='x' && stock1[2]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[3,4,5]
        
    }
    if (stock1[0]=='o' && stock1[1]=='o' && stock1[2]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[3,4,5]
    }
    if (stock2[0]=='x' && stock2[1]=='x' && stock2[2]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[6,7,8]
         
    }
    if (stock2[0]=='o' && stock2[1]=='o' && stock2[2]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[6,7,8]
         
    }
    //diagonale
    if (stock0[0]=='x' && stock1[1]=='x' && stock2[2]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[0,4,8]
         
    }
    if (stock0[0]=='o' && stock1[1]=='o' && stock2[2]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[0,4,8]
         
    }
    if (stock0[2]=='x' && stock1[1]=='x' && stock2[0]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[2,4,6]
         
    }
    if (stock0[2]=='o' && stock1[1]=='o' && stock2[0]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[2,4,6]
         
    }
    //colonne
    if (stock0[0]=='x' && stock1[0]=='x' && stock2[0]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[0,3,6]
         
    }
    if (stock0[0]=='o' && stock1[0]=='o' && stock2[0]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[0,3,6]
         
    }
    if (stock0[1]=='x' && stock1[1]=='x' && stock2[1]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[1,4,7]
         
    }
    if (stock0[1]=='o' && stock1[1]=='o' && stock2[1]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[1,4,7]
         
    }
    if (stock0[2]=='x' && stock1[2]=='x' && stock2[2]=='x'){
        joueur.innerText='Le joueur 2 a gagné !'
        line=[2,5,8]
         
    }
    if (stock0[2]=='o' && stock1[2]=='o' && stock2[2]=='o'){
        joueur.innerText='Le joueur 1 a gagné !'
        line=[2,5,8]
         
    }
    if (line.length>0){
        addLine('ligne',line);
    }
    return 

}


function compte(){
    compteur++
    victoire()
    
    if (joueur.innerText=='Le joueur 1 a gagné !' || joueur.innerText=='Le joueur 2 a gagné !'){
        if (joueur.innerText=='Le joueur 1 a gagné !'){
            gagnant=false
        }else{
            gagnant=true
        }
        go=false
    }else{
        if (compteur<10){
            if (joueur.innerText=='Le joueur 1 joue'){
                joueur.innerText='Le joueur 2 joue'
            }else{
                joueur.innerText='Le joueur 1 joue'
            }
        }else{
            joueur.innerText='égalité'
            gagnant=!gagnant
        }
    }
}