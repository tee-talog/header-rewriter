import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

type Inputs = {
  ruleName: string
  regExp: string
  type: "set" | "remove"
  keyValue: {
    header: string
    value?: string
  }[]
}

const AddOptionForm: React.FC<{
  onSubmit: SubmitHandler<Inputs>
}> = ({ onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<Inputs>({ defaultValues: { type: "set" } })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyValue",
  })

  const addHeaderValueField = () => {
    append({ header: "", value: "" })
  }

  const removeHeaderValueField = (index: number) => {
    remove(index)
  }

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

      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <label>
              header
              <input
                type="text"
                {...register(`keyValue.${index}.header` as const, {
                  required: true,
                })}
              />
            </label>
            {isTypeSet && (
              <>
                <label>
                  value
                  <input
                    type="text"
                    {...register(`keyValue.${index}.value` as const)}
                  />
                </label>
              </>
            )}
            <button type="button" onClick={() => removeHeaderValueField(index)}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addHeaderValueField}>
        +
      </button>

      <hr />

      <button type="submit" disabled={!isValid}>
        add
      </button>
    </form>
  )
}

export default AddOptionForm
