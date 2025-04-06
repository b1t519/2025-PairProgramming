// The entry file of your WebAssembly module.

// export function add(a: i32, b: i32): i32 {
//   return a + b;
// }
export function greedy_snake_move(snakePositions: Int32Array, fruitPosition: Int32Array): number {
  // 获取蛇头的坐标
  const headX = snakePositions[0];
  const headY = snakePositions[1];

  // 获取第二节身体的坐标
  const bodyX = snakePositions[2];
  const bodyY = snakePositions[3];

  // 获取果子的坐标
  const fruitX = fruitPosition[0];
  const fruitY = fruitPosition[1];

  // 计算蛇头到果子的相对位置
  const deltaX = fruitX - headX;
  const deltaY = fruitY - headY;

  // 初步选择朝向果子的方向
  let moveDirection = -1;

  // 判断朝向果子的方向
  if (deltaX > 0) {
      moveDirection = 3; // 向右
  } else if (deltaX < 0) {
      moveDirection = 1; // 向左
  } else if (deltaY > 0) {
      moveDirection = 0; // 向上
  } else if (deltaY < 0) {
      moveDirection = 2; // 向下
  }

  // 检查是否和第二节身体冲突
  if (moveDirection === 3 && headX + 1 === bodyX && headY === bodyY) {
      // 蛇头向右，第二节身体在右边，冲突
      // 向下或向上（垂直方向），确保不会越界
      if (headY === 8) return 2; // 向下
      else return 0; // 向上
  } else if (moveDirection === 1 && headX - 1 === bodyX && headY === bodyY) {
      // 蛇头向左，第二节身体在左边，冲突
      // 向下或向上（垂直方向），确保不会越界
      if (headY === 8) return 2; // 向下
      else return 0; // 向上
  } else if (moveDirection === 2 && headY - 1 === bodyY && headX === bodyX) {
      // 蛇头向上，第二节身体在上方，冲突
      // 向左或向右（水平方向），确保不会越界
      if (headX === 1) return 3; // 向右
      else return 1; // 向左
  } else if (moveDirection === 0 && headY + 1 === bodyY && headX === bodyX) {
      // 蛇头向下，第二节身体在下方，冲突
      // 向左或向右（水平方向），确保不会越界
      if (headX === 1) return 3; // 向右
      else return 1; // 向左
  }

  // 如果没有冲突，继续朝向果子走
  return moveDirection;
}