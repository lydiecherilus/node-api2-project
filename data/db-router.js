const express = require('express');
const router = express.Router()

const Posts = require('./db.js');


// GET all posts
router.get('/', (req, res) => {
    Posts.find().then(posts => {
        res.status(200).json(posts);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "The posts information could not be retrieved" })
    });
})


//GET posts by id
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.findById(postId).then((posts) => {
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        };
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "The post information could not be retrieved." })
    });
})


// GET a post comments by id 
router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id).then((comments) => {
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "The comments information could not be retrieved" })
    });
})


//POST/CREATE a post
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (title && contents) {
        Posts.insert({ title, contents }).then(posts => {
            res.status(201).json(posts);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database" })
        });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

//POST/CREATE a comment for a post - not working properly - getting correct error messages - but not created
router.post("/:id/comments", (req, res) => {
    const postId = req.params.id;
    const data = req.body
    id = req.params.id
Posts.findById(postId).then((posts) => {
    if (!posts) {
        return res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
    } else if (!data.text) {
            res.status(400).json({ errorMmessage: "Please provide text for the comment." })
    } else {
        Posts.insertComment(data.text).then(comment => {
            res.status(201).json(comment)
        }).catch(error => {
            res.status(500).json({ errorMessage: "There was an error while saving the comment to the database" })
        })
    }
})
})



// DELETE a post
router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.remove(req.params.id).then(removed => {
        if (removed) {
            res.status(200).json(removed);
        } else {
            res.status(500).json({ errorMessage: "The post with the specified ID does not exist." })
        }
    }).catch(err => {
        console.log(error);
        res.status(500).json({ errorMessage: "The post could not be removed" })

    });
})


// PUT/UPDATE a post
router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const { title, contents } = req.body;
    if (title && contents) {
        Posts.update(postId, { title, contents }).then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(500).json({ errorMessage: "The post with the specified ID does not exist." })
            }
        }).catch(error => {
            res.status(500).json({ errorMessage: "The post information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

module.exports = router