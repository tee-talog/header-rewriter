import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  ruleName: string
  regExp: string
  type: "set" | "remove"
  header: string
  value: string
}

const AddOptionForm: React.FC<{
  onSubmit: SubmitHandler<Inputs>
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<Inputs>({ defaultValues: { type: "set" } })

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
        <li>
          <label>
            header
            <input type="text" {...register("header", { required: true })} />
          </label>
          {isTypeSet && (
            <>
              <label>
                value
                <input type="text" {...register("value")} />
              </label>
            </>
          )}
        </li>
      </ul>
      <button type="button">+</button>

      <hr />

      <button type="submit" disabled={!isValid}>
        add
      </button>
    </form>
  )
}

export default AddOptionForm
