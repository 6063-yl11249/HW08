let img;
let t = 0;
let colorThreshold = 100;

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
  // noLoop()
}

function draw() {
  background(10, 10);
  noStroke();

  // 确定图像在画布中的偏移量
  let xOffset = (width - img.width) / 2;
  let yOffset = (height - img.height) / 2; // 这里假设图像是水平居中的

  // 遍历像素数组，并设置红色最强的像素点的透明度
  for (let vi = 0; vi < img.pixels.length; vi += 4) {
    let redVal = img.pixels[vi];
    let greenVal = img.pixels[vi + 1];
    let blueVal = img.pixels[vi + 2];

    // 如果红色值与绿色和蓝色值的差异都超过了阈值
    if (colorMatch(redVal, greenVal, blueVal, "yellow")) {
      // 该像素足够红，可以在这里应用特效或其他操作
      // 例如，设置像素的透明度为0使其不可见
      img.pixels[vi + 3] = 0;
    }
  }

  img.updatePixels();

  // 在调整透明度后，再绘制图像
  image(img, xOffset, yOffset);

  // 绘制动态圈
  for (let y = 0; y < img.height; y += 30) {
    for (let x = 0; x < img.width; x += 30) {
      let index = (y * img.width + x) * 4;
      let redVal = img.pixels[index];
      let greenVal = img.pixels[index + 1];
      let blueVal = img.pixels[index + 2];

      if (colorMatch(redVal, greenVal, blueVal, "yellow")) {
        // 如果红色是最强的颜色
        const angle = map(mouseX, 0, width, -4 * PI, 4 * PI, true) * (x / width) +
          map(mouseY, 0, height, -4 * PI, 4 * PI, true) * (y / height);

        const myX = x + 20 * cos(2 * PI * t + angle) + xOffset;
        const myY = y + 20 * sin(2 * PI * t + angle) + yOffset; // 现在包含了垂直偏移量

        fill(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], 255); // 使用原像素的颜色（不透明）
        ellipse(myX, myY, 10); // 在正确的位置绘制圈
      }
    }
  }

  t = t + 0.01; // 更新时间变量以实现动画效果
}

// 判断颜色是否匹配的函数
function colorMatch(r, g, b, selectedColor) {
  if (selectedColor == "red") {
    // 红色像素的红色通道值应明显高于绿色和蓝色通道值
    return r > g + colorThreshold && r > b + colorThreshold;
  }
  else if (selectedColor == "yellow") {
    // 黄色像素的红色和绿色通道值应相近，并且都应高于蓝色通道值
    return r > b + colorThreshold && g > b + colorThreshold && Math.abs(r - g) < colorThreshold;
  }
  else if (selectedColor == "blue") {
    // 蓝色像素的蓝色通道值应明显高于红色和绿色通道值
    return b > r + colorThreshold && b > g + colorThreshold;
  }
  else {
    // 如果selectedColor不是"red"、"yellow"或"blue"，则默认不匹配
    return false;
  }

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}