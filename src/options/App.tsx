import { useEffect, useState } from "react"
import "./App.css"
import OptionList from "./OptionList"
import AddOptionForm from "./AddOptionForm"
import { SubmitHandler } from "react-hook-form"
import { loadOptions } from "../hooks/storage"
import { HeaderRewriteOption } from "../types"

// TODO 仮
type Inputs = {
  ruleName: string
  regExp: string
  type: "set" | "remove"
  keyValue: {
    header: string
    value?: string
  }[]
}

const App = () => {
  // TODO 子側でバリデーション。zod を使うと型変換ができるみたい
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  const [options, setOptions] = useState<HeaderRewriteOption[]>([])

  const load = async () => {
    const opt = await loadOptions()
    setOptions(opt)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>options</h2>
          <OptionList options={options} />
        </section>

        <section>
          <h2>add option</h2>
          <AddOptionForm onSubmit={onSubmit} />
        </section>
      </main>
    </>
  )
}

export default App
