import assert from "assert";
import { greedySnakeMoveBarriers } from "../build/release.js";
// assert.strictEqual(greedySnakeMove(), 3);
// console.log("ok");


// 测试函数
export function testGreedySnakeMoveBarriers(){
    // 测试数据1：蛇能够朝上移动并吃到果子
    let snake1 = [3, 3, 3, 4, 3, 5, 3, 6];  // 蛇身坐标，依次为蛇头、第二节、第三节、蛇尾
    let fruit1 = [4, 3];  // 果子坐标
    let barriers1 = [
      1, 1, 1, 2, 2, 2, 5, 5, 6, 6, 7, 7, 7, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2  // 障碍物坐标
    ];
  
    let result1 = greedySnakeMoveBarriers(snake1, fruit1, barriers1);
    assert(result1 === 3, `Test 1 Failed: Expected 3 but got ${result1}`);
  
    // 测试数据2：蛇被障碍物阻挡，无法移动
    let snake2 = [3, 3, 3, 4, 3, 5, 3, 6];
    let fruit2= [4, 3];
    let barriers2 = [
      3, 2, 3, 4, 3, 6, 5, 5, 6, 6, 7, 7, 0, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2
    ];
  
    let result2 = greedySnakeMoveBarriers(snake2, fruit2, barriers2);
    assert(result2 === -1, `Test 2 Failed: Expected -1 but got ${result2}`);
  
    // 测试数据3：蛇可以向右移动并吃到果子
    let snake3 = [3, 3, 3, 4, 3, 5, 3, 6];
    let fruit3 = [4, 6];
    let barriers3 = [
      1, 1, 1, 2, 2, 2, 5, 5, 6, 6, 7, 7, 0, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2
    ];
  
    let result3 = greedySnakeMoveBarriers(snake3, fruit3, barriers3);
    assert(result3 === 3, `Test 3 Failed: Expected 3 but got ${result3}`);
     // 测试数据4：果子被障碍物围住，蛇无法到达
  let snake4 = [3, 3, 3, 4, 3, 5, 3, 6];
  let fruit4 = [4, 4];
  let barriers4 = [
    3, 3, 3, 4, 3, 5, 4, 3, 4, 5, 5, 4, 1, 1, 1, 2, 2, 2, 5, 5, 6, 6, 7, 7
  ];

  let result4 = greedySnakeMoveBarriers(snake4, fruit4, barriers4);
  assert(result4 === -1, `Test 4 Failed: Expected -1 but got ${result4}`);

  // 测试数据5：蛇可以朝下移动并吃到果子
  let snake5 = [3, 3, 3, 4, 3, 5, 3, 6];
  let fruit5 = [3, 7];
  let barriers5  = [
    1, 1, 1, 2, 2, 2, 5, 5, 6, 6, 7, 7, 0, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2
  ];

  let result5 = greedySnakeMoveBarriers(snake5, fruit5, barriers5);
  assert(result5 === 2, `Test 5 Failed: Expected 2 but got ${result5}`);

  // 测试数据6：蛇头和果子之间有障碍物，无法直接吃到果子
  let snake6 = [3, 3, 3, 4, 3, 5, 3, 6];
  let fruit6 = [6, 6];
  let barriers6 = [
    4, 6, 5, 6, 6, 5, 6, 4, 6, 3, 7, 7, 0, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2
  ];

  let result6 = greedySnakeMoveBarriers(snake6, fruit6, barriers6);
  assert(result6 === -1, `Test 6 Failed: Expected -1 but got ${result6}`);

  // 测试数据7：蛇可以吃到果子
  let snake7 = [3, 3, 3, 4, 3, 5, 3, 6];
  let fruit7 = [4, 3];
  let barriers7 = [
    1, 1, 1, 2, 2, 2, 5, 5, 6, 6, 7, 7, 0, 5, 1, 4, 2, 6, 6, 3, 6, 4, 7, 2
  ];

  let result7 = greedySnakeMoveBarriers(snake7, fruit7, barriers7);
  assert(result7 === 0, `Test 7 Failed: Expected 0 but got ${result7}`);

  console.log("All tests passed successfully!");
}

// 运行测试
testGreedySnakeMoveBarriers();