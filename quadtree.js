let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const displayColor = "red";
//make a rectangle based on its center
function rectangle(x,y,w,h){
    ctx.beginPath();
    //nw vector
    ctx.moveTo(y - h/2, x - w/2)
    //ne vector
    ctx.lineTo(y - h/2, x + w/2);
    //se vector
    ctx.lineTo(y + h/2, x + w/2);
    //sw vector
    ctx.lineTo(y + h/2, x - w/2);
    ctx.closePath();
    ctx.strokeStyle = displayColor;
    ctx.stroke();
}
function range(min, max){
    return Math.random()*(max-min)+min;
}

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = displayColor;
        ctx.fill();
    }
}
class Rectangle {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h= h;
    }
    contains(point){
        //nw x
        return(point.x > this.x - this.w && 
        //se x
            point.x < this.x + this.w &&
        //nw y
            point.y > this.y - this.h &&
        //se y
            point.y < this.y + this.h)
    }
}
class Quadtree {
    constructor(boundary, number){
        this.boundary = boundary;
        this.capacity = number;
        this.points = [];
        this.divided = false;
    }
    render(){
        
        for(let p of this.points){
            p.draw();
        }
        rectangle(this.boundary.y, this.boundary.x, this.boundary.w, this.boundary.h);
        if(this.divided){
            this.northWest.render();
            this.northEast.render();
            this.southWest.render();
            this.southEast.render();
        }
        
    }
    //pass the points to the subdivisions
    trespass(){
            //try putting each of the 4 points to their respective new boundary
            for(let pp of this.points){
                //it already checks if the point is in the boundary area
                this.northWest.insert(pp);
                this.northEast.insert(pp);
                this.southWest.insert(pp);
                this.southEast.insert(pp);
            }
            //empty the original points array
            this.points = []
    }
    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x - w/4, y - h/4, w/2, h/2);
        this.northWest = new Quadtree(nw, this.capacity);
        let ne = new Rectangle(x + w/4, y - h/4, w/2, h/2);
        this.northEast = new Quadtree(ne, this.capacity);
        let sw = new Rectangle(x - w/4, y + h/4, w/2, h/2);
        this.southWest = new Quadtree(sw, this.capacity);
        let se = new Rectangle(x + w/4, y + h/4, w/2, h/2);
        this.southEast = new Quadtree(se, this.capacity);
        this.divided = true;
        this.trespass();
        this.render();
    }
    insert(point){
        if(!this.boundary.contains(point)){
            return;
        }
        if(this.points.length < this.capacity){
            this.points.push(point);
        }else{
            if(!this.divided){
                this.subdivide();
               
            }
            this.northWest.insert(point);
            this.northEast.insert(point);
            this.southWest.insert(point);
            this.southEast.insert(point);
        }
    }
    
}
