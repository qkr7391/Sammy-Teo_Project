const { default: mongoose } = require("mongoose");
// for stronger password
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 5,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    refreshToken: String,
});

// Before User model is saved
// using bcryptjs
// At this point, must use just function(), not arrow function.
// If we use arrow function, we would meet a problem of this binding.
userSchema.pre("save", async function (next) {
    // user is the data that we want to save
    let user = this;
    console.log(user);
    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10); // make random value
        const hash = await bcrypt.hash(user.password, salt); // Hash password with salt
        user.password = hash;
    }
});

// When user tries to login, it should be used.
userSchema.methods.comparePassword = async function (plainPassword) {
    let user = this;
    // bcrypt compare and return true or false
    const match = bcrypt.compare(plainPassword, user.password);
    return match;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
