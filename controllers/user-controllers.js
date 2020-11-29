const { User } = require ('../models')

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //get user by id
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts, friends',
            select:'-__v'
        })
        .select('-__v')
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id'})
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new:true })
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id'})
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id'})
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId }},
            { new: true }
        )
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id'})
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: params.friendId }},
            { new: true }
        )
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id'})
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

}

module.exports = userController