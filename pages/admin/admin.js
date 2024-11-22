export function addCar(name, description, picture, pricePerDay, specs) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push({ name, description, picture, pricePerDay, specs });
    localStorage.setItem("cars", JSON.stringify(cars));
}

export function remCar(id) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    let newCars = []
    cars.forEach((e,i) => {
        if(i != id){
            newCars.push(e)
        }
    })
    localStorage.setItem("cars", JSON.stringify(newCars));
}

export function getCars() {
    
    const x = JSON.parse(localStorage.getItem("cars")) || [];
    return x
}
export function getCart() {
    
    const x = JSON.parse(localStorage.getItem("carrinho")) || [];
    return x
}