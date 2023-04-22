import "./App.css"
import RuleList from "./RuleList"
import AddRuleForm, { FormInputs } from "./AddRuleForm"
import { saveRules } from "../hooks/storage"
import { Rule } from "../types"
import { useState } from "react"

const convertToRule = (formData: FormInputs): Rule => {
  // TODO
  const id = 0
  const operation =
    formData.type === "set"
      ? chrome.declarativeNetRequest.HeaderOperation.SET
      : chrome.declarativeNetRequest.HeaderOperation.REMOVE

  return {
    id,
    name: formData.ruleName,
    rule: {
      id,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          {
            operation,
            header: formData.key,
            value: formData.value,
          },
        ],
      },
      condition: {
        regexFilter: formData.regExp,
      },
    },
  }
}

const App = () => {
  const [rules, setRules] = useState<Rule[]>([])

  const onRemove = (id: number) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const onSubmit = (formData: FormInputs) => {
    const rule = convertToRule(formData)
    saveRules([rule])
  }

  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>options</h2>
          <RuleList rules={rules} onRemove={onRemove} />
        </section>

        <section>
          <h2>add option</h2>
          <AddRuleForm onSubmit={onSubmit} />
        </section>
      </main>
    </>
  )
}

export default App
