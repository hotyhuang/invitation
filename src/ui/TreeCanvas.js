import React, { Component } from 'react'
import Flower1 from '../img/flower_1'
import Flower2 from '../img/flower_2'
import Flower3 from '../img/flower_3'
import Flower4 from '../img/flower_4'
import Flower5 from '../img/flower_5'
import Flower6 from '../img/flower_6'

const WIDTH_THRESHOLD = 420,
    HEIGHT_THRESHOLD = 560
const width = Math.min(window.innerWidth, WIDTH_THRESHOLD),
        height = Math.max(window.innerHeight, HEIGHT_THRESHOLD)

const FLOWER_RADIUS = 10
const FLOWER_NUMBER = 10

const FLOWERS = [Flower1, Flower2, Flower3, Flower4, Flower5, Flower6]

const getRandomFlower = () => {
    const randomIndex = Math.floor(FLOWERS.length * Math.random())
    return FLOWERS[randomIndex]
}

const GAP_SCALE = 20
const getRandomScale = () => GAP_SCALE*Math.random()
const COLORS = [
    'rgba(3, 169, 244, 0.7)',
    'rgba(244, 67, 54, 0.7)',
    'rgba(233, 30, 99, 0.7)',
    'rgba(156, 39, 176, 0.7)',
    'rgba(63, 81, 181, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.7)',
    'rgba(76, 175, 80, 0.7)',
    'rgba(205, 220, 57, 0.7)',
    'rgba(255, 235, 59, 0.7)',
    'rgba(255, 152, 0, 0.7)',
    'rgba(121, 85, 72, 0.7)',
    'rgba(158, 158, 158, 0.7)'
]
const getRandomColor = () => COLORS[Math.floor(COLORS.length*Math.random())]

const getSymmetryPoints = points => [
    {x: points[2].x, y: points[2].y},
    {x: 2*points[2].x - points[1].x, y: 2*points[2].y - points[1].y},
    {x: 2*points[2].x - points[0].x, y: 2*points[2].y - points[0].y}
]
const getPointsAsArray = points =>
    [points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y]

const points1 = [
    {x: 0, y: 0},
    {x: 20, y: 50},
    {x: (width - 50)/2, y: 20}
]
const symPoints1 = getSymmetryPoints(points1)
const points2 = [
    {x: (width - 20), y: 0},
    {x: (width*6/7), y: 100},
    {x: width, y: height - 150}
]
const points3 = [
    {x: width, y: height - 40},
    {x: width - 40, y: height + 30},
    {x: (width - 20)/2, y: height - 20}
]
const symPoints3 = getSymmetryPoints(points3)
const points4 = [
    {x: 0, y: height - 100},
    {x: 40, y: height - 80},
    {x: 0, y: 80}
]

/**
 * Animates bezier-curve
 * 
 * @param ctx       The canvas context to draw to
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the control point
 * @param y1        The y-coord of the control point
 * @param x2        The x-coord of the end point
 * @param y2        The y-coord of the end point
 * @param duration  The duration in milliseconds
 */
function animatePathDrawing(ctx, pushFlower, params) {
    var start = null, index = 0,
        flowerCollections = []
    
    var step = (timestamp) => {
        if (start === null)
            start = timestamp;

        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // draw previous curve
        for (let i = 0; i < index; i++) {
            const [nx0, ny0, nx1, ny1, nx2, ny2] = params[i]
            ctx.beginPath()
            ctx.moveTo( nx0, ny0 )
            ctx.quadraticCurveTo( nx1, ny1, nx2, ny2 )
            ctx.stroke()
            ctx.closePath()
        }

        // Draw curve
        const [x0, y0, x1, y1, x2, y2, duration, flowerNumber = FLOWER_NUMBER] = params[index]
        var delta = timestamp - start,
            progress = Math.min(delta / duration, 1);

        drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress, flowerCollections, pushFlower, flowerNumber);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else if (index < params.length - 1) {
            start = null
            index++
            flowerCollections = []
            window.requestAnimationFrame(step)
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Draws a splitted bezier-curve
 * 
 * @param ctx       The canvas context to draw to
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the control point
 * @param y1        The y-coord of the control point
 * @param x2        The x-coord of the end point
 * @param y2        The y-coord of the end point
 * @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
 * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
 */
function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1, flowerCollections, pushFlower, flowerNumber) {
    ctx.beginPath();
    
    if( 0.0 === t0 && t1 === 1.0 ) {
        ctx.moveTo( x0, y0 );
        ctx.quadraticCurveTo( x1, y1, x2, y2 );
    } else if( t0 !== t1 ) {
        var t00 = t0 * t0,
            t01 = 1.0 - t0,
            t02 = t01 * t01,
            t03 = 2.0 * t0 * t01;
        
        var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
            ny0 = t02 * y0 + t03 * y1 + t00 * y2;
        
        t00 = t1 * t1;
        t01 = 1.0 - t1;
        t02 = t01 * t01;
        t03 = 2.0 * t1 * t01;
        
        var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
            ny2 = t02 * y0 + t03 * y1 + t00 * y2;
        
        var nx1 = lerp ( lerp ( x0 , x1 , t0 ) , lerp ( x1 , x2 , t0 ) , t1 ),
            ny1 = lerp ( lerp ( y0 , y1 , t0 ) , lerp ( y1 , y2 , t0 ) , t1 );
        
        ctx.moveTo( nx0, ny0 );
        ctx.quadraticCurveTo( nx1, ny1, nx2, ny2 );

        // add flowers
        let len = flowerCollections.length
        if ((t1 - t0)*flowerNumber > len
            && !(((t1 - t0) > 1 - (1/flowerNumber)) && len === 0)
        ) {
            const fx = nx2 - FLOWER_RADIUS + (1 - 2*(len%2))*getRandomScale(),
                fy = (ny2 - FLOWER_RADIUS) + (2*(len%2) - 1)*getRandomScale()
            const newFlower = getRandomFlower()
            pushFlower({
                flower: newFlower,
                style: {left: fx, top: fy, fill: getRandomColor()}
            })
            flowerCollections.push(1)
        }
    }
    
    ctx.stroke();
    ctx.closePath();
}

/**
 * Linearly interpolate between two numbers v0, v1 by t
 */
function lerp(v0, v1, t) {
    return ( 1.0 - t ) * v0 + t * v1;
}

export default class TreeCanvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flowerCollections: []
        }
    }
    pushFlower = f => {
        this.setState({
            flowerCollections: [...this.state.flowerCollections, f]
        })
    }
    componentDidMount() {
        const { startX, startY, startAngle } = this.props
        this.canvas.width = width
        this.canvas.height = height

        const ctx = this.canvas.getContext('2d');
        ctx.translate(startX, startY)
        ctx.rotate(startAngle * Math.PI/180)
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        // draw(ctx, [{x: 0, angle: 0, angleDiff: ANGLE_INCREMENT}], length, speed)
        // draw(ctx, [{x: 0, y: 0}], length, speed)
        
        animatePathDrawing(ctx,
            this.pushFlower,
            [
                [...getPointsAsArray(points1), 2000],
                [...getPointsAsArray(symPoints1), 2000],
                [...getPointsAsArray(points2), 3500, 30],
                [...getPointsAsArray(points3), 2000],
                [...getPointsAsArray(symPoints3), 2000],
                [...getPointsAsArray(points4), 3000, 25]
            ]
        )
    }

    render() {
        const { flowerCollections } = this.state
        return (
            <div>
                <canvas
                    className='TreeCanvas'
                    ref={node => this.canvas = node}/>
                {flowerCollections.map((fl, idx) =>
                    <fl.flower key={idx} style={fl.style} />
                )}
            </div>
        )
    }
}


// const ANGLE_INCREMENT = 10
// const X_INCREMENT = 2
// const calcAngleDiff = (angle, increment) => {
//     const nextAngle = angle + increment
//     if (nextAngle > 45)
//         return -ANGLE_INCREMENT
//     if (nextAngle < -45)
//         return ANGLE_INCREMENT

//     const ratio = Math.max(Math.pow(Math.abs(angle/90), 1.2), .4)
//     return increment > 0 ? ratio*ANGLE_INCREMENT
//         : -ratio*ANGLE_INCREMENT
// }
// const calcLineWidth = (x, endX) => {
//     return 5*((endX - x)/endX)
// }

// const addVectors = (vectors, number = 1) => {
//     for (let i = 0; i < number; i++) {
//         const len = vectors.length
//         const lastVector = vectors[len - 1]
//         const angleDiff = calcAngleDiff(lastVector.angle, lastVector.angleDiff)
//         const nextVector = {
//             x: lastVector.x + X_INCREMENT,
//             angleDiff,
//             angle: lastVector.angle + angleDiff
//         }
//         vectors.push(nextVector)
//     }
// }
// const draw = (ctx, vectors, endX, speed) => {
//     const len = vectors.length
//     const lastVector = vectors[len - 1]
//     if(lastVector.x > endX) {
//         ctx.restore();
//         return;
//     }

//     // dynamic linear speed
//     addVectors(
//         vectors,
//         speed * (1 - (lastVector.x/endX)) + 1
//     )

//     // start draw
//     ctx.beginPath()
//     ctx.save()

//     for (let i = 0; i < vectors.length; i++) {
//         if (i > 0) {
//             ctx.rotate(vectors[i].angleDiff * Math.PI/180)
//         }
//         ctx.lineWidth = calcLineWidth(vectors[i].x, endX)
//         ctx.moveTo(0, 0)
//         ctx.lineTo(X_INCREMENT, 0)
//         ctx.stroke()
//         ctx.translate(X_INCREMENT, 0)
//     }

//     ctx.restore()

//     // animate
//     requestAnimationFrame(() =>
//         draw(ctx, vectors, endX, speed)
//     )
// }


// const addPoints = (points, number = 1) => {
//     for (let i = 0; i < number; i++) {
//         const len = points.length
//         const lastPoint = points[len - 1]
//         const x = lastPoint.x + X_INCREMENT
//         const nextPoint = {
//             x,
//             y: 5 * Math.pow((x/(width/3)), .5)
//         }
//         points.push(nextPoint)
//     }
// }
// const draw = (ctx, points, endX, speed) => {
//     const len = points.length
//     const lastPoint = points[len - 1]
//     if(lastPoint.x > endX) {
//         ctx.restore();
//         return;
//     }

//     // dynamic linear speed
//     addPoints(
//         points,
//         speed * (1 - (lastPoint.x/endX)) + 1
//     )

//     // start draw
//     ctx.beginPath()

//     for (let i = 0; i < points.length - 1; i++) {
//         // ctx.lineWidth = calcLineWidth(points[i].x, endX)
//         ctx.moveTo(points[i].x, points[i].y)
//         ctx.lineTo(points[i + 1].x, points[i + 1].y)
//         ctx.stroke()
//     }

//     // animate
//     requestAnimationFrame(() =>
//         draw(ctx, points, endX, speed)
//     )
// }