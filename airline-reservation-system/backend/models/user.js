const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    Password: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    PassportNumber: {
        type: Number,
        required: true,
    },
    HomeAddress: {
        type: String,
        required: true,
    },CountryCode: {
        type: Number,
        required: true,
    },
    TelephoneNumber: {
        type: Array,
        required: true,
    },
    Token: {
        type: String,
        required: false,
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    try {
      /* 
      Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      */
      
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.Password, salt)
        this.Password = hashedPassword
            next()
    } catch (error) {
      next(error)
    }
  })
 
  


const User = mongoose.model('users', userSchema);
module.exports = User;

// const mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     bcrypt = require('bcrypt'),
//     SALT_WORK_FACTOR = 10;

//     const UserSchema = new Schema({
//     username: { type: String, required: true, index: { unique: true } },
//     password: { type: String, required: true }
// });

// UserSchema.pre(save, function(next) {
//     const user = this;

// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();

// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);

//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//     });
// });


// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

// module.exports = mongoose.model(User, UserSchema);