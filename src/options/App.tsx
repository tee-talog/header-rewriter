import "./App.css"
import RuleList from "./RuleList"
import AddRuleForm, { FormInputs } from "./AddRuleForm"
import { loadRules, saveRules } from "../hooks/storage"
import { HeaderRewriteRule } from "../types"
import { useEffect, useState } from "react"

// フォームの値を Rule に変換する
const convertToRule = (id: number, formData: FormInputs): HeaderRewriteRule => {
  const operation =
    formData.type === "set"
      ? chrome.declarativeNetRequest.HeaderOperation.SET
      : chrome.declarativeNetRequest.HeaderOperation.REMOVE

  return {
    id,
    name: formData.ruleName,
    enabled: false,
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

// 使っていない最小の ID を返す
const findAllocatableId = (rules: HeaderRewriteRule[]) => {
  if (rules.length === 0) {
    return 1
  }

  const ids = rules.map((rule) => rule.id)
  ids.sort()
  const allocatable = ids.findIndex((id, i) => id !== i + 1)
  return allocatable === -1 ? allocatable : ids.length + 1
}

const App = () => {
  const [rules, setRules] = useState<HeaderRewriteRule[]>([])

  const onRemove = (id: number) => {
    const items = rules.filter((rule) => rule.id !== id)
    setRules(items)
    saveRules(items)
  }

  const onSubmit = (formData: FormInputs) => {
    const id = findAllocatableId(rules)
    const rule = convertToRule(id, formData)
    setRules([...rules, rule])
    saveRules([...rules, rule])
  }

  const load = async () => {
    const items = await loadRules()
    setRules(items)
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
