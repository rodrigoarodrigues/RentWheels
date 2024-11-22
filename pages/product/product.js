import { getCars } from '../admin/admin.js';


export async function getDominantColor(imageUrl) {
 try {
        // Fetch the image URL and convert it to a Blob
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
    
        const blob = await response.blob();
    
        // Create an Image object from the Blob
        const img = new Image();
        img.src = URL.createObjectURL(blob);
    
        return new Promise((resolve, reject) => {
            img.onload = function() {
                // Draw the image on the canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
            
                // Get image data from the canvas
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
            
                // Track color counts
                const colorCounts = {};
                let maxCount = 0;
                let dominantColor = '';
            
                for (let i = 0; i < pixels.length; i += 4) {
                    const red = pixels[i];
                    const green = pixels[i + 1];
                    const blue = pixels[i + 2];
                    const alpha = pixels[i + 3];
                
                    // Only consider fully opaque pixels and ignore almost white or very dark pixels
                    if (alpha === 255) {
                        // Ignore pixels that are nearly white (e.g., very light colors)
                        if (red > 240 && green > 240 && blue > 240) {
                            continue;
                        }
                        // Ignore very dark pixels (e.g., very close to black)
                        if (red < 30 && green < 30 && blue < 30) {
                            continue;
                        }
                    
                        const color = `${red},${green},${blue}`;
                    
                        if (colorCounts[color]) {
                            colorCounts[color]++;
                        } else {
                            colorCounts[color] = 1;
                        }
                    
                        if (colorCounts[color] > maxCount) {
                            maxCount = colorCounts[color];
                            dominantColor = color;
                        }
                    }
                }
            
                if (dominantColor) {
                    resolve(dominantColor);
                } else {
                    resolve(null);
                }
            };
        
            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };
        });
    } catch (error) {
        throw error;
    }
}



async function getProduct() {
    const cars = getCars()


    const product = cars[localStorage.getItem('productClicked')]
    document.title = product.name
    document.querySelector('.product-title').textContent = product.name
    document.querySelector('.product-price').innerHTML = 'R$ ' + product.pricePerDay
    document.getElementById('img').src = `/assets/${product.picture}`
    document.getElementById('img').alt = product.name
    document.querySelector('#specs').innerHTML = `<li>${product.description}</li>`
    document.querySelector('.product-image').style.backgroundColor = `rgb(${await getDominantColor(document.getElementById('img').src)})`

}
getProduct()


export function addCar(id) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push({ id });
    localStorage.setItem("carsCarrinho", JSON.stringify(cars));
}