class Pair {
    constructor(public x: i32, public y: i32) {}
  
    // 判断两个 Pair 是否相等
    equals(other: Pair): bool {
      return this.x === other.x && this.y === other.y;
    }

    hashCode(): i32 {
        return this.x * 1009 + this.y; // 简单的哈希函数
    }
  }
export function greedySnakeMoveBarriers(snake: i32[], fruit: i32[], barriers: i32[]): i32 {
    // 场地大小
    const fieldSize: i32 = 8;

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