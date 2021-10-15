import { line_label } from '../assets'

const colors = ['#800080', '#00FFFF', '#000000', '#FF0000', '#0000FF', '#FF00FF', '#00FF00', '#008000', '#800000', '#FFFF00']

const selectColor = () => {
    const number = Math.floor(Math.random() * 100) % colors.length
    return colors[number]
}


class OutputDrawObject {
    constructor(draw, map, idx, drawPrev) {
        this.draw = draw
        this.map = map
        this.idx = idx
        this.drawPrev = drawPrev
    }

    getIdx() {
        return this.idx
    }

    getDrawPrev() {
        return this.drawPrev
    }

    include() {
        this.draw.setMap(this.map)
    }

    exclude() {
        this.draw.setMap(null)
    }
}

export class Draw {
    constructor(map, maps) {
        this.map = map;
        this.maps = maps
        this.polylineMarkerRoutersArray = []
        this.polylineDrawArray = []
        this.delays = []
    }

    _isBlock() {
        const result = this.map !== null && this.maps !== null
        return result
    }

    getCurrentDrawPosition() {
        return this.polylineDrawArray[this.polylineDrawArray.length - 1]
    }

    addDelay(delay) {
        this.delays.push(delay)
    }

    async drawDirections({ origin, destination }) {
        const directionsService = new this.maps.DirectionsService();
        const directionsDisplay = new this.maps.DirectionsRenderer();
        return new Promise((resolve, reject) => {
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            }, (response, status) => {
                if (status === 'OK') {

                    directionsDisplay.setDirections(response);
                    const color = selectColor()
                    const routePolyline = new OutputDrawObject(new this.maps.Polyline({
                        path: response.routes[0].overview_path,
                        strokeColor: color,
                        strokeOpacity: 1.0,
                        strokeWeight: 3,
                    }), this.map,
                        this.polylineMarkerRoutersArray.length + 1,
                        null);
                    const middleRoute = parseInt((response.routes[0].overview_path.length / 2).toFixed(0))
                    const markerRouter = new OutputDrawObject(new this.maps.Marker({
                        position: response.routes[0].overview_path[middleRoute],
                        label: response.routes[0].legs[0].distance.text,
                        icon: line_label
                    }), this.map,
                        this.polylineMarkerRoutersArray.length + 1,
                        null);
                    const compose = { poly: routePolyline, marker: markerRouter }

                    this.polylineMarkerRoutersArray.push(compose)
                    resolve(compose)
                } else {
                    const err = 'Directions request failed due to ' + status
                    console.log(err);
                    reject(err)
                }
            });
        })


    }

    drawBounds({ bounds, options }) {

        const drawPolyline = new OutputDrawObject(new this.maps.Polyline(
            {
                path: bounds,
                strokeColor: options.color ? options.color : selectColor(),
                strokeOpacity: 1.0,
                strokeWeight: 3,
            }),
            this.map,
            this.polylineDrawArray.length + 1,
            this.polylineDrawArray[this.polylineDrawArray.length - 1]
        );
        this.polylineDrawArray.push(drawPolyline)
        return drawPolyline



    }

    clearDraw() {
        this.polylineMarkerRoutersArray.map(value => { value.poly.exclude(); value.marker.exclude() })
        this.polylineMarkerRoutersArray = []
        this.polylineDrawArray.map(value => value.exclude())
        this.polylineDrawArray = []
        this.delays.map(value => clearTimeout(value))
        this.delays = []
    }
}