import {Request, Response} from 'express';
import {GenSuggestionService} from '../../services/suggestion/GenSuggestionsService';

class SuggestionController {
    async handle(request: Request, response: Response) {
        const {user_id} = request.query;

        try{
            const genSuggestionService = new GenSuggestionService();
            const suggestions = await genSuggestionService.execute(user_id as string);
            
            return response.json(suggestions);
        }catch(error){
            return response.status(500).json({error: error.message});
        }
    }
}


export {SuggestionController};
