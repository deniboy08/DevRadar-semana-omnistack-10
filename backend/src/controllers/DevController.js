const axios = require('axios');
const { update } = require('../models/Dev');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//Funções comuns para um controller: index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name, avatar_url, bio } = apiResponse.data;

            if (!name) {
                name = apiResponse.data.login;
            }

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

        }
        else return response.json({
            message: `O usuário ${dev.name} já possúi cadastro!`,
            dev
        });
        return response.json({
            message: `O usuário ${dev.name} foi cadastrado com sucesso!`,
            dev
        });
    },

    //Update (um unico dev) (nome, avatar, bio, localização, techs)
    async update(request, response) {
        //const { github_username } = request.params;
        const { github_username, name, bio, techs } = request.body;

        try {
            const dev = await Dev.findOneAndUpdate({github_username},
                {
                    name,
                    bio,
                    techs,
                }
            )
            return response.json({
                message: dev
            });
            //Retornar erro quando não conseguir apagar no banco de dados
        } catch (error) {
            response.send({
                error: 'O Usuário não foi encontrado'
            })
        };
    },

    //Destroy (deletar um dev)
    async destroy(request, response) {

        const { github_username } = request.query;

        try {
            const dev = await Dev.findOneAndDelete({ github_username })

            return response.json({
                message: `O usuário ${dev.github_username} foi excluido com sucesso`
            });
            //Retornar erro quando não conseguir apagar no banco de dados
        } catch (error) {
            response.send({
                error: 'O Usuário não foi encontrado'
            })
        };
    }
}