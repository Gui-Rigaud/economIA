
export function extractJsonFromString(inputString) {
    try {
      // Expressão regular para identificar conteúdo JSON dentro da string
      const jsonRegex = /```json([\s\S]*?)```/;
  
      // Executa a regex e extrai o conteúdo
      const match = inputString.match(jsonRegex);
  
      if (match && match[1]) {
        const jsonString = match[1].trim(); // Remove espaços extras ao redor do JSON
        const jsonData = JSON.parse(jsonString); // Converte para objeto JSON
        return jsonData;
      } else {
        throw new Error("Nenhum conteúdo JSON encontrado na string fornecida.");
      }
    } catch (error) {
      console.error("Erro ao extrair JSON:", error.message);
      return null;
    }
  }
  