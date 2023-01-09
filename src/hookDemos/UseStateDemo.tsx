import { useState } from 'react'

function UseStateDemo() {
  // 声明一个新的状态变量，我们称之为 "count"
  const [count, setCount] = useState(0)

  return (
    <div className='w-[200px] h-[200px] flex flex-col justify-center items-center bg-slate-400 rounded-md m-auto mt-72'>
      <p className='mb-4'>你点击了 {count} 次</p>
      <button className="bg-slate-800 px-2 py-1 rounded-md" onClick={() => setCount(count + 1)}>点我</button>
    </div>
  )
}

export default UseStateDemo