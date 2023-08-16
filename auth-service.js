
const bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    //   password2: {
    //     type: String,
    //     required: true,
    //   },
      email: {
        type: String,
        required: true,
      },
      loginHistory: [{
        dateTime: {
          type: Date,
          required: true,
        },
        userAgent: {
          type: String,
          required: true,
        }
      }]
    });

let User; //to be defined on new connection (see initialize)

//  module.exports = userSchema;

const connectionString = "mongodb+srv://SammyTeo:SammyTeo@cluster0.cqgtsmc.mongodb.net/";
// const connectionString = "mongodb+srv://SaemiPark:q1w2e3r4@cluster0.cfu0q0w.mongodb.net/?retryWrites=true&w=majority";

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(connectionString);

        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });
    });
};


module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        // if (userData.password != userData.password2) {
        //     reject("Passwords do not match")
        // }
        // else{
        //     let newUser = new User(userData);
        //     newUser.save()
        //     .then(()=> resolve())
        //     .catch((err) => {
        //         if (err.code == 11000) {
        //             reject("User Name already taken");
        //         }
        //         else{
        //             reject("There was an error creating the user: " + err);
        //         }})
        //     }

        bcrypt.hash(userData.password, 10)
        .then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
            // TODO: Store the resulting "hash" value in the DB
            userData.password = hash;
            let newUser = new User(userData);
            newUser.save()
            .then(()=> resolve())
            .catch((err) => {
                if (err.code == 11000) {
                    reject("User Name already taken");
                }
                else{
                    reject("There was an error creating th user: " + err);
                }})
        })
        .catch((err)=>{
            // Show any errors that occurred during the process
            reject("There was an error encrypting the password");
        });
        
        }
)}


module.exports.checkUser = (userData) => {
    return new Promise((resolve, reject) => {
        // User.find({ userName : userData.userName})
        // .then(users => {
        //     if (users.length === 0) {
        //         reject("Unable to find user: " + userData.userName);
        //     }
        //     else if (users[0].password != userData.password2) {
        //         reject("Incorrect Password for user: " + userData.userName);
        //     } else {
        //         const loginEntry = {dateTime : new Date().toString(), userAgent : userData.userAgent};
        //         users[0].loginHistory.push(loginEntry);

        //         User.updateOne({ userName : users[0]. userName}, {$set : {loginHistory : users[0].loginHistory}})
        //         .then(() => resolve=(users[0]))
        //         .catch((err) => reject("There was an error verifying the user: " + err));
        //     }
        // })
        // .catch((err) => reject("Unable to find user: " + userData.userName))

        User.findOne({ userName : userData.userName})
        .then(user => {
            if (!user) {
                reject("Unable to find user: " + userData.userName);
                return;
            }
            else{
                bcrypt.compare(userData.password, user.password)
                .then((result) => {
                    // result === true if it matches and result === false if it does not match
                    if (result) {
                        user.loginHistory.push({dateTime : new Date().toString(), userAgent : userData.userAgent});
                        User.updateOne({ userName : user.userName}, {$set : {loginHistory : user.loginHistory}})
                        .then(() => resolve(user))
                        .catch((err) => reject("There was an error verifying the user: " + err));
                    }
                    else{
                        reject("Incorrect Password for user: " + userData.userName);
                    }
                 });
            }     
        })
 })
}