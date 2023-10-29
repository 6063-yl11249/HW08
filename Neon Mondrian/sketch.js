let img;
let t = 0;

function preload() {
  img = loadImage("./M1.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  pixelDensity(1);
  print("Original size: ", img.width, " x ", img.height);

  let aspectRatio = img.width / img.height;
  let newHeight = windowHeight;
  let newWidth = windowHeight * aspectRatio;
  img.resize(newWidth, newHeight);
  print("Scaled size: ", img.width, " x ", img.height);

  img.loadPixels();
  print("pixel array size: ", img.pixels.length); 

  
}

function draw() {
  background(10, 10);
  noStroke(); 

  let xOffset = (width - img.width) / 2;
  let yOffset = (height - img.height) / 2; 

  for (let vi = 0; vi < img.pixels.length; vi += 4) {
    let redVal = img.pixels[vi];
    let greenVal = img.pixels[vi + 1];
    let blueVal = img.pixels[vi + 2]; 
    if (redVal > greenVal * 2 && redVal > blueVal * 2) {
    
      img.pixels[vi + 3] = 0;
    }
  }

  img.updatePixels(); 

  image(img, xOffset, yOffset);

  for (let y = 0; y < img.height; y += 20) {
    for (let x = 0; x < img.width; x += 20) {
      let index = (y * img.width + x) * 4;
      let redVal = img.pixels[index];

      if (
        redVal > img.pixels[index + 1] * 2 &&
        redVal > img.pixels[index + 2] * 2 
      ) {
        
        const angle =
          map(mouseX, 0, width, -4 * PI, 4 * PI, true) * (x / width) +
          map(mouseY, 0, height, -4 * PI, 4 * PI, true) * (y / height);

        const myX = x + 20 * cos(2 * PI * t + angle) + xOffset;
        const myY = y + 20 * sin(2 * PI * t + angle) + yOffset; 

        fill(
          img.pixels[index],
          img.pixels[index + 1],
          img.pixels[index + 2],
          255
        ); 
        ellipse(myX, myY, 10);
      }
    }
  }

  t = t + 0.01; 
}
