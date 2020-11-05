
const jwt = require('jsonwebtoken')
exports.authenticateToken  = (req,res,next)=>{
    const {token} = req.headers
    console.log(token)
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,"@#$%^9787tygh",(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user 
        console.log(req.user,user)
        next()
    })
    

}
