let textToShow = "hello beautiful welcome and be nice hello beautiful welcome and be nice  ";
let fontSize = 10;
let radius = 90;
let angleOffset = 0;
let rotationSpeed = 0.001;
let dragging = false;
let isHoveringCanvas = false;
let myFont;
let canvas;

function preload() {
  myFont = loadFont('assets/fonts/OmegaUI-Regular.otf');
}

function setup() {
  canvas = createCanvas(300, 175, WEBGL);
  canvas.parent('p5-container');

  canvas.mouseOver(() => {
    isHoveringCanvas = true;
  });

  canvas.mouseOut(() => {
    isHoveringCanvas = false;
    dragging = false;
  });

  textFont(myFont);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  setAttributes('antialias', true);
}

function draw() {
  background(255);

  let targetSpeed = 0.004;

  if (isHoveringCanvas && !dragging) {
    targetSpeed = 0.04;
  }

  if (dragging) {
    let diff = mouseX - pmouseX;
    angleOffset += diff * 0.01;
    rotationSpeed = diff * 0.01;
  } else {
    rotationSpeed = lerp(rotationSpeed, targetSpeed, 0.05);
    angleOffset += rotationSpeed;
  }

  let waveAmplitude = 15;
  let waveSpeed = frameCount * 0.05;

  for (let i = 0; i < textToShow.length; i++) {
    let charAngle = angleOffset + (i / textToShow.length) * TWO_PI;

    let x = sin(charAngle) * radius;
    let z = cos(charAngle) * radius;
    let y = sin(charAngle * 2 + waveSpeed) * waveAmplitude;

    let alpha = map(z, -radius, radius, 20, 255);
    let scaleFactor = map(z, -radius, radius, 0.6, 1.3);

    push();
    translate(x, y, z);

    scale(scaleFactor);
    fill(0, alpha);
    noStroke();

    text(textToShow[i], 0, 0);
    pop();
  }
}

function mousePressed() {
  if (isHoveringCanvas) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}