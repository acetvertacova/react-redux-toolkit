import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../validation/menu.schema";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../store/menu/actions";
import { useNavigate } from "react-router";

/**
 * MenuForm component for creating or editing a menu item.
 * Uses react-hook-form for form state management and validation with Yup.
 *
 * @component
 * @returns {JSX.Element} The rendered MenuForm component.
 */
export default function NewMenuItemForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), // Form validation using Yup schema
        mode: "onChange", // Real-time validation
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes", // Handles dynamic list of sizes
    });

    const onSubmit = (data) => {
        dispatch(addMenuItem(data));
        navigate("/");
    }

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Name:</label>
                <input className="form-input" type="text" {...register("name")} />
                {errors.name && <div className="form-error">{errors.name.message}</div>}
            </div>

            <div className="form-group">
                <label>Description:</label>
                <input className="form-input" type="text" {...register("description")} />
                {errors.description && <div className="form-error">{errors.description.message}</div>}
            </div>

            <div className="form-group">
                <label>Price:</label>
                <input className="form-input" type="text" {...register("price")} />
                {errors.price && <div className="form-error">{errors.price.message}</div>}
            </div>

            <div className="form-group">
                <label>Image:</label>
                <input className="form-input" type="text" {...register("image")} />
                {errors.image && <div className="form-error">{errors.image.message}</div>}
            </div>

            <div className="form-group">
                <label>Category:</label>
                <input className="form-input" type="text" {...register("category")} />
                {errors.category && <div className="form-error">{errors.category.message}</div>}
            </div>

            <div className="form-group">
                <label>Sizes:</label>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <input className="form-input" {...register(`sizes.${index}`)} defaultValue={field.value} />
                        {errors.sizes && errors.sizes[index] && (
                            <p className="form-error">{errors.sizes[index].message}</p>
                        )}
                        <button className="button" type="button" onClick={() => remove(index)}>Delete</button>
                    </div>
                ))}
                <button className="button" type="button" onClick={() => append("")}>Add</button>
            </div>

            <button className="button" type="submit">Create</button>
        </form>
    );
}