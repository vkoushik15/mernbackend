const vermiddleware =(req,res,next)=>{

 const  t =localStorage.getItem("jwtoken");
 const tr = !!t;
next();
}
module.exports = vermiddleware();