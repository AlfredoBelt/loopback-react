module.exports = (PetSitter) => {
    PetSitter.getPetsitter = async(req, res) => {
        try {
            const { id } = req.query
          const data = await PetSitter.find({ 
            where: {id},
            include: ["city", "petsType"]
        })
          if(!data) throw new Error("registros no encontrados")
          
          res.status(200).json({message: "operacion exitosa", data: data})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

    PetSitter.getOnePetSitter = async (req, res) => {
        try {
            const { id } = req.query
            if (!id) throw new Error("Hacen falta datos para continuar")

            const data = await PetSitter.find({
                include: {
                    relation: 'city',
                    scope: {
                        include: {
                            relation: 'state',
                            scope: {
                                where: { id }
                            }
                        },
                    }
                }
            })

            // Actualizar entidad
            // PetSitter.updateAll(
            //     { // Identificar entidad para actualizar },
            //     { // Datos para actualizar }
            // )
            res.send({message: 'Datos obtenidos con exito', data})
        } catch (error) {
            console.log(error);
            res.send({message: error.message})
        }
    }

    PetSitter.createPetsitter = async(req, res) => {
        try{
            const data = req.body
            const petSitter = await PetSitter.create(data)
            res.status(202).json({message: "Creado con exito", data: petSitter})
        } catch (error) {
            res.send({message: error.message})
        }
    }


    PetSitter.updatePetsitter = async(req, res) => {
        try{
            const { id } = req.query
            const data = req.body
            
            
            console.log(id)
            const petsitter = await PetSitter.updateAll({id: id}, {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.correo,
                telefono: data.telefono,
                fotoUrl: data.fotoUrl,
                edad: data.edad
            })
            res.status(200).json({message: "petsitter actualizado", data: petsitter})
        } catch (error) {
            res.send({message: error.message})
        }
    }

    PetSitter.deletePetsitter = async(req, res) => {
        try {
            const { id } = req.query
            if(!id) throw new Error("identificador no establecido")
    
            const petSitter = await PetSitter.deleteAll({id})
            console.log(typeof(petSitter))
            
            res.status(200).json({message: "eliminacion exitosa"})
        } catch (error) {
            res.status(400).json({message: error.message})
        }

    }

    PetSitter.remoteMethod('getPetsitter', {
      http: {
        path: '/sitters',
        verb: 'GET'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: { arg: 'response', type: 'object', root: true }
    });

    PetSitter.remoteMethod('getOnePetSitter', {
        description: 'Obtener datos del PetSitter',
        http: {
            path: '/sitter',
            verb: 'GET'
        },
        accepts: [
            { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
            { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
        ],
        returns: {
            arg: 'response',
            type: 'object',
            root: true
        }
    })

    PetSitter.remoteMethod("createPetsitter", {
        description: "Crear un nuevo Petsitter",
        http: {
            path: "/create",
            verb: "POST"
        },
        accepts: [
            {arg: "req", type: "object", http: ctx => { return ctx.req } },
            {arg: "res", type: "object", http: ctx => { return ctx.res } }
        ],
        returns: {
            arg: "response",
            type: "object",
            root: true
        }
    })

    PetSitter.remoteMethod('updatePetsitter', {
      http: {
        path: '/update',
        verb: 'PUT'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: { arg: 'response', type: 'object', root: true },
    });

    PetSitter.remoteMethod('deletePetsitter', {
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

