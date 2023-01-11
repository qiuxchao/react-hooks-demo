import { useReducer, useState } from 'react'

type TodoType = typeof initialTodos[number];
type ActionType = 'add' | 'delete' | 'update'
interface Action<T extends ActionType> {
  type: T;
  title: T extends 'add' ? TodoType['title'] : never;
  id: T extends 'delete' ? TodoType['id'] : never;
  todo: T extends 'update' ? TodoType : never;
}
interface AddTodoPropsType {
  onAdd: (title: TodoType['title']) => void
}
interface TodoListPropsType {
  todos: TodoType[];
  onChange: (todo: TodoType) => void;
  onDelete: (id: TodoType['id']) => void
}
type TodoPropsType = Omit<TodoListPropsType, 'todos'> & {todo: TodoType}

let todoId = 3;
const initialTodos = [
  {
    id: 1,
    title: '🎤',
    done: false,
  },
  {
    id: 2,
    title: '💃',
    done: true,
  },
  {
    id: 3,
    title: '🎹',
    done: false,
  },
];

// reducer
const todoReducer = <T extends ActionType>(todos: TodoType[], action: Action<T>): TodoType[] => {
  switch (action.type) {
    case 'add': {
      return [...todos, { id: ++todoId, title: action.title, done: false }]
    }
    case 'delete': {
      return todos.filter(todo => todo.id !== action.id)
    }
    case 'update': {
      return todos.map(todo => {
        return todo.id === action.todo.id ? action.todo : todo
      })
    }
    default: {
      throw new Error(`Unknown action ${action.type}`)
    }
  }
}

export default function UseReducerDemo() {

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // 添加
  const handleAddTodo = (title: TodoType['title']) => {
    dispatch({
      type: 'add',
      title,
    } as Action<'add'>)
  };

  // 修改
  const handleChangeTodo = (todo: TodoType) => {
    dispatch({
      type: 'update',
      todo
    } as Action<'update'>);
  };

  // 删除
  const handleDeleteTodo = (id: TodoType['id']) => {
    dispatch({
      type: 'delete',
      id,
    } as Action<'delete'>)
  };

  return (
    <div className="mt-72 flex justify-center flex-col items-center">
      <AddTodo onAdd={handleAddTodo} />
      <TodoList todos={todos} onChange={handleChangeTodo} onDelete={handleDeleteTodo} />
    </div>
  )
}

function AddTodo({ onAdd }: AddTodoPropsType) {
  const [title, setTitle] = useState('')
  const handleAdd = () => {
    title && onAdd(title);
    setTitle('');
  }

  return <div className="flex mb-6">
    <input 
      value={title} 
      type="text" 
      className='mr-4 px-2 py-1 leading-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400' 
      onInput={(e: any) => setTitle(e.target.value)} />
      <button 
        className='transition duration-700 ease-in-out transform hover:scale-125 bg-emerald-600 text-white py-1 px-3 rounded-md' 
        onClick={handleAdd}>添加</button>
    </div>
}

function TodoList({ todos, onChange, onDelete }: TodoListPropsType) {
  return <>
    {
      todos.map((todo) =>
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onChange={onChange} />
      )}
  </>
}

function Todo({todo, onChange, onDelete }: TodoPropsType) {
  const [isEdit, setIsEdit] = useState(false)

  return <div className="flex items-center mb-2">
          <div className="w-[134px]">
            <input 
              type="checkbox" 
              className='mr-4 scale-150' 
              checked={todo.done} 
              onChange={(e: any) => onChange({...todo, done: e.target.checked})} />
          {isEdit ? 
            <input 
              type="text" 
              className='w-[100px] p-1 rounded-md border'
              value={todo.title}
              onInput={(e: any) => onChange({...todo, title: e.target.value})} /> : 
            todo.title
          }
          </div>
          <button 
            className="ml-4 py-1 px-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 mr-2" 
            onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? '保存' : '修改'}</button>
          <button 
            className="py-1 px-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75" 
              onClick={() => onDelete(todo.id)}>删除</button>
        </div>
}