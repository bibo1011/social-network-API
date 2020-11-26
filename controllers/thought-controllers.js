const { Thought } = require('../models');
const { User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThought => res.json(dbThought))
        .catch(err => {
            console.log(err);
            res.json(404).json(err);
        })
    },
    //get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json( {message: 'no thought with this id found'});
                return;
            }
            res.json(dbThought)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create thought
    createThought({body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push : {users: _id}},
                { new: true }
            );
        })
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json({ message: 'no thought with this id found'});
                return;
            }
            res.json(dbThought)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })

    },
    //update thought
    updateThought({ params, body}, res) {
        Comment.findOneAndUpdate ({ _id: params.id }, body, { new: true})
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json(err);
            }
            res.json(dbThought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //delete thought
    deleteThought({ params }, res) {
        Comment.findByIdAndDelete({ _id: params.id})
        .then(dbThought => {
            if (!dbThought) {
                res.status(404).json({ message: 'No thought found with this id'})
                return;
            }
            res.json(dbThought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
}

module.exports = thoughtController