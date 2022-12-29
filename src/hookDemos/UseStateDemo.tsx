import { useState } from 'react'

function UseStateDemo() {
  // 声明一个新的状态变量，我们称之为 "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点我</button>
    </div>
  )
}

export default UseStateDemo