import clsx from "clsx"
import { SubmitHandler, useForm } from "react-hook-form"

export type FormInputs = {
  name: string
  pattern: string
  type: "set" | "remove"
  key: string
  value?: string
}

const AddOptionForm: React.FC<{
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("flex", "flex-col", "gap-1", "items-start", "text-base")}
    >
      <label>
        name
        <input
          type="text"
          {...register("name", { required: true })}
          className={clsx("ml-4", "border", "border-current")}
        />
      </label>
      <label>
        pattern https://
        <input
          type="text"
          {...register("pattern", { required: true })}
          className={clsx("ml-4", "border", "border-current")}
        />
      </label>
      <label>
        type
        <select
          {...register("type")}
          className={clsx("ml-4", "border", "border-current")}
        >
          <option value="set">set</option>
          <option value="remove">remove</option>
        </select>
      </label>

      <label>
        header
        <input
          type="text"
          {...register("key", { required: true })}
          className={clsx("ml-4", "border", "border-current")}
        />
      </label>

      {isTypeSet && (
        <label>
          value
          <input
            type="text"
            {...register("value")}
            className={clsx("ml-4", "border", "border-current")}
          />
        </label>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className={clsx("border", "border-current")}
      >
        add
      </button>
    </form>
  )
}

export default AddOptionForm
