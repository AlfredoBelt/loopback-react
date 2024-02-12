const utils = require("./util/util")

module.exports = (User) => {
    User.createUser = async(req, res) =>{
        let response = {};
        try{
            const data = req.body;
            if(!data.correo || !data.contraseña) throw new Error("Hacen falta datos para continuar")

            const user = await User.create(data)
            
            response.message = "Usuario creado con exito"
            response.data = user
            res.send(response)
        }catch(err){
            console.log(err)
            res.status(400).send({message: err.message})
        }
    }
    
    User.remoteMethod('createUser', {
        description: 'Metodo test para obtener usuario con id 1',
        http: {
          path: '/create',
          verb: 'POST'
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

  User.login = async(req, res) => {
    let response = {}
    try{
      // TODO: Validar campos desde cliente
      const {correo, contraseña} = req.body
      console.log(correo, contraseña)
      if(!correo || !contraseña) {
        throw new Error("datos faltantes")
      }

      // ejemplo de operador AND
    //   const user = await User.findOne({ where: {and: [ {correo}, {contraseña} ] } })
    const user = await User.findOne({where: {correo}})
      console.log(user)
      if(!user) throw new Error("usuario no encontrado")
      
        if(correo != user.correo || contraseña != user.contraseña){
            throw new Error("credenciales incorrectas")
        }

      // TODO: Validar usuario en DB con credenciales obtenidas
      // TODO: Enviar los datos del usuario, en caso de ser valido
      res.status(200).json({message: "Login exitoso",
                            data: user})
    }catch (error) {
      res.send({message: error.message})
    }
  }

  
  User.remoteMethod('login', {
    description: 'validar login',
    http: {
      path: '/login',
      verb: 'POST'
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

}