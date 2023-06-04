import OptionList from "./OptionList"
import AddOptionForm, { FormInputs } from "./AddOptionForm"
import { loadConfig, saveConfig } from "../hooks/storage"
import { HeaderRewriteOption } from "../types"
import { useEffect, useState } from "react"
import OptionFile from "./OptionFile"
import { removeRules } from "../hooks/rule"
import { addRules } from "../hooks/rule"
import clsx from "clsx"
import { FormProvider, useForm } from "react-hook-form"

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
        regexFilter: "^https://" + formData.pattern,
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
  const [enabledAll, setEnabledAll] = useState(true)
  const [options, setOptions] = useState<HeaderRewriteOption[]>([])
  const methods = useForm<FormInputs>({
    defaultValues: { type: "set", key: "", value: "" },
  })

  const onRemove = async (id: number) => {
    // 最新のオプションを取ってくる
    const config = await loadConfig()

    // 有効になっている設定があれば無効化する
    const enabledIds = config.options
      .filter((item) => item.id === id && item.enabled)
      .map((item) => item.id)
    removeRules(enabledIds)

    // オプションを削除する
    const items = config.options.filter((option) => option.id !== id)
    setOptions(items)
    setEnabledAll(config.enabledAll)
    saveConfig(items, config.enabledAll)
  }

  const onSubmit = (formData: FormInputs) => {
    const id = findAllocatableId(options)
    const option = convertToOption(id, formData)
    setOptions([...options, option])
    saveConfig([...options, option], enabledAll)
    methods.reset()
  }

  const onImport = (importedOptions: HeaderRewriteOption[]) => {
    setOptions(importedOptions)
    saveConfig(importedOptions, enabledAll)

    // ON になっているルールをすべて OFF にする
    const removeIds = options
      .filter((option) => option.enabled)
      .map((option) => option.id)
    removeRules(removeIds)

    // インポートしたルールのうち、必要なものを ON にする
    const rules = importedOptions
      .filter((option) => option.enabled)
      .map((option) => option.rule)
    addRules(rules)
  }

  const load = async () => {
    const config = await loadConfig()
    setOptions(config.options)
    setEnabledAll(config.enabledAll)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <div className={clsx("min-w-[1000px]", "min-h-[400px]", "m-4")}>
      <main>
        <section className={clsx("my-4")}>
          <h2 className={clsx("text-3xl")}>options</h2>
          <OptionList
            options={options}
            onRemove={onRemove}
            className={clsx("w-full", "my-2")}
          />
        </section>

        <section className={clsx("my-4")}>
          <h2 className={clsx("text-xl", "my-2")}>add option</h2>
          <FormProvider {...methods}>
            <AddOptionForm onSubmit={onSubmit} />
          </FormProvider>
        </section>

        <hr />

        <section className={clsx("my-4")}>
          <h2 className={clsx("text-xl", "my-2")}>import/export</h2>
          <OptionFile
            onImport={onImport}
            options={options}
            enabledAll={enabledAll}
          />
        </section>
      </main>
    </div>
  )
}

export default App
