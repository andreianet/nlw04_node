import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import {Request, Response} from 'express';
import { AppError } from "../errors/AppError";


class AnswerController{

    // Route Params -> são parametros que compõe a rota
    //exe.: routes.get("/answers/:value")

    //Query params -> serve para buscas, paginação - não obrigatórios
    //ex.: chave=valor
    async execute(request: Request, response: Response){
        //recebendo os paramentos da rota
        const {value} = request.params;
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        //buscando no repo
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        
        if(!surveyUser){
            throw new AppError("Survey User does not exists");
            
        }

        surveyUser.value = Number(value); //parseando 

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}
export {AnswerController};