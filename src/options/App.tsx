import { useState } from "react"
import "./App.css"
import OptionList from "./OptionList"
import AddOptionForm from "./AddOptionForm"
import { SubmitHandler } from "react-hook-form"

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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }
  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>options</h2>
          <OptionList options={[]} />
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
