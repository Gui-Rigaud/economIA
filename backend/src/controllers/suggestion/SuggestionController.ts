import {Request, Response} from 'express';
import {GenSuggestionService} from '../../services/suggestion/GenSuggestionsService';

class SuggestionController {
    async handle(request: Request, response: Response) {
        const {transactions} = request.body;
        const genSuggestionService = new GenSuggestionService();
        const suggestions = await genSuggestionService.execute(transactions);

        return response.json(suggestions);
    }
}


export {SuggestionController};
