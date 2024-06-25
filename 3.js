
const loop = () => {
    let simbol = ""
    for(let i = 5; i > 0; i--){
        for(let j = 5; j > 0; j--) {
            if(j > i) {
                simbol += " ";
            }else if (i == 4){
                simbol += "+ "
            }else if (i == 2){
                simbol += "+ "
            }else if(j%2 !==0){
                simbol += "# "
            }else if(j%2 == 0){
                simbol += "+ "
            }

        }
        simbol += "\n";
    }
    
    return simbol;
}
console.log(loop())