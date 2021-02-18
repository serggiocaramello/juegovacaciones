    var colorA = ['R','G','Y','B'];
    var numerosA = ['0','1','2','3','4','5','6','7','8','9','SK','V','+2','WD'];
    var barajaA = [];
    for (var colorACounter= 0; colorACounter < 4; colorACounter++){
        for (var numerosACounter = 0; numerosACounter < 14; numerosACounter++){
            //console.log(numerosA[numerosACounter]+ colorA[colorACounter]);
            barajaA.push(numerosA[numerosACounter]+ colorA[colorACounter])
        } 
    }
    var colorB = ['r','g','y','b'];
    var numerosB = ['1','2','3','4','5','6','7','8','9','SK','V','+2','+4'];
    var barajaB = [];
    for (var colorBCounter= 0; colorBCounter < 4; colorBCounter++){
        for (var numerosBCounter = 0; numerosBCounter < 13; numerosBCounter++){
            //console.log(numerosB[numerosBCounter]+ colorB[colorBCounter]);
            barajaB.push(numerosB[numerosBCounter]+ colorB[colorBCounter])
        } 
    }
    var mazo = [];
    mazo.push(barajaA + barajaB);


