import { useState } from "react"
import "./App.css"
import OptionList from "./OptionList"
import AddOptionForm from "./AddOptionForm"

const App = () => {
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
          <AddOptionForm />
        </section>
      </main>
    </>
  )
}

export default App
