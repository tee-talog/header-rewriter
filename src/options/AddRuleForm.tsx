import { SubmitHandler, useForm } from "react-hook-form"

export type FormInputs = {
  ruleName: string
  regExp: string
  type: "set" | "remove"
  key: string
  value?: string
}

const AddRuleForm: React.FC<{
  onSubmit: SubmitHandler<FormInputs>
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: { type: "set", key: "", value: "" },
  })

  const isTypeSet = watch("type") === "set"

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        rule name
        <input type="text" {...register("ruleName", { required: true })} />
      </label>
      <label>
        regexp
        <input type="text" {...register("regExp", { required: true })} />
      </label>
      <label>
        type
        <select {...register("type")}>
          <option value="set">set</option>
          <option value="remove">remove</option>
        </select>
      </label>

      <label>
        header
        <input type="text" {...register("key", { required: true })} />
      </label>

      {isTypeSet && (
        <label>
          value
          <input type="text" {...register("value")} />
        </label>
      )}

      <hr />

      <button type="submit" disabled={!isValid}>
        add
      </button>
    </form>
  )
}

export default AddRuleForm
