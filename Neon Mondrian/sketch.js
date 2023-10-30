let img;
let t = 0;
let colorThreshold;
let originalPixels; 
let button1;
let button2;
let button3;
let buttonPressed = "";

function preload() {
  img = loadImage("M1.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  let aspectRatio = img.width / img.height;
  let newHeight = windowHeight;
  let newWidth = windowHeight * aspectRatio;
  img.resize(newWidth, newHeight);
  img.loadPixels();
  originalPixels = img.pixels.slice();
  image(img, 0, 0);

  button1 = createButton('Red');
  button1.position(width - 200, 100);
  button1.mousePressed(() => {
    buttonPressed = "red";
  });

  button2 = createButton('Yellow');
  button2.position(width - 200, 150);
  button2.mousePressed(() => {
    buttonPressed = "yellow";
  });

  button3 = createButton('Blue');
  button3.position(width - 200, 200);
  button3.mousePressed(() => {
    buttonPressed = "blue";
  });
}

function draw() {
  background(10, 10);
  noStroke();
  image(img, 0, 0);
  if (buttonPressed === "red") {
    applyColorEffect("red", 100);
  } else if (buttonPressed === "yellow") {
    applyColorEffect("yellow", 100);
  } else if (buttonPressed === "blue") {
    applyColorEffect("blue", 20);
  }

}

function applyColorEffect(selectedColor, colorThreshold) {
  img.loadPixels()

  for (let i = 0; i < img.pixels.length; i++) {
    img.pixels[i] = originalPixels[i]; 
  }

  for (let vi = 0; vi < img.pixels.length; vi += 4) {
    let redVal = img.pixels[vi];
    let greenVal = img.pixels[vi + 1];
    let blueVal = img.pixels[vi + 2];

    if (colorMatch(redVal, greenVal, blueVal, selectedColor, colorThreshold)) {
      img.pixels[vi + 3] = 0;
    }
  }

  img.updatePixels();

  image(img, 0, 0);

  for (let y = 0; y < img.height; y += 30) {
    for (let x = 0; x < img.width; x += 30) {
      let index = (y * img.width + x) * 4;
      let redVal = img.pixels[index];
      let greenVal = img.pixels[index + 1];
      let blueVal = img.pixels[index + 2];

      if (colorMatch(redVal, greenVal, blueVal, selectedColor, colorThreshold)) {
        const angle = map(mouseX, 0, width, -4 * PI, 4 * PI, true) * (x / width) +
          map(mouseY, 0, height, -4 * PI, 4 * PI, true) * (y / height);

        const myX = x + 20 * cos(2 * PI * t + angle);
        const myY = y + 20 * sin(2 * PI * t + angle);

        fill(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], 255);
        ellipse(myX, myY, 10);
      }
    }
  }

  t += 0.01;
}

function colorMatch(r, g, b, selectedColor, colorThreshold) {
  if (selectedColor === "red") {
    return r > g + colorThreshold && r > b + colorThreshold;
  } else if (selectedColor === "yellow") {
    return r > b + colorThreshold && g > b + colorThreshold && Math.abs(r - g) < colorThreshold;
  } else if (selectedColor === "blue") {
    return b > r + colorThreshold && b > g + colorThreshold;
  } else {
    return false;
  }
}