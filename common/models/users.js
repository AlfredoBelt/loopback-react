const utils = require("./util/util")

module.exports = (User) => {
  User.createUser = async (req, res) => {
    try {
      const data = req.body;
      if (!data.correo || !data.contraseña) throw new Error("Hacen falta datos para continuar")

      const user = await User.create(data)

      res.status(202).json({
        message: "operación exitosa",
        data: data
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ 
        message: "error al crear el usuario",
        error: err.message })
    }
  }

  User.remoteMethod('createUser', {
    description: 'Crear usuario',
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

  User.login = async (req, res) => {
    try {
      const { correo, contraseña } = req.body

      if (!correo || !contraseña) throw new Error("datos faltantes")

      const user = await User.findOne({ where: { correo } })
      
      if (!user) throw new Error("usuario no encontrado")

      if (correo !== user.correo || contraseña !== user.contraseña) 
      throw new Error("credenciales incorrectas")

      res.status(200).json({
        message: "Login exitoso",
        data: user
      })
    } catch (error) {
      res.status(401).json({ 
        message:"error de verificiación de credenciales",
        error: error.message })
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