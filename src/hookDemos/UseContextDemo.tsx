import { useState, useContext, createContext, Component } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ThemeType>('light')

function UseContextDemo() {
  const [theme, setTheme] = useState<ThemeType>('light');
  return (
    <div className='mx-auto mt-72 px-20'>
      <button className="py-2 px-4 text-sm rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 mb-6" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
      <ThemeContext.Provider value={theme}>
      <Form />
      </ThemeContext.Provider></div>
  )
}

function Form() {
  return <Panel title="Welcome">
    <Button>Sign up</Button>
      <Button>Log in</Button>
  </Panel>
}

// 函数组件使用 useContext 获取 context
function Panel(props: any) {
  const theme = useContext(ThemeContext)
  return <div className={`w-[300px] rounded-md shadow-md ${theme === 'light' ? 'bg-emerald-200 text-[#333]' : 'bg-emerald-900'}  p-12`}>
    <div className="text-[30px] font-medium mb-6">{props.title}</div>
    {props.children}
  </div>
}

// 类组件使用 this.context 获取 context
class Button extends Component<{children: string}> {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;

  render() {
    return <button className={`mr-2 py-1 px-2 font-semibold rounded-lg shadow-md ${this.context === 'dark' ? 'bg-slate-500 text-white' : 'bg-white text-[#333]'}`}>{this.props.children}</button>
  }
}

export default UseContextDemo