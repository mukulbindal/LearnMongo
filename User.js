const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String
});
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    age: {
        type:Number,
        min: 5,
        max: 150,
        validate: {
            validator: v=>{
                return v%2==0;
            },
            message: props=>{
                return `${props.value} is not an even number`;
            }
        }
    },
    email: {
        type: String,
        minLength: 5,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
    friend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: AddressSchema
});

UserSchema.methods.say = function() {    // method is Object level - can be used on any document
    console.log(`Hi My name is ${this.name}`);
}

UserSchema.statics.findByName = function(name) { // statics is a class level function, should be called on 'User'
    return this.find(
        {
            name: new RegExp("^"+name+"$", "i")
        }
    );
}

UserSchema.query.byName = function(name) { // query can be chained
    return this.where(
        {
            name: new RegExp(name+".*", "i")
        }
    );
}

UserSchema.virtual('Intro').get(function(){
    return `I am ${this.name}, ${this.age} years old`;
});

UserSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

UserSchema.post('save', function(doc, next){
    doc.say();
    next();
});
module.exports = mongoose.model('User', UserSchema);