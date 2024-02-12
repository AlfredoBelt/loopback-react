const utils = require("./util/util")

module.exports = (PetAndSitter) => {
    PetAndSitter.getFilteredPets = async(req, res) => {
        try {
            const { petSitterId } = req.query
            console.log(petSitterId)
            if(!petSitterId) throw new Error("identificador faltante")

            const petSitterWithPets = await PetAndSitter.find({
                where: { petSitterId },
                include: {
                    relation: "petsType"
                }
            })
            const parsedPetsitter = utils.cloneJson(petSitterWithPets)
            const newObject = {
                id: petSitterId,
                pets: []
            }
            for(x = 0; x <= parsedPetsitter.length; x++){
                let petSitter = parsedPetsitter[x]
    
                if(newObject.id == petSitter?.petSitterId){
                    newObject.pets.push(petSitter["petsType"])
                    newObject.petId = petSitter.petId
                    newObject.petSitterId = petSitter.petSitterId
                }
            }
       

            res.status(200).json({message: "operacion exitosa", data: newObject})
        } catch (error) {
            res.status(400).json({message: error.message})
            console.log(error)
        }
    }

    PetAndSitter.createRelation = async(req, res) => {
        try {
            const data = req.body
            if(!data) throw new Error("datos faltantes")

            const relation = await PetAndSitter.create(data)
            res.status(200).json({messsage: "relacion creada", data: relation})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    PetAndSitter.deleteRelation = async(req, res) => {
        try {
            const { petId, petSitterId } = req.query
            if(!petId && !petSitterId) throw new Error("identificador no establecido")
        
            const relation = await PetAndSitter.deleteAll({petId, petSitterId})
            res.status(200).json({message: "registro eliminado"})
        } catch (error) {
            res.send({message: error.message})
        }
    }

    PetAndSitter.remoteMethod('getFilteredPets', {
      http: {
        path: '/relations',
        verb: 'GET'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: { arg: 'response', type: 'object', root: true }
    });
    
    PetAndSitter.remoteMethod("createRelation", {
        description: "Crear la relacion de los petsType y los petsSitter",
        http: {
            path: "/create",
            verb: "POST"
        },
        accepts: [
            {arg: "req", type: "object", http: ctx => { return ctx.req } },
            {arg: "res", type: "object", http: ctx => { return ctx.res } },
        ],
        returns: {
            arg: "response",
            type: "object",
            root: true
        }
    })

    PetAndSitter.remoteMethod('deleteRelation', {
      http: {
        path: '/delete',
        verb: 'DELETE'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: { arg: 'response', type: 'object', root: true }
    });

}