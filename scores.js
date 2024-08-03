function getAverage(scores) {
    let sum = 0;
  
    for (const score of scores) {
      console.log("Score:", score);  // Imprime el puntaje actual
      sum += score;
      console.log("Sum after adding score:", sum);  // Imprime la suma acumulada
    }
  
    return sum / scores.length;
  }
  
  // Ejemplo de uso
  const scores = [85, 92, 78];
  console.log("Average:", getAverage(scores)); // Imprime el promedio
  
