const { Schema, model } = require ('mongoose')

const UserSchema = new Schema(
    {
        username: {
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ] //values referencing the User model (self-reference)
        
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