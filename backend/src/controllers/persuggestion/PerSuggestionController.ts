import { Request, Response } from 'express';
import { PerSuggestionService } from '../../services/persuggestion/PerSuggestionService';

class PerSuggestionController {
  async handle(req: Request, res: Response) {
    const { input, user_id } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: "Input é obrigatório" });
    }
    
    if (!user_id) {
      return res.status(400).json({ error: "user_id é obrigatório" });
    }

    try {
      const perSuggestionService = new PerSuggestionService();// PerSuggestionService 
      const suggestions = await perSuggestionService.execute(input, user_id);
      
      return res.json({ suggestion: suggestions });
    } catch (error) {
      console.error("Erro ao gerar sugestões:", error);
      return res.status(500).json({ error: "Erro ao gerar sugestões" });
    }
  }
}
export {PerSuggestionController}; 