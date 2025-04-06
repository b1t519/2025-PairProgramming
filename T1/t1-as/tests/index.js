import assert from "assert";
import { greedy_snake_move } from "../build/release.js";
// assert.strictEqual(greedy_snake_move(), 3);
// console.log("ok");

function testgreedy_snake_move() {
    // 测试用例 1：蛇头在左上角，果子在右下角
    let snakePositions = new Int32Array([1, 1, 2, 1, 3, 1, 4, 1]); // 蛇头 (1, 1), 身体 (2, 1), (3, 1), (4, 1)
    let fruitPosition = new Int32Array([8, 8]); // 果子 (8, 8)
    let result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 0, `Test 1 failed, expected 0, got ${result}`);

    // 测试用例 2：蛇头在右上角，果子在左下角
    snakePositions = new Int32Array([8, 1, 7, 1, 6, 1, 5, 1]); // 蛇头 (8, 1), 身体 (7, 1), (6, 1), (5, 1)
    fruitPosition = new Int32Array([1, 8]); // 果子 (1, 8)
    result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 0, `Test 2 failed, expected 0, got ${result}`);

    // 测试用例 3：蛇头与身体重合，向右时冲突
    snakePositions = new Int32Array([3, 3, 4, 3, 5, 3, 6, 3]); // 蛇头 (3, 3), 身体 (4, 3), (5, 3), (6, 3)
    fruitPosition = new Int32Array([8, 3]); // 果子 (8, 3)
    result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 0, `Test 3 failed, expected 0, got ${result}`); // 应该向下

    // 测试用例 4：蛇头与身体重合，向左时冲突
    snakePositions = new Int32Array([3, 3, 2, 3, 1, 3, 1, 2]); // 蛇头 (3, 3), 身体 (2, 3), (1, 3), (0, 3)
    fruitPosition = new Int32Array([1, 1]); // 果子 (1, 1)
    result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 0, `Test 4 failed, expected 1, got ${result}`); // 应该向下

    // 测试用例 5：蛇头与身体重合，向上时冲突
    snakePositions = new Int32Array([3, 1, 3, 2, 3, 3, 3, 4]); // 蛇头 (3, 1), 身体 (3, 2), (3, 3), (3, 4)
    fruitPosition = new Int32Array([3, 8]); // 果子 (3, 8)
    result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 1, `Test 5 failed, expected 1, got ${result}`); // 应该向左
    // 测试用例 6：蛇头与身体重合，向下时冲突
    
    snakePositions = new Int32Array([3, 8, 3, 7, 3, 6, 3, 5]); // 蛇头 (3, 8), 身体 (3, 7), (3, 6), (3, 5)
    fruitPosition = new Int32Array([3, 1]); // 果子 (3, 1)
    result = greedy_snake_move(snakePositions, fruitPosition);
    console.assert(result === 1, `Test 6 failed, expected 1, got ${result}`); // 应该向左
}

testgreedy_snake_move();