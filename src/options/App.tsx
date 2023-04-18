import { useState } from "react"
import "./App.css"
import RuleList from "./RuleList"
import AddRuleForm from "./AddRuleForm"

const App = () => {
  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>rules</h2>
          <RuleList rules={[]} />
        </section>

        <section>
          <h2>add rule</h2>
          <AddRuleForm />
        </section>
      </main>
    </>
  )
}

export default App
