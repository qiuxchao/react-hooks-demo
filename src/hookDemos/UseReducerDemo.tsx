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

  return <div className="flex"><input value={title} type="text" className='mr-4' onInput={(e: any) => setTitle(e.target.value)} /><button onClick={handleAdd}>添加</button></div>
}

function TodoList({ todos, onChange, onDelete }: TodoListPropsType) {
  const [editList, setEditList] = useState(todos.map(() => false))

  const handleChange = (todo: TodoType, index: number) => {
    editList[index] && onChange(todo)
    editList[index] = !editList[index]
    setEditList([...editList]);
  }
  const handleDelete = (id: TodoType['id']) => {
    onDelete(id)
  }

  return <>
    {
      todos.map((todo, index) =>
        <div key={todo.id} className="flex items-center">
          <input type="checkbox" className='mr-4' checked={todo.done} onChange={(e: any) => todo.done = e.target.checked} />
          {editList[index] ? <input type="text" value={todo.title} onInput={(e: any) => todo.title = e.target.value} /> : todo.title}
          <button onClick={() => handleChange(todo, index)}>{editList[index] ? '保存' : '修改'}</button>
          <button onClick={() => handleDelete(todo.id)}>删除</button>
        </div>
      )}
  </>
}