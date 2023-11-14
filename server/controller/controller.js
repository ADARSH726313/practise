const Userdb = require('../model/Umodel');
const Productdb = require('../model/Product');
const UserReview = require('../model/UserReview');


exports.create = async (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).render('register', { mess: "Content can not be empty!" });
        return;
    }

    try {
        const user = new Userdb({
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            phon: req.body.phon,
        });

        const data = await user.save();

        res.render('register', { mess: "Register Succ" });

    } catch (err) {
        res.render('register', { mess: "Something went wrong on the server" });
    }
}

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).render('register', { mess: "Content can not be empty!" });
        return;
    }

    try {
        const email = req.body.email;
        const password = req.body.pass;

        const user = await Userdb.findOne({ email, pass: password });

         // jo bhi email,pass yaaha pe hai  wo schema se hoga brata 
         //so if u want to find  from the input using db.users.findOne
         // --> u need to find from schema and give its variable name after : 

        if (user) {

            if (user.profile === "admin") {

                //
                    try {
                        console.log("in agree");   
                        const result = await UserReview.aggregate([
                            {
                                $group: {
                                    _id: "$productName",
                                    likeCount: {
                                        $sum: { $cond: [{ $eq: ["$review", "like"] }, 1, 0] }
                                    },
                                    dislikeCount: {
                                        $sum: { $cond: [{ $eq: ["$review", "dislike"] }, 1, 0] }
                                }
                            }}
                        ]).exec();
                        console.log("out agree");   
                        console.log(result);
                        
                        // res.render('admin/admin_dashboard', { user,result });
                        res.render('admin/admin_dashboard', { result });

                    } catch (err) {
                        console.error(err);
                    }
                
            
                // 
                // res.render('admin/admin_dashboard', { user });
            } else {
                console.log("user");

                
                try {
                    const product = await Productdb.find();
                    console.log("get product");

                    if(user.hasS == true){
                        res.render('thanks', { mess: "You can review only one time." });
                    }   

                    res.render('dashboard', { user, product });
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }
            };

        }
        
        
        else {
            res.render('index', { mess: "Invalid email or password" });
        }
    } catch (err) {
        res.render('index', { mess: "Something went wrong on the server" });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name } = req.body;

       
        const existingProduct = await Productdb.findOne({ name });

        if (existingProduct) {
            return res.render('admin/add_P', { mess: "Product name already exists" });
        }
        
        const newProduct = new Productdb({ name });

        const savedProduct = await newProduct.save();

        res.render('admin/add_P', { mess: "Added" });

        // res.status(201).json(savedProduct); 
    } catch (error) {
        console.log(error);
        res.render('admin/admin_dashboard', { mess: "Somthing wentWrong" });

        // res.status(500).json({ error: 'An error occurred while creating the product.' });
    }
};

exports.getAllProduct = async (req, res) => {
    
    const products = await Productdb.find();

    res.render('productReview', { products });
};

exports.SubmitUserRev = async (req, res) => {

    const userEmail = req.body.userEmail; 
    const productName = req.body.productName; 
    const review = req.body.review;

    const userReview = new UserReview({
        userEmail,
        productName,
        review,
    });

    try {
       
        await userReview.save();

        await Userdb.updateOne({ email: userEmail }, { $set: { hasS: true } });

        res.render('thanks', { mess: "Thank you, your review is submitted." });

    } catch (error) {
        console.log(error);
        
        res.render('thanks', { mess: "Something went wrong on the server." });
    }
};