# React Hook

`Hook` 是 `React 16.8` 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

本文主要介绍 React 中内置的 Hook API 的使用。

Hook API 概览：

- `useState`
- `useEffect`
- `useContext`
- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`
- `useDeferredValue`
- `useTransition`
- `useId`
  
> [🔗 官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## useState

语法：

```js
const [state, setState] = useState(initialState)
```

`useState` 可以为函数式组件添加状态。它会返回一个包含两个元素的数组：`[当前状态值, 可用于更新状态的函数]`。

```js
import { useState } from 'react';

function Example() {
  // 声明一个新的状态变量，我们称之为 "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点我
      </button>
    </div>
  );
}
```

在这个例子中，我们使用 `useState` 声明了一个状态变量 `count`，并将它的初始值设置为 `0`。`useState` 钩子会返回一个包含当前状态值（在这种情况下是 `count`）和用于更新状态的函数（在这种情况下是 `setCount`）的数组。

然后我们可以在组件内使用状态值（`count`）和更新函数（`setCount`）来呈现动态内容并在某些事情发生时更新状态（如按钮单击）。

### 根据之前的状态更新状态

假设 `age` 是 `42`。此处理程序调用 `setAge(age + 1)` 三次：

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

然而，点击之后，`age` 只会是 `43` 而不是 `45`！这是因为调用该 `set` 函数不会更新已运行代码中的 `age` 状态变量。所以每次 `setAge(age + 1)` 都变成了 `setAge(43)`。

要想在 `useState` 中根据之前的状态值更新状态，可以将函数传递给更新函数（下面示例中的 `setCount`）。该函数将接收先前的状态值作为参数，并应返回新的状态值。

下面是使用函数根据先前的状态值更新状态的示例：

```js
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    // setCount 函数接受一个函数作为参数，该函数接收先前的状态值作为参数
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={incrementCount}>
        点我
      </button>
    </div>
  );
}

```

在这个示例中，我们有一个初始值为 `0` 的 `count` 状态变量和一个按钮。当单击该按钮时，会将计数器增加 `1`。`incrementCount` 函数通过将函数传递给 `setCount` 来更新 `count` 状态。该函数接收先前的 `count` 值作为参数（`prevCount`），并返回新值（`prevCount + 1`）。

在更新状态时遵循这种模式是有用的，因为它可以确保状态更新是基于最新的状态值。如果没有这种模式，状态可能会异步更新，导致意外行为。

### 更新状态中的对象和数组

您可以将对象和数组放入状态。在 React 中，状态被认为是只读的，所以你应该替换它而不是改变你现有的对象。例如，如果您有一个 `form` 的对象，请不要像这样更新它：

```js
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor';
```

相反，通过创建一个新对象来替换整个对象：

```js
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

### 避免重新创建初始状态

React 会保存一次初始状态，并在下一次渲染时忽略它。

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

尽管 `createInitialTodos()` 的结果仅用于初始渲染，但仍会在每次渲染时调用此函数。如果要创建大型数组或执行昂贵的计算，这可能会造成浪费。

要解决这个问题，可以将其作为初始化函数传递给 `useState`：

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

请注意，传递 `createInitialTodos` 的是函数本身，而不是 `createInitialTodos()` 函数调用的结果。如果你传递一个函数给 `useState`，React 只会在初始化期间调用它。

### 一键重置状态

您可以通过传递给组件不同的 `key` 来重置组件的状态。

在下面的示例中，我们可以通过给子组件 `Form` 传递 `key` prop，然后通过 `handleReset` 方法更改 `key` 指向的值来重新渲染子组件 `Form`：

```js
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```

## useEffect

语法：

```js
useEffect(setup, dependencies?)
```

`useEffect` 可以让你在函数式组件中执行副作用操作，例如获取数据、订阅、设置计时器等。

使用 `useEffect` 的方式如下：

```js
import { useEffect } from 'react';

function Example() {
  useEffect(() => {
    // 这里是副作用代码，例如获取数据、订阅或设置计时器
  });

  return (
    // 组件的渲染内容
  );
}
```

在这个例子中，我们调用了 `useEffect` 钩子，并将一个匿名函数作为参数传递给它。这个匿名函数中的代码就是我们要执行的副作用。

需要注意的是，`useEffect` 会在组件每次渲染后调用，所以你可能需要提供一个第二个参数来控制何时触发副作用。例如：

```js
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 这里的副作用只会在 count 改变时触发
  useEffect(() => {
    console.log(`Count is ${count}`);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

在这个例子中，我们提供了一个数组作为第二个参数，其中包含了要监听的变量（这里是 `count`）。这样，每当 `count` 改变时，才会触发副作用。

如果你希望在组件卸载时清除副作用，可以返回一个清除函数。例如：

```js
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // 这里的函数会在组件卸载时调用，用于清除计时器
    return () => clearInterval(interval);
  });

  return (
    <div>
      <p>The count is {count}</p>
    </div>
  );
}
```
