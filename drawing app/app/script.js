const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let tool = 'pencil';
let color = '#000000';
let startX, startY;
const yOffset = 31; // Adjust this value based on the height of your cursor image

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top + 31// Apply the yOffset to adjust the cursor position
  };
}

function startDrawing(e) {
  const pos = getMousePos(canvas, e);
  startX = pos.x;
  startY = pos.y;

  if (tool === 'fillColor') {
    fillCanvas();
    return;
  }

  drawing = true;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
}

function stopDrawing() {
  drawing = false;
}

function draw(e) {
  if (!drawing) return;

  const pos = getMousePos(canvas, e);
  const x = pos.x;
  const y = pos.y;

  ctx.lineWidth = tool === 'eraser' ? 10 : 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;

  if (tool === 'pencil' || tool === 'eraser') {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (tool === 'rectangle') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(startX, startY, x - startX, y - startY);
  } else if (tool === 'circle') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function setTool(selectedTool) {
  tool = selectedTool;
  canvas.className = `cursor-${selectedTool}`;
}

function changeColor(selectedColor) {
  color = selectedColor;
}

function fillCanvas() {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveAsImage() {
  const link = document.createElement('a');
  link.download = 'canvas_image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}











