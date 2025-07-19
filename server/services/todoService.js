import { nanoid } from "nanoid";

const todos = {};

export const todoService = {
    create(login, title) {
        if (typeof title !== 'string') {
            return { success: false, error: `Title should be a string, got ${typeof title}` }
        }
        const todo = {
            id: nanoid(),
            title,
            completed: false,
        }

        if (!todos[login]) {
            todos[login] = {}
        }

        todos[login][todo.id] = todo;

        return { success: true, data: todo };
    },
    get(login) {
        return { success: true, data: todos[login] ? Object.values(todos[login]) : [] };
    },
    update(login, id, data) {
        if (!todos.hasOwnProperty(login) || !todos[login].hasOwnProperty(id)) {
            return { success: false, error: `Todo with id ${id} not found` };
        }

        if (data.hasOwnProperty('title') && typeof data.title === 'string') {
            todos[login][id].title = data.title;
        }

        if (data.hasOwnProperty('completed')) {
            todos[login][id].completed = data.completed === true ? true : false;
        }

        console.log(todos[login]);

        return { success: true, data: todos[login][id] };
    },
    delete(login, id) {
        if (!todos.hasOwnProperty(login) || !todos[login].hasOwnProperty(id)) {
            return { success: false, error: `Todo with id ${id} not found` };
        }

        delete todos[login][id];

        return { success: true, data: Object.values(todos[login]) };
    }
}
