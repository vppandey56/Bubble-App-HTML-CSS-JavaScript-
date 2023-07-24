document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#myCanvas");
  const ctx = canvas.getContext("2d");
  const resetButton = document.querySelector("#resetButton");

  const circleColors = ["#FF5733", "#33FF57", "#9D6547", "#FF33FF"];
  const circleRadius = 30;
  const arrowWidth = 10;
  const arrowHeight = 15;
  const circleGap = 80; // Gap between circles

  const startX = circleRadius + 50; // Starting X position for the circles on the left
  const canvasWidth = canvas.width; // Store canvas width
  const centerY = canvas.height / 2; // Center Y for all circles
  const totalCirclesHeight = 2 * circleRadius + circleGap;

  let circleXPositions = [startX, startX, startX, startX];
  let circleYPositions = [
    centerY - totalCirclesHeight,
    centerY - totalCirclesHeight / 3,
    centerY + totalCirclesHeight / 3,
    centerY + totalCirclesHeight,
  ];

  let arrowXPositions = [
    canvasWidth - 40,
    canvasWidth - 40,
    canvasWidth - 40,
    canvasWidth - 40,
  ];
  let arrowYPositions = [
    circleYPositions[0],
    circleYPositions[1],
    circleYPositions[2],
    circleYPositions[3],
  ];
  let isArrowMoving = [false, false, false, false];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circleYPositions.length; i++) {
      ctx.beginPath();
      ctx.arc(
        circleXPositions[i],
        circleYPositions[i],
        circleRadius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = circleColors[i];
      ctx.fill();
      ctx.strokeStyle = "#000"; // Border color
      ctx.lineWidth = 2; // Border width
      ctx.stroke(); // Draw the circle border
      ctx.closePath();
    }

    for (let i = 0; i < arrowXPositions.length; i++) {
      if (isArrowMoving[i]) {
        if (
          arrowXPositions[i] + arrowWidth <=
          circleXPositions[i] + circleRadius
        ) {
          isArrowMoving[i] = false;
          circleColors[i] = "#8F9585"; // Change circle color to purple when hit
        } else {
          arrowXPositions[i] -= 8; // Increase the X position to move the arrow left
        }
      }

      ctx.beginPath();
      ctx.moveTo(arrowXPositions[i], arrowYPositions[i]);
      ctx.lineTo(
        arrowXPositions[i] - arrowHeight, // Adjust X position to move the arrow head left
        arrowYPositions[i] - arrowWidth / 2
      );
      ctx.lineTo(
        arrowXPositions[i] - arrowHeight, // Adjust X position to move the arrow head left
        arrowYPositions[i] + arrowWidth / 2
      );
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();

  canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = 0; i < circleXPositions.length; i++) {
      const distance = Math.sqrt(
        Math.pow(clickX - circleXPositions[i], 2) +
          Math.pow(clickY - circleYPositions[i], 2)
      );

      if (distance <= circleRadius) {
        isArrowMoving[i] = true;
      }
    }
  });

  resetButton.addEventListener("click", function () {
    for (let i = 0; i < isArrowMoving.length; i++) {
      isArrowMoving[i] = false;
      circleColors[i] = ["#FF5733", "#33FF57", "#3399FF", "#FF33FF"][i];
      arrowXPositions[i] = canvasWidth - 40;
    }
  });
});
