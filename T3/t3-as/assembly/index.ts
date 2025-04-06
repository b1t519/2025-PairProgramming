// class Pair {
//     constructor(public x: i32, public y: i32) {}
  
//     // 判断两个 Pair 是否相等
//     equals(other: Pair): bool {
//       return this.x === other.x && this.y === other.y;
//     }

//     hashCode(): i32 {
//         return this.x * 1009 + this.y; // 简单的哈希函数
//     }
//   }
function greedySnakeMoveBarriers(snake: i32[], fruit: i32[], barriers: i32[], n: i32): i32 {
    // 场地大小
    const fieldSize: i32 = 5;

    // 方向枚举和向量
    const UP: i32 = 0, LEFT: i32 = 1, DOWN: i32 = 2, RIGHT: i32 = 3, UNREACHABLE: i32 = -1;
    const directions: i32[][] = [[0, 1], [-1, 0], [0, -1], [1, 0]]; // 上，左，下，右

    // 将坐标转换为单一整数以简化使用
    function coordToIndex(x: i32, y: i32): i32 {
        return (x - 1) * fieldSize + (y - 1);
    }

    //hash
    function hashPair(x: i32, y: i32): i32 {
        return x * 1009 + y;
    }

    // 初始化蛇的位置和障碍物
    let barriersIndex: Set<i32> = new Set();
    for (let i = 0; i < barriers.length; i += 2) {
        barriersIndex.add(coordToIndex(barriers[i], barriers[i + 1]));
    }

    // 获得蛇头位置和第二节身体位置
    let snakeHead = [snake[0], snake[1]];
    let secondBody = [snake[2], snake[3]];

    // 使用 BFS 寻找路径
    let queueHead: i32[][] = [];
    let queueBody: i32[][] = [];
    let fruitIndex = coordToIndex(fruit[0], fruit[1]);
    queueHead.push([snakeHead[0], snakeHead[1]]); // 蛇头初始位置
    queueBody.push([secondBody[0], secondBody[1]]);
    let visited: Set<i32> = new Set();
    let parentIndex: i32[] = [];
    let dirIndex: i32[] = [];
    let cnt = 0;
    let index = 0;
    let firstSnake = hashPair(coordToIndex(snakeHead[0], snakeHead[1]), coordToIndex(secondBody[0], secondBody[1]));
    visited.add(firstSnake);
    parentIndex[0] = -1;
    dirIndex[0] = -1;
    while (queueHead.length > 0) {
        let currentHead = queueHead.shift();
        let currentBody = queueBody.shift();
        let x = currentHead[0];
        let y = currentHead[1];
        let x_body = currentBody[0];
        let y_body = currentBody[1];

        for (let i = 0; i < 4; i++) {
            let newX = x + directions[i][0];
            let newY = y + directions[i][1];
            let oldIndex = coordToIndex(x, y);
            let newIndex = coordToIndex(newX, newY);
            let newSnake = hashPair(newIndex, oldIndex);
            if (newX >= 1 && newX <= fieldSize && newY >= 1 && newY <= fieldSize 
                && !(newX === x_body && newY === y_body) && !barriersIndex.has(newIndex)
                && !visited.has(newSnake) && !barriersIndex.has(oldIndex)) {
                cnt++;
                parentIndex[cnt] = index;
                dirIndex[cnt] = i;
                visited.add(newSnake);
                queueHead.push([newX, newY]);
                queueBody.push([x, y]);
                if (newIndex == fruitIndex) {
                    let temp = cnt;
                    while (parentIndex[temp] != 0) {
                        temp = parentIndex[temp];
                    }
                    return dirIndex[temp];
                }
            }
        }
        index++;
    }

    return UNREACHABLE; // 如果遍历完成没有找到路径，返回不可达
}

// 计算曼哈顿距离
function manhattanDistance(x1: i32, y1: i32, x2: i32, y2: i32): i32 {
    //return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return <i32>(Math.abs(x1 - x2)) + <i32>(Math.abs(y1 - y2));
  }
  
  // 判断是否有可能发生碰撞（自己或其他蛇）注：这里把其他蛇头周围的三个方向也当成了障碍物
  function isCollision(x: i32, y: i32, snake: i32[], otherSnakes: i32[], n: i32): bool {
    // 判断是否超出边界
    if (x < 1 || x > n || y < 1 || y > n) {
      return true;
    }
  
    // 判断是否撞到自己的身体
    // 蛇的身体长度为 4
    if (snake[2] == x && snake[3] == y) {
      return true;
    }
  
    // 判断是否撞到其他蛇
    for (let i = 0; i < otherSnakes.length / 8; i++) { // 计算其他蛇的个数，snake_length 为 8
      
      //判断其他蛇头周围的三个方向是否重合
      if (otherSnakes[i * 8] - 1 == x && otherSnakes[i * 8 + 1] == y) {
        return true;
      }
      if (otherSnakes[i * 8] + 1 == x && otherSnakes[i * 8 + 1] == y) {
        return true;
      }
      if (otherSnakes[i * 8] == x && otherSnakes[i * 8 + 1] + 1 == y) {
        return true;
      }
      if (otherSnakes[i * 8] == x && otherSnakes[i * 8 + 1] - 1 == y) {
        return true;
      }
      
      for (let j = 0; j < 3; j++) {  // 只考虑其他蛇之前的前三节
        if (otherSnakes[i * 8 + 2 * j] == x && otherSnakes[i * 8 + 2 * j + 1] == y) {
          return true;
        }
      }
    }
    return false;
  }

  //冒险
  function mustDie(x: i32, y: i32, snake: i32[], otherSnakes: i32[], n: i32): bool {
    // 判断是否超出边界
    if (x < 1 || x > n || y < 1 || y > n) {
        return true;
      }
    
      // 判断是否撞到自己的身体
      // 蛇的身体长度为 4
      if (snake[2] == x && snake[3] == y) {
        return true;
      }
    
      // 判断是否撞到其他蛇
      for (let i = 0; i < otherSnakes.length / 8; i++) { // 计算其他蛇的个数，snake_length 为 8
        
        for (let j = 0; j < 3; j++) {  // 只考虑其他蛇之前的前三节
          if (otherSnakes[i * 8 + 2 * j] == x && otherSnakes[i * 8 + 2 * j + 1] == y) {
            return true;
          }
        }
      }
    return false;
  }
  
  // 根据 `greedySnakeMoveBarriers` 返回的方向进行决策
  function decideMoveOnBlockedPath(snake: i32[], targetFood: i32[], otherSnakes: i32[], n: i32): i32 {
    // 如果路径被阻塞，我们可以尝试四个方向
    let bestDirection: i32 = -1;
    let minDist: i32 = i32.MAX_VALUE;
  
    // 遍历四个方向，检查哪些方向是安全的并尽量朝着目标前进
    for (let direction = 0; direction < 4 ; direction++) {
      let newX: i32 = snake[0];
      let newY: i32 = snake[1];
  
      // 根据方向计算新的坐标
      if (direction == 0) {
        newY += 1; // 向上
      } else if (direction == 1) {
        newX -= 1; // 向左
      } else if (direction == 2) {
        newY -= 1; // 向下
      } else if (direction == 3) {
        newX += 1; // 向右
      }
  
      // 如果这个方向不会碰到障碍物，检查它是否更接近目标
      if (!isCollision(newX, newY, snake, otherSnakes, n)) {
        if (bestDirection === -1) {
            bestDirection = direction;
        }
        let distToTarget = manhattanDistance(newX, newY, targetFood[0], targetFood[1]);
        if (distToTarget < minDist) {
          minDist = distToTarget;
          bestDirection = direction;
        }
      }
    }

    if (bestDirection !== -1) {
        return bestDirection;
    }

    minDist = i32.MAX_VALUE;

    // 遍历四个方向，找出次一级的方向
    for (let direction = 0; direction < 4 ; direction++) {
        let newX: i32 = snake[0];
        let newY: i32 = snake[1];
    
        // 根据方向计算新的坐标
        if (direction == 0) {
          newY += 1; // 向上
        } else if (direction == 1) {
          newX -= 1; // 向左
        } else if (direction == 2) {
          newY -= 1; // 向下
        } else if (direction == 3) {
          newX += 1; // 向右
        }
    
        // 如果这个方向不会碰到障碍物，检查它是否更接近目标
        if (!mustDie(newX, newY, snake, otherSnakes, n)) {
          if (bestDirection === -1) {
              bestDirection = direction;
          }
          let distToTarget = manhattanDistance(newX, newY, targetFood[0], targetFood[1]);
          if (distToTarget < minDist) {
            minDist = distToTarget;
            bestDirection = direction;
          }
        }
      }
      if (bestDirection === -1) {
          return 0;
    }
  
    return bestDirection;  // 返回找到的最合适方向
  }
  
  // 获取离蛇头最近的果子，考虑所有蛇的距离
  function getCompetitiveFood(snake: i32[], otherSnakes: i32[], otherSnakeNum: i32, snakeLength: i32, foods: i32[]): i32[] {
    let competitiveFoods: i32[] = []; // 存储所有能竞争的果子的坐标
    let minDist: i32 = i32.MAX_VALUE;
  
    // 遍历所有果子，计算每个果子与所有蛇的距离
    for (let i = 0; i < foods.length / 2; i++) { // foods 是一维数组，每两个数表示一个果子
      let food: i32[] = [foods[2 * i], foods[2 * i + 1]];  // 获取每个果子的坐标
      let closestSnakeDist: i32 = i32.MAX_VALUE;
      let isCompetitive: bool = true;
  
      // 计算我方蛇和敌方蛇与该果子的距离
      for (let j = 0; j < otherSnakeNum + 1; j++) { // 包括自己，所有蛇
        let snakeHead: i32[] = (j === 0) ? [snake[0], snake[1]] : [otherSnakes[(j-1) * snakeLength], otherSnakes[(j-1) * snakeLength + 1]]; // 自己的蛇或者敌方蛇
  
        // 计算该蛇头与果子的距离
        let dist: i32 = manhattanDistance(snakeHead[0], snakeHead[1], food[0], food[1]);
        
        // 如果其他蛇离果子更近，排除该果子
        if (j !== 0 && dist < closestSnakeDist) {
          isCompetitive = false;
          break;
        }
  
        if (j === 0) {  // 如果是我方蛇，记录最短距离
          closestSnakeDist = dist;
        }
      }
  
      // 只有当我方比其他蛇更接近果子时，该果子才是可以竞争的
      if (isCompetitive) {
        competitiveFoods.push(food[0]);  // 将能够竞争的果子的坐标添加到一维数组中
        competitiveFoods.push(food[1]);
      }
    }
  
     // 如果没有能竞争的果子，则排除敌方最近的果子
     if (competitiveFoods.length === 0) {
      let excludedFoods: i32[] = [];  // 存储排除的果子
      // 找出每个敌方蛇离果子最近的果子，并排除这些果子
      for (let i = 0; i < otherSnakeNum; i++) {
        let closestEnemyFoodDist: i32 = i32.MAX_VALUE;
        let closestEnemyFood: i32[] = [];
  
        for (let j = 0; j < foods.length / 2; j++) {
          let food: i32[] = [foods[2 * j], foods[2 * j + 1]];
          let enemyHead: i32[] = [otherSnakes[i * snakeLength], otherSnakes[i * snakeLength + 1]];
  
          let dist: i32 = manhattanDistance(enemyHead[0], enemyHead[1], food[0], food[1]);
          if (dist < closestEnemyFoodDist) {
            closestEnemyFoodDist = dist;
            closestEnemyFood = food;
          }
        }
  
        // 将敌方蛇最近的果子排除
        excludedFoods.push(closestEnemyFood[0]);
        excludedFoods.push(closestEnemyFood[1]);
      }
  
      // 从剩余的果子中选择离我最近的果子
      let closestFood: i32[] = [];
      let minDist: i32 = i32.MAX_VALUE;
      for (let i = 0; i < foods.length / 2; i++) {
        let food: i32[] = [foods[2 * i], foods[2 * i + 1]];
        let ex =  excludedFoods.indexOf(food[0]);
        let ey =  excludedFoods.indexOf(food[1]);
        if (ex === -1 || ey === -1 || !((ex === ey - 1) && (ex % 2 === 0) && (ey % 2 === 1))) {
          let dist: i32 = manhattanDistance(snake[0], snake[1], food[0], food[1]);
          if (dist < minDist) {
            minDist = dist;
            closestFood = food;
          }
        }
      }
  
      return closestFood; // 返回最近的竞争果子
  
    } else { // 有可以竞争的选离我最近的
      // 从可以竞争的果子中选择离我最近的果子
      let closestFood: i32[] = [];
      for (let i = 0; i < competitiveFoods.length / 2; i++) {
        let dist = manhattanDistance(snake[0], snake[1], competitiveFoods[2 * i], competitiveFoods[2 * i + 1]);
         if (dist < minDist) {
         minDist = dist;
          closestFood = [competitiveFoods[2 * i], competitiveFoods[2 * i + 1]];  // 更新为离我最近的果子
         }
      }
      return closestFood; // 返回最近的竞争果子
    
    }
  
  }
  
  // 快速吃果子并避开对方的策略
  function quickEatAndAvoid(n: i32, snake: i32[], otherSnakes: i32[], otherSnakeNum: i32, snakeLength: i32, foods: i32[]): i32 {
    // 1. 获取能够竞争的果子
    let competitiveFood: i32[] = getCompetitiveFood(snake, otherSnakes, otherSnakeNum, snakeLength, foods);
  
    // 2. 使用 greedySnakeMoveBarriers 来计算避开障碍物的移动方向
    let moveDirection: i32 = greedySnakeMoveBarriers(snake, competitiveFood, otherSnakes, n);
  
    // 3. 如果路径被堵塞，使用策略绕过
    if (moveDirection == -1) {
      moveDirection = decideMoveOnBlockedPath(snake, competitiveFood, otherSnakes, n);
    }
  
    // 4. 返回该步应该移动的方向
    return moveDirection;  // 返回方向：0=上，1=左，2=下，3=右
  }

// 计算蛇头朝向是否与其他蛇相同
function isSameDirection(snake: i32[], snake_num: i32, other_snake: i32[]): i32 {
    let myDirection = -1;
    if (snake[0] == snake[2]) {
        if (snake[1] > snake[3]) {
            myDirection = 0;
        } else {
            myDirection = 2;
        }
    } else {
        if (snake[0] > snake[2]) {
            myDirection = 3;
        } else {
            myDirection = 1;
        }
    }
    for (let i = 0; i < snake_num; i += 1) {
        let other_snake_direction = -1;
        if (other_snake[i] == other_snake[i + 2]) {
            if (other_snake[i + 1] > other_snake[i + 3]) {
                other_snake_direction = 0;
            } else {
                other_snake_direction = 2;
            }
        } else if (other_snake[i+1] == other_snake[i + 3]) {
            if (other_snake[i] > other_snake[i + 2]) {
                other_snake_direction = 3;
            } else {
                other_snake_direction = 1;
            }
        }
        if (other_snake_direction == myDirection) {
            return myDirection;
        }
    }
    return -1;
}

function killlOtherSnake(n: i32, snake: i32[], snake_num: i32, other_snake: i32[], sameDir: i32): i32 {
    for (let i = 0; i < snake_num; i++) {
        if (other_snake[8 * i] == 1 && snake[0] == 2) {
            if (sameDir == 0) {
                if (other_snake[8 * i + 1] == 5) {
                    if (snake[1] == 5 || snake[1] == 4) {
                        return 3;
                    }
                } else if (other_snake[8 * i + 1] == 4) {
                    if (snake[1] == 5) {
                        return 3;
                    } else if (snake[1] == 4) {
                        return 0;
                    }
                } else if (other_snake[8 * i + 1] == 3) {
                    if (snake[1] == 5) {
                        return 3;
                    } else if (snake[1] == 4) {
                        return 0;
                    } else if (snake[1] == 3) {
                        return 0;
                    }
                } else if (other_snake[8 * i + 1] == 2) {
                    if (snake[1] == 4) {
                        return 1;
                    } else if (snake[1] == 3) {
                        return 0;
                    } else if (snake[1] == 2) {
                        return 0;
                    }
                }
            }
            else if (sameDir == 2) {
                if (other_snake[8 * i + 1] == 1) {
                    if (snake[1] == 1 ||  snake[1] == 2) {
                        return 3;
                    } 
                } else if (other_snake[8 * i + 1] == 2) {
                    if (snake[1] == 1) {
                        return 3;
                    } else if (snake[1] == 2) {
                        return 2;
                    }
                } else if (other_snake[8 * i + 1] == 3) {
                    if (snake[1] == 1) {
                        return 3;
                    } else if (snake[1] == 2) {
                        return 2;
                    } else if (snake[1] == 3) {
                        return 2;
                    }
                } else if (other_snake[8 * i + 1] == 4) {
                    if (snake[1] == 2) {
                        return 1;
                    } else if (snake[1] == 3) {
                        return 2;
                    } else if (snake[1] == 4) {
                        return 2;
                    }
                }
            }
        } else if (other_snake[8 * i] == 5 && snake[0] == 4) {
            if (sameDir == 0) {
                if (other_snake[8 * i + 1] == 5) {
                    if (snake[1] == 5 || snake[1] == 4) {
                        return 1;
                    }
                } else if (other_snake[8 * i + 1] == 4) {
                    if (snake[1] == 5) {
                        return 1;
                    } else if (snake[1] == 4) {
                        return 0;
                    }
                } else if (other_snake[8 * i + 1] == 3) {
                    if (snake[1] == 5) {
                        return 1;
                    } else if (snake[1] == 4) {
                        return 0;
                    } else if (snake[1] == 3) {
                        return 0;
                    }
                } else if (other_snake[8 * i + 1] == 2) {
                    if (snake[1] == 4) {
                        return 3;
                    } else if (snake[1] == 3) {
                        return 0;
                    } else if (snake[1] == 2) {
                        return 0;
                    }
                }
            }
            else if (sameDir == 2) {
                if (other_snake[8 * i + 1] == 1) {
                    if (snake[1] == 1 ||  snake[1] == 2) {
                        return 1;
                    } 
                } else if (other_snake[8 * i + 1] == 2) {
                    if (snake[1] == 1) {
                        return 1;
                    } else if (snake[1] == 2) {
                        return 2;
                    }
                } else if (other_snake[8 * i + 1] == 3) {
                    if (snake[1] == 1) {
                        return 1;
                    } else if (snake[1] == 2) {
                        return 2;
                    } else if (snake[1] == 3) {
                        return 2;
                    }
                } else if (other_snake[8 * i + 1] == 4) {
                    if (snake[1] == 2) {
                        return 3;
                    } else if (snake[1] == 3) {
                        return 2;
                    } else if (snake[1] == 4) {
                        return 2;
                    }
                }
            }
        } else if (other_snake[8 * i + 1] == 1 && snake[1] == 2) {
            if (sameDir == 1) {
                if (other_snake[8 * i] == 1) {
                    if (snake[0] == 1 || snake[0] == 2)  {
                        return 0;
                    } 
                } else if (other_snake[8 * i] == 2) {
                    if (snake[0] == 1) {
                        return 0;
                    } else if (snake[0] == 2) {
                        return 1;
                    }
                } else if (other_snake[8 * i] == 3) {
                    if (snake[0] == 1) {
                        return 0;
                    } else if (snake[0] == 2) {
                        return 1;
                    } else if (snake[0] == 3) {
                        return 1;
                    }
                } else if (other_snake[8 * i] == 4) {
                    if (snake[0] == 2) {
                        return 2;
                    } else if (snake[0] == 3) {
                        return 1;
                    } else if (snake[0] == 4) {
                        return 1;
                    }
                }
            } else if (sameDir == 3) {
                if (other_snake[8 * i] == 5) {
                    if (snake[0] == 5 || snake[0] == 4)  {
                        return 0;
                    } 
                } else if (other_snake[8 * i] == 4) {
                    if (snake[0] == 5) {
                        return 0;
                    } else if (snake[0] == 4) {
                        return 3;
                    }
                } else if (other_snake[8 * i] == 3) {
                    if (snake[0] == 5) {
                        return 0;
                    } else if (snake[0] == 4) {
                        return 3;
                    } else if (snake[0] == 3) {
                        return 3;
                    }
                } else if (other_snake[8 * i] == 2) {
                    if (snake[0] == 4) {
                        return 2;
                    } else if (snake[0] == 3) {
                        return 3;
                    } else if (snake[0] == 2) {
                        return 3;
                    }
                }
            }
        } else if (other_snake[8 * i + 1] == 5 && snake[1] == 4) {
            if (sameDir == 1) {
                if (other_snake[8 * i] == 1) {
                    if (snake[0] == 1 || snake[0] == 2)  {
                        return 2;
                    } 
                } else if (other_snake[8 * i] == 2) {
                    if (snake[0] == 1) {
                        return 2;
                    } else if (snake[0] == 2) {
                        return 1;
                    }
                } else if (other_snake[8 * i] == 3) {
                    if (snake[0] == 1) {
                        return 2;
                    } else if (snake[0] == 2) {
                        return 1;
                    } else if (snake[0] == 3) {
                        return 1;
                    }
                } else if (other_snake[8 * i] == 4) {
                    if (snake[0] == 2) {
                        return 0;
                    } else if (snake[0] == 3) {
                        return 1;
                    } else if (snake[0] == 4) {
                        return 1;
                    }
                }
            } else if (sameDir == 3) {
                if (other_snake[8 * i] == 5) {
                    if (snake[0] == 5 || snake[0] == 4)  {
                        return 2;
                    } 
                } else if (other_snake[8 * i] == 4) {
                    if (snake[0] == 5) {
                        return 2;
                    } else if (snake[0] == 4) {
                        return 3;
                    }
                } else if (other_snake[8 * i] == 3) {
                    if (snake[0] == 5) {
                        return 2;
                    } else if (snake[0] == 4) {
                        return 3;
                    } else if (snake[0] == 3) {
                        return 3;
                    }
                } else if (other_snake[8 * i] == 2) {
                    if (snake[0] == 4) {
                        return 0;
                    } else if (snake[0] == 3) {
                        return 3;
                    } else if (snake[0] == 2) {
                        return 3;
                    }
                }
            }
        }
    }
    return -1;
}

export function greedy_snake_step(n: i32, snake: i32[], snake_num: i32, other_snake: i32[], food_num: i32, foods: i32[], round: i32) :i32 {
    if (round >= 2) {
        let sameDir = isSameDirection(snake, snake_num, other_snake);
        if (sameDir > -1) {
            let killerDir = killlOtherSnake(n, snake, snake_num, other_snake, sameDir);
            if (killerDir > -1) {
                return killerDir;
            }
        }
    }
    let finalDir = quickEatAndAvoid(n, snake, other_snake, snake_num, 8, foods);
    //let finalDir = 0;
    return finalDir;
}

