function isValid(arr) {
  let x, y;
  x = arr[0];
  y = arr[1];
  return x > 0 && x < 8 && y > 0 && y < 8;
}

const printPaths = (path, space = "") => {
  path.forEach((p, i) => {
    if (i == path.length - 1) {
      console.log(`${space}${p}  💪⚡🔥😎🤣😁💻📌🌟✨ `);
      return;
    }

    console.log(`${space}${p} ↴ ${i + 1}`);
    space += " ";
  });
};

function Queue() {
  this.items = [];
}
Queue.prototype.enqueue = function (item) {
  this.items.push(item);
};
Queue.prototype.dequeue = function () {
  return this.items.shift();
};
Queue.prototype.isEmpty = function () {
  return this.items.length <= 0 ? true : false;
};

const moves = [
  [-1, -2],
  [1, 2],
  [-2, -1],
  [2, -1],
  [1, -2],
  [-2, 1],
  [-1, 2],
  [2, 1],
];

function knightMoves(start = [0, 0], end = [1, 2]) {
  console.log(`start ${start} and end ${end}`);
  if (
    end[1] >= 0 &&
    end[1] < 8 &&
    end[0] >= 0 &&
    end[0] < 8 &&
    start[0] >= 0 &&
    start[0] <= 7
  ) {
    console.log("ok");
  } else {
    alert("input out of range ");
    return "invalid";
  }

  let q = new Queue(); //like a binary tree [0,0] ,[[0,0],[1,2]],[[0,0],[2,1]] ..
  let set = new Set(); //upto 6 levels 2**6 = 64 O(2^n)
  q.enqueue([start]);
  set.add(start.toString());

  let mv = 0;
  while (!q.isEmpty()) {
    mv++;

    let path = q.dequeue();
    let currentNode = path[path.length - 1]; //accessing last element (current node where knight sits);
    //1st cn = [0,0]    then [0,0],[1,2]   [0,0],[2,1] .... [][][][][][];so 2^6
    // but eventuall dequeing [0,0] and so on so base case is met.

    if (currentNode[0] == end[0] && currentNode[1] == end[1]) {
      console.log(`made in ${path.length - 1} moves`); //h
      printPaths(path);
      break;
    } else {
      moves.forEach((mv) => {
        let newNode = [
          mv[0] + currentNode[0], //x axis
          mv[1] + currentNode[1], //yaxis
        ];
        if (!set.has(newNode.toString()) && isValid(newNode)) {
          set.add(newNode.toString()); //marked
          q.enqueue([...path, newNode]); // attach the whole path with new node
          // eg [ [0,0],[1,2]]  and push and next [[0,0],[2,1]] ....
        }
      });
    }
  }
}

knightMoves([2, 6], [3, 3]);
knightMoves([7, 7], [3, 3]);
knightMoves([6, 3], [3, 4]);

