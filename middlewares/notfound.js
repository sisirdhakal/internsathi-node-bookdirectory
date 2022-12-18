
const {StatusCodes} =require("http-status-codes")


const notFound=(req,res,next)=>{
    return res.status(StatusCodes.NOT_FOUND).send("Oops !! Route doesnot exists")
}

module.exports=notFound