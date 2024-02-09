module.exports = (Review) => {
    Review.getFilteredReview = async(req, res) => {
        
        try{
            const { id } = req.query
            if(!id) throw new Error("identificador no establecido")

            const review = await Review.find({ where: { petSitterId:id }})
            console.log(id)
            if(!review) throw new Error("registros no encontrados")

            res.status(200).json({message: "operacion exitosa", data:review})
        }catch(error){
            console.log(error)
            res.status(400).send({message: error.message})
        }
    }

    Review.createReview = async(req, res) => {
        try {
            const data = req.body
            if(!data) throw new Error("datos faltantes")

            const review = Review.create(data)
            res.status(202).json({message: "operacion exitosa", data: data})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    Review.remoteMethod("getFilteredReview", {
        description: "obtener reviews desde mongo",
        http: {
            path: "/reviews",
            verb: "GET"
        },
        accepts: [
            {arg: "req", type: "object", http: ctx => {return ctx.req}},
            {arg: "res", type: "object", http: ctx => {return ctx.res}},
        ],
        returns: {
            arg: "response",
            type: "object",
            root: true
        }
    })

    Review.remoteMethod('createReview', {
      http: {
        path: '/reviews',
        verb: 'POST'
      },
      accepts: [
        { arg: 'req', type: 'object', http: ctx => { return ctx.req } },
        { arg: 'res', type: 'object', http: ctx => { return ctx.res } }
      ],
      returns: { arg: 'response', type: 'object', root: true }
    });

}