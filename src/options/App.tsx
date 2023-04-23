import "./App.css"
import OptionList from "./OptionList"
import AddOptionForm, { FormInputs } from "./AddOptionForm"
import { loadOptions, saveOptions } from "../hooks/storage"
import { HeaderRewriteOption } from "../types"
import { useEffect, useState } from "react"
import OptionFile from "./OptionFile"
import { JsonValue } from "type-fest"

// フォームの値をオプションに変換する
const convertToOption = (
  id: number,
  formData: FormInputs,
): HeaderRewriteOption => {
  const operation =
    formData.type === "set"
      ? chrome.declarativeNetRequest.HeaderOperation.SET
      : chrome.declarativeNetRequest.HeaderOperation.REMOVE

  const requestHeaders = [
    formData.type === "set"
      ? {
          operation,
          header: formData.key,
          value: formData.value,
        }
      : {
          operation,
          header: formData.key,
        },
  ]

  return {
    id,
    name: formData.name,
    enabled: false,
    rule: {
      id,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
        requestHeaders,
      },
      condition: {
        regexFilter: formData.pattern,
      },
    },
  }
}

// 使っていない最小の ID を返す
const findAllocatableId = (options: HeaderRewriteOption[]) => {
  if (options.length === 0) {
    return 1
  }

  const ids = options.map((option) => option.id)
  ids.sort()
  const allocatable = ids.findIndex((id, i) => id !== i + 1)
  return allocatable === -1 ? ids.length + 1 : allocatable
}

const App = () => {
  const [options, setOptions] = useState<HeaderRewriteOption[]>([])

  const onRemove = (id: number) => {
    const items = options.filter((option) => option.id !== id)
    setOptions(items)
    saveOptions(items)
  }

  const onSubmit = (formData: FormInputs) => {
    const id = findAllocatableId(options)
    const option = convertToOption(id, formData)
    setOptions([...options, option])
    saveOptions([...options, option])
  }

  const onImport = (json: JsonValue) => {
    //
  }

  const onExport = () => {
    //
  }

  const load = async () => {
    const items = await loadOptions()
    setOptions(items)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <div style={{ width: "800px" }}>
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

        <section>
          <h2>import/export</h2>
          <OptionFile onImport={onImport} onExport={onExport} />
        </section>
      </main>
    </div>
  )
}

export default App
