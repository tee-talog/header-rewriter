import { useEffect, useState } from "react"
import "./App.css"
import OptionList from "./OptionList"
import AddOptionForm from "./AddOptionForm"
import { SubmitHandler } from "react-hook-form"
import { loadOptions, saveOptions } from "../hooks/storage"
import { HeaderRewriteOption, UuidString } from "../types"

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

const headerRewriteOptionFrom = (value: Inputs): HeaderRewriteOption => {
  const { ruleName, regExp, type, keyValue } = value
  const id = crypto.randomUUID()

  switch (type) {
    case "set":
      return {
        id,
        name: ruleName,
        regexFilter: regExp,
        type: "set",
        keyValue: keyValue.map(({ header, value }) => ({
          header,
          value: value ?? "",
        })),
      }

    case "remove":
      return {
        id,
        name: ruleName,
        regexFilter: regExp,
        type: "remove",
        headers: keyValue.map(({ header }) => header),
      }

    default:
      throw new Error()
  }
}

const App = () => {
  // TODO 子側でバリデーション。zod を使うと型変換ができるみたい
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const option = headerRewriteOptionFrom(data)
    // TODO await
    saveOptions([...options, option]).then(() => {
      load()
    })
  }

  const onRemove = (id: UuidString) => {
    // TODO await
    const items = options.filter((option) => option.id !== id)
    saveOptions(items).then(() => {
      load()
    })
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
          <OptionList options={options} onRemove={onRemove} />
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
