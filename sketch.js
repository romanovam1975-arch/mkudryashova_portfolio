let textToShow = "hello beautiful welcome and be nice hello beautiful welcome and be nice  ";
let fontSize = 20; 
let radius = 180;  
let angleOffset = 0;
let rotationSpeed = 0.001; 
let dragging = false;
let myFont;

function preload() {
  // Убедись, что путь и расширение файла верны (.otf или .woff2)
  myFont = loadFont('assets/fonts/OmegaUI-Regular.otf');
}

function setup() {
  // Создаем холст и привязываем его к контейнеру в HTML
  let canvas = createCanvas(600, 350, WEBGL); 
  canvas.parent('p5-container');
  
  textFont(myFont);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // Включаем сглаживание для WEBGL
  setAttributes('antialias', true);
}

function draw() {
  background(255); // Белый фон
  
  // 1. ЛОГИКА ВРАЩЕНИЯ И ИНТЕРАКТИВА
  let targetSpeed = 0.004; // Базовая скорость
  
  // Проверяем наведение мыши (в WEBGL центр — это 0,0)
  if (abs(mouseX - width/2) < width/2 && abs(mouseY - height/2) < height/2) {
    if (!dragging) targetSpeed = 0.04; // Ускоряемся при наведении
  }

  if (dragging) {
    let diff = mouseX - pmouseX;
    angleOffset += diff * 0.01;
    rotationSpeed = diff * 0.01; 
  } else {
    rotationSpeed = lerp(rotationSpeed, targetSpeed, 0.05); 
    angleOffset += rotationSpeed;
  }

  // 2. ПАРАМЕТРЫ ВОЛНЫ
  let waveAmplitude = 25; // Высота прыжка букв
  let waveSpeed = frameCount * 0.05; // Скорость бега волны по буквам

  // 3. ОТРИСОВКА ЦИЛИНДРА
  for (let i = 0; i < textToShow.length; i++) {
    // Угол каждой буквы
    let charAngle = angleOffset + (i / textToShow.length) * TWO_PI;

    // Позиция на окружности (X и Z)
    let x = sin(charAngle) * radius;
    let z = cos(charAngle) * radius;
    
    // Динамическая волна (Y)
    let y = sin(charAngle * 2 + waveSpeed) * waveAmplitude; 

    // Эффекты глубины
    let alpha = map(z, -radius, radius, 20, 255); // Прозрачность
    let scaleFactor = map(z, -radius, radius, 0.6, 1.3); // Масштаб

    push();
    translate(x, y, z); 
    
    // БИЛБОРДИНГ: Заставляем буквы всегда смотреть в экран
    // Сбрасываем поворот по Y, который создается движением по кругу
    rotateY(-charAngle + charAngle); 
    
    scale(scaleFactor);
    fill(0, alpha); // Черный текст с прозрачностью
    noStroke();
    
    text(textToShow[i], 0, 0);
    pop();
  }
}

// 4. ОБРАБОТКА МЫШИ ДЛЯ ВРАЩЕНИЯ
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}