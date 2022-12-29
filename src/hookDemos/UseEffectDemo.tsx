import { useEffect, useState } from 'react';

export default function () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // 这里的函数会在组件卸载时调用，用于清除计时器
    return () => clearInterval(interval);
  });

  useEffect(() => {
    console.log(`Count is ${count}`)
  }, [count])

  return (
    <div>
      <p>The count is {count}</p>
    </div>
  );
}
