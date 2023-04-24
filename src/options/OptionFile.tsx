import { JsonValue } from "type-fest"
import { HeaderRewriteOption } from "../types"
import clsx from "clsx"

// TODO バリデーションライブラリでの実装
const validateHeaderRewriteOptions = (
  json: any,
): json is HeaderRewriteOption[] => {
  if (json == null || !Array.isArray(json)) {
    return false
  }

  return json.every((item) => {
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
  onImport: (options: HeaderRewriteOption[]) => void
  options: HeaderRewriteOption[]
}> = ({ onImport, options }) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) {
      return
    }
    // 同名ファイルを登録できるように、ファイルの選択を解除する
    event.currentTarget.value = null as any as string

    const text = await file.text()
    const json = JSON.parse(text) as JsonValue
    if (validateHeaderRewriteOptions(json)) {
      onImport(json)
    }
    // TODO handle error
    console.log("error")
  }

  // ファイル書き出し
  const onExport = () => {
    const str = JSON.stringify(options)
    const blob = new Blob([str], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    chrome.downloads.download({ url, filename: "options.json", saveAs: true })
  }

  return (
    <>
      <label className={clsx("border", "border-current")}>
        Import
        <input
          type="file"
          accept="application/json"
          onChange={onChange}
          className={clsx("hidden")}
        />
      </label>
      <button
        type="button"
        onClick={onExport}
        className={clsx("border", "border-current")}
      >
        Export
      </button>
    </>
  )
}

export default OptionFile
