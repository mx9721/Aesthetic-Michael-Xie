/*
  # Demo code for L-systems
*/


// ## An L-System needs...
// variables, constants (alphabet)
// rules (production rules)
// a way to expand a string through iteration
// way to interpret string into visual 

// ## The dragon curve drawn using an L-system.
// variables : F G
// constants : + −
// start  : F
// rules  : (F → F+G), (G → F-G)
// angle  : 90°
let alphabet = ['F', 'G', '+', '-'];
const axiom = alphabet[Math.floor(Math.random() * 2)];
const rules = {
  'F': 'F-G',
  'G': 'F+G',
  '-': '-',
  '+': '+'
};

const iterate_once = (lindenmayerString) => {
  let newString = '';
  for (let i = 0; i < lindenmayerString.length; i++) {
    const result = rules[lindenmayerString[i]];
    newString += result || lindenmayerString[i];
  }
  return newString;
}

const iterateNTimes = (n, lindenmayerString) => {
  let newString = lindenmayerString;
  for (let i = 0; i < n; i++) {
    newString = iterate_once(newString);
  }
  return newString;
};

const makeVisual = (options, lindenmayerString) => {
  let theSvgString = '';
  
  // Basically constants
  let angle = (options.angle || 90) * Math.PI / 180;
  let startingPoint = options.startingPoint || [0, 0];
  let lineLength = options.lineLength || 10;

  // State
  let rotation = 0;
  let points = [startingPoint];

  const moveForward = () => {
    const lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * (lineLength * Math.random() * 2);
    const dy = Math.sin(rotation) * (lineLength * Math.random() * 2);

    points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
  };

  const whatToDo = {
    'F': () => {
      return moveForward();
    },
    'G': () => {
      return moveForward();
    },
    '+': () => {
      rotation = rotation - angle - (Math.random() * 20);
    },
    '-': () => {
      rotation = rotation + angle + (Math.random() * 20);
    }
  };

  for (let i = 0; i < lindenmayerString.length; i++) {
    const toDo = whatToDo[lindenmayerString[i]];
    toDo();
  }

  // return a path moving through all the points
  return `<polyline points="${points.join(' ')}" 
                    fill="none" stroke="green" 
                    stroke-width="0.05px"/>`;
  
};

const expanded = iterateNTimes(16, axiom);

const result = makeVisual({
  lineLength: 0.5,
  angle: (Math.random() * 180),
  startingPoint: [(Math.random() * 100), (Math.random() * 100)]
}, expanded)  + 
makeVisual({
  lineLength: 0.7,
  angle: (Math.random() * 180),
  startingPoint: [(Math.random() * 100), (Math.random() * 100)]
}, expanded) +
makeVisual({
  lineLength: 0.9,
  angle: (Math.random() * 180),
  startingPoint: [(Math.random() * 100), (Math.random() * 100)]
}, expanded) +
makeVisual({
  lineLength: 1.1,
  angle: (Math.random() * 180),
  startingPoint: [(Math.random() * 100), (Math.random() * 100)]
}, expanded);

// get result into the svg in the dom
const svg = document.querySelector('svg');
svg.innerHTML = result;

// let oneStep = iterate_once(axiom);
// debugger;