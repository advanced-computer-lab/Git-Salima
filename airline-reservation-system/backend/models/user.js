const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, { timestamps: true });

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