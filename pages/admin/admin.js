export function addCar(name, description, picture, pricePerDay) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push({ name, description, picture, pricePerDay });
    localStorage.setItem("cars", JSON.stringify(cars));
}

export function remCar(name) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars = cars.filter(car => car.name !== name);
    localStorage.setItem("cars", JSON.stringify(cars));
}

export function getCars() {
    
    const x = JSON.parse(localStorage.getItem("cars")) || [];
    return x
}