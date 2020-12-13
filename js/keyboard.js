// function moveOnHistory(e){
//     var h=JSON.parse(localStorage.getItem("history"));
//     var hh=h[h.length-1]
//     //keyCode===40 es flecha abajo,keyCode===38 es parriba
//     if(e.keyCode==38){
//         e.preventDefault();
//         keyCounter+=1;
//         document.getElementById(contador).value=hh;
//     }
//     else if (e.keyCode==40){
//         e.preventDefault();
//         if(keyCounter>0){
//             keyCounter-=1;
//             document.getElementById(contador).value=hh;
//         }
//     }
//     console.log("entre y keyCounter sale valiendo: ",keyCounter);
// }