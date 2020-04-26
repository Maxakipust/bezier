window.onload=()=>{
    let points = [
        {
            x:0,
            y:0,
        },{
            x:100,
            y:150
        },{
            x:200,
            y:0,
        },{
            x:300,
            y:150,
        },{
            x:0,
            y:0,
        }
    ]
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    drawBezier(points, 100, ctx);
};

function drawBezier(points, segments, ctx){
    let prevPoint;
    let t;
    for(t = 0; t<=1; t+= 1/segments){
        let point = rec(points, t);
        if(prevPoint){
            ctx.lineTo(point.x, point.y);
        }else{
            ctx.moveTo(point.x, point.y);
        }
        prevPoint = point;
    }
    if(t!==1){
        t = 1;
        let point = rec(points, t);
        if(prevPoint){
            ctx.lineTo(point.x, point.y);
        }else{
            ctx.moveTo(point.x, point.y);
        }
    }
    ctx.stroke();
}

function rec(points, t){
    if(points.length === 2){
        return pointOnLine(points[0], points[1], t);
    }else{
        let newPoints = [];
        points.forEach((element, index) => {
            let next = points[index+1];
            if(next){
                newPoints.push(pointOnLine(element, next, t));
            }
        });
        return rec(newPoints, t);
    }
}

function quadraticCurve(points, t){
    return [pointOnLine(points[0], points[1], t), pointOnLine(points[1], points[2], t)];
}

function pointOnLine(start, end, t){
    return {
        x: start.x*(1-t) + end.x*t,
        y: start.y*(1-t) + end.y*t,
    }
}