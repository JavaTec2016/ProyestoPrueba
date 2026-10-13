let boundary = new Rectangle(200,200,400,400);
let qt = new Quadtree(boundary, 4);
console.log(qt);
let i = 0;
let zeeD =boundary.h/2;

let altera = 0, dif = -3;
function zigzag(){
    if(i < 1333){
        let chooser = Math.random()*100;
        if(chooser+altera >= 50){
            zeeD += 1.3
            altera-=dif
        }else{
            zeeD -= 1.3
            altera+=dif
        }
        let e = new Point(i*0.3, zeeD)    
        qt.insert(e);
        i++;
    }
}

function limit(corner, divisions){
    let x = 0;    
    let y = 0;
    let chunk = {
        x:(boundary.x/2**divisions),
        y:(boundary.y/2**divisions)
    }
    console.log(chunk.x, chunk.y)
    switch(corner){
        case "nw":
            x = chunk.x;
            y = chunk.y;
            break;
        case "ne":
            x = boundary.x-chunk.x;
            y = chunk.y;
            break;
        case "sw":
            x = chunk.x;
            y = boundary.y-chunk.y;
            break;    
        case "se":
            x = boundary.x-chunk.x;
            y = boundary.y-chunk.y;
            break;
        default:
            console.error("invalid corner, please use one of the listed below:\n nw (North West)\n ne (North East)\n sw (South West)\n se (South East)");
            return;
    }
    for(i = 0; i < 5; i++){
        let pX = range(x-(x/2), x*2)
        let pY = range(y-(y/2), y*2);
        let p = new Point(pX,pY)
        qt.insert(p);
        p.draw();

    }
}
//limit("se", 1);
//qt.render();
//qt.render();
setInterval(zigzag,13)
/*window.addEventListener("click", (e)=>{ 
    for(let i = 0; i < 1; i++){
        let punto = new Point(range(e.clientX-10,e.clientX+10), range(e.clientY-10,e.clientY+10));
        qt.insert(punto);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        qt.render();
        console.log(qt);
    }
})*/
