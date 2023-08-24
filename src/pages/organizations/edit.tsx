import { Edit } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const OrganizationEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const organizationsData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("organizations.fields.id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("nom_unp", {
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.nom_unp}
                    helperText={(errors as any)?.nom_unp?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("organizations.fields.nom_unp")}
                    name="nom_unp"
                />
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("organizations.fields.title")}
                    name="title"
                />
                <TextField
                    {...register("fullname", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fullname}
                    helperText={(errors as any)?.fullname?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("organizations.fields.fullname")}
                    name="fullname"
                />

                <Controller
                    control={control}
                    name="is_active"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("organizations.fields.is_active")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
