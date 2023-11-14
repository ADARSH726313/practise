

exports.homeRoutes = (req, res) => {
    res.render('index');    
}

exports.RegRoutes = (req, res) => {
    res.render('register');    
}

exports.Add_P =(req,res)=>{
    res.render('admin/add_P')
}
