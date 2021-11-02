const User = require('../schema/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    signup(req, res){
        res.render('signup');
    }
    register(req, res, next){
        bcrypt.hash(req.body.password, 10, function(err, hashedPass){
            if(err) {
                res.send(err);
            }
            let user = new User ({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPass,
                NaID: req.body.NaID,
                DOB: req.body.DOB,
            })
            user.save()
            .then(user => {
                res.redirect('/products')
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

    login(req, res){
        res.render('login')
    }

    auth(req, res){
        var password = req.body.password;

        User.findOne({username: req.body.username})
        .then(user => {
            if(user){ 
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.send(err);
                    }
                    if (result){
                        let token = jwt.sign({name: user._id}, 'SecretValue', {expiresIn: '1h'});
                        if (user.admin == true){
                            res.redirect('/admin?token=Bearer '+token);
                        }
                        else {
                            res.redirect('/?token=Bearer '+token);
                        }
                        
                    } else {
                        res.send("Login Unsucessfully");
                    }
                })
            }else{
                res.send('Wrong');
            }   
        })
    }
}

module.exports = new UserController;