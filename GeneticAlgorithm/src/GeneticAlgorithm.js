function makeNewGeneration() {
    let totalScore = 0;
    for (let p of nextGen) {
      totalScore += p.score;
    }
    console.log(totalScore)
    for (let p of nextGen) {
      p.fitness = p.score / totalScore;
    }
    for (let i = 0; i < NPOPULATION; i++) {
      let index = 0;
      let selector = random();
      while (selector > 0) {
        selector -= nextGen[index].fitness;
        index += 1;
      }
      index -= 1;
      let child = nextGen[index];
      child.mutate(0.25);
      currGen[i] = new Player(child.brain);
    }
    nextGen = [];
  }