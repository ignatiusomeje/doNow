const express = require('express');

const {createTodo, getAllTodo, getOneTodo,todoUpdate,todoDelete} = require('./../controllers/todos');
const authenticate = require('./../utilities/authenticator');

const router = express.Router();

router.use(authenticate);

router.post('/', createTodo);
router.get('/', getAllTodo);
router.get('/:id', getOneTodo);
router.patch('/:id', todoUpdate);
router.delete('/:id', todoDelete);

module.exports = router;
