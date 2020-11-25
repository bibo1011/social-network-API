const { Schema, model } = require ('mongoose')
const thoughtsSchema = require('./Thought')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is Required'
        },
        email: {
            type: String,
            required: 'Email is Required',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [thoughtsSchema], //values referencing the Thought model
        friends: [UserSchema] //values referencing the User model (self-reference)
        
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;