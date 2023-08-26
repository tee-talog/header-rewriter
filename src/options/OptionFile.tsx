import { JsonValue } from "type-fest"
import { ApplicationConfig, HeaderRewriteOption } from "../types"
import clsx from "clsx"
import Button from "../components/Button"
import { useRef } from "react"
import Input from "../components/Input"

// TODO バリデーションライブラリでの実装
const validateHeaderRewriteOptions = (json: any): json is ApplicationConfig => {
  if (json == null) {
    return false
  }

  const { options, version, enabledAll } = json

  if (version !== 1) {
    return false
  }
  if (typeof enabledAll !== "boolean") {
    return false
  }

  if (options == null || !Array.isArray(options)) {
    return false
  }

  return options.every((item) => {
    if (item == null || typeof item !== "object") {
      return false
    }

    if (
      typeof item.id !== "number" ||
      typeof item.name !== "string" ||
      typeof item.enabled !== "boolean" ||
      item.rule == null ||
      typeof item.rule !== "object"
    ) {
      return false
    }

    if (
      typeof item.rule.id !== "number" ||
      item.rule.action == null ||
      typeof item.rule.action !== "object" ||
      item.rule.condition == null ||
      typeof item.rule.condition !== "object"
    ) {
      return false
    }

    if (typeof item.rule.condition.regexFilter !== "string") {
      return false
    }

    if (
      item.rule.action.type !== "modifyHeaders" ||
      item.rule.action.requestHeaders == null ||
      !Array.isArray(item.rule.action.requestHeaders)
    ) {
      return false
    }

    if (item.rule.action.requestHeaders.length !== 1) {
      return false
    }

    if (
      item.rule.action.requestHeaders[0].operation === "set" &&
      (typeof item.rule.action.requestHeaders[0].header !== "string" ||
        typeof item.rule.action.requestHeaders[0].value !== "string")
    ) {
      return false
    }

    if (
      item.rule.action.requestHeaders[0].operation === "remove" &&
      item.rule.action.requestHeaders[0].value !== undefined
    ) {
      return false
    }

    return true
  })
}

const OptionFile: React.FC<{
  onImport: (options: HeaderRewriteOption[], enabled: boolean) => void
  options: HeaderRewriteOption[]
  enabledAll: boolean
}> = ({ onImport, options, enabledAll }) => {
  const refInputFile = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    refInputFile.current?.click()
  }

  const importFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) {
      return
    }
    // 同名ファイルを登録できるように、ファイルの選択を解除する
    event.currentTarget.value = null as any as string

    const text = await file.text()
    const json = JSON.parse(text) as JsonValue
    if (validateHeaderRewriteOptions(json)) {
      onImport(json.options, json.enabledAll)
      return
    }
    // TODO handle error
    console.log("error")
  }

  // ファイル書き出し
  const exportOptions = () => {
    const str = JSON.stringify({ options, enabledAll, version: 1 })
    const blob = new Blob([str], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    chrome.downloads.download({ url, filename: "options.json", saveAs: true })
  }

  return (
    <div className={clsx("flex", "gap-4")}>
      <Button type="button" onClick={openFileDialog}>
        インポート
      </Button>
      <Input
        ref={refInputFile}
        type="file"
        accept="application/json"
        onChange={importFile}
        className={clsx("hidden")}
      />

      <Button type="button" onClick={exportOptions}>
        エクスポート
      </Button>
    </div>
  )
}

export default OptionFile
