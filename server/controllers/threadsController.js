// controllers/threadController.js

const Thread = require('../Schema/threadsSchema');

async function getThreads(req, res) {
    const threads = await Thread.find();
    res.json(threads);
}

async function addThread(req, res) {
    const { username, new_thread } = req.body;
    const newItem = new Thread({ date: new Date().toLocaleDateString(), username, new_thread });
    await newItem.save();
    res.status(200).json(newItem);
}


async function likeThread(req,res){
    const _id =req.params.id;
    const itemToLike = await Thread.findByIdAndUpdate(_id,req.body)
    if (!itemToUpdate) return res.status(404).send('Item not found');
    res.status(200).send('Modified');
}



async function updateThread(req, res) {
    const _id = req.params.id;
    const itemToUpdate = await Thread.findByIdAndUpdate(_id, req.body);
    if (!itemToUpdate) return res.status(404).send('Item not found');
    res.status(200).send('Modified');
}

async function deleteThread(req, res) {
    const itemId = req.params.id;
    const itemToDelete = await Thread.deleteOne({ _id: itemId });
    if (!itemToDelete) return res.status(404).send('Item not found');
    res.status(200).send('Deleted');
}

module.exports = { getThreads, addThread, updateThread, deleteThread ,likeThread};
