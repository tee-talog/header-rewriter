import clsx from "clsx"
import { useFormContext } from "react-hook-form"
import Button from "../components/Button"
import Input from "../components/Input"
import Select from "../components/Select"
import React, { ReactNode } from "react"

export type FormInputs = {
  name: string
  pattern: string
  type: "set" | "remove"
  key: string
  value?: string
}

const FormItem: React.FC<{
  label: string
  children: ReactNode
}> = ({ label, children }) => {
  return (
    <label className={clsx("flex", "items-center")}>
      <span className={clsx("w-20")}>{label}</span>
      <div>{children}</div>
    </label>
  )
}

const AddOptionForm: React.FC<{
  onSubmit: (inputs: FormInputs) => void
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useFormContext<FormInputs>()

  const isTypeSet = watch("type") === "set"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("flex", "flex-col", "gap-1", "items-start", "text-base")}
    >
      <FormItem label="name">
        <Input type="text" {...register("name", { required: true })} />
      </FormItem>

      <FormItem label="pattern">
        https://
        <Input type="text" {...register("pattern", { required: true })} />
      </FormItem>

      <FormItem label="type">
        <Select {...register("type")}>
          <option value="set">set</option>
          <option value="remove">remove</option>
        </Select>
      </FormItem>

      <FormItem label="header">
        <Input type="text" {...register("key", { required: true })} />
      </FormItem>

      {isTypeSet && (
        <FormItem label="value">
          <Input type="text" {...register("value")} />
        </FormItem>
      )}

      <Button type="submit" disabled={!isValid}>
        add
      </Button>
    </form>
  )
}

export default AddOptionForm
