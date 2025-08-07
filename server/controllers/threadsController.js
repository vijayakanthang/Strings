// controllers/threadsController.js

const Thread = require('../Schema/threadsSchema');

// Get all threads
async function getThreads(req, res) {
    try {
        const threads = await Thread.find().sort({ date: -1 }); // Sort by date descending
        res.json(threads);
    } catch (error) {
        res.status(500).send("Error fetching threads");
    }
}

// Add a new thread
async function addThread(req, res) {
    const { username, new_thread } = req.body;
    try {
        const newItem = new Thread({
            date: new Date(),
            username,
            new_thread,
            like: [],
            comment: []
        });
        await newItem.save();
        res.status(200).json(newItem);
    } catch (error) {
        res.status(500).send("Error creating thread");
    }
}

// Toggle like for a thread
async function likeThread(req, res) {
    const _id = req.params.id;
    const { username } = req.body;

    try {
        const thread = await Thread.findById(_id);
        if (!thread) return res.status(404).send("Thread not found");

        const alreadyLiked = thread.like.includes(username);

        if (alreadyLiked) {
            thread.like = thread.like.filter(u => u !== username);
        } else {
            thread.like.push(username);
        }

        await thread.save();
        res.status(200).json(thread);
    } catch (error) {
        console.error('Error in likeThread:', error);
        res.status(500).send("Server Error");
    }
}

// Update thread content (optional, unused in frontend now)
async function updateThread(req, res) {
    const _id = req.params.id;
    try {
        const itemToUpdate = await Thread.findByIdAndUpdate(_id, req.body);
        if (!itemToUpdate) return res.status(404).send('Item not found');
        res.status(200).send('Modified');
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

// Delete a thread
async function deleteThread(req, res) {
    const itemId = req.params.id;
    const username = req.body.username; 

    try {
        const thread = await Thread.findById(itemId);
        if (!thread) return res.status(404).send('Item not found');

        if (thread.username !== username) {
            return res.status(403).send('Not authorized');
        }

        await Thread.deleteOne({ _id: itemId });
        res.status(200).send('Deleted');
    } catch (error) {
        res.status(500).send('Server Error');
    }
}


// Add comment to a thread
async function commentThread(req, res) {
    const _id = req.params.id;
    const { username, comment } = req.body;

    try {
        const thread = await Thread.findById(_id);
        if (!thread) return res.status(404).send("Thread not found");

        thread.comment.push({
            username,
            text: comment,
            date: new Date()
        });

        await thread.save();
        res.status(200).json(thread);
    } catch (error) {
        console.error('Error in commentThread:', error);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getThreads,
    addThread,
    updateThread,
    deleteThread,
    likeThread,
    commentThread
};
