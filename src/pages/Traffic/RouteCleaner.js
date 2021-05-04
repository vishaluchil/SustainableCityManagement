import routes from './routes.json';
export default function RouteCleaner() {
    let routeStartandDestination = {}
    Object.keys(routes).forEach((key) => {
        let routesArray = routes[key]
        let actual_bus_number = key.split(".")[0]
        let created_bus_number = Object.keys(routeStartandDestination)
        let index = created_bus_number.indexOf(actual_bus_number)
        let pathNumber = actual_bus_number.split('-')[2]
        pathNumber = pathNumber.match(/[a-zA-Z]+|[0-9]+/g)

        if (index === -1 && pathNumber[0] === 'b') {

            if (routesArray.length > 1) {
                let routeNumber = actual_bus_number.split('-')[1]
                let routeStart = routes[key][0]
                let routeEnd = routes[key][routesArray.length - 1]
                if (routeStart[0].toString() !== routeEnd[0].toString()) {
                    let wayPoints = []
                    routesArray.forEach((item, index) => {
                        if (index !== 1 && index !== 0 && index !== routesArray.length - 1) {
                            wayPoints.push({
                                location: item.toString(),
                            })
                        }
                    });
                    let routeObj = {
                        startpoint: routeStart,
                        endpoint: routeEnd,
                        waypoints: wayPoints,
                        routenumber: routeNumber,
                    };
                    routeStartandDestination[actual_bus_number] = routeObj;

                }
                else {
                    console.log("GG")
                }
            }
        }
    })

    return routeStartandDestination
}