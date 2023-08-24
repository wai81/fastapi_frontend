import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { CrudFilters, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const OrganizationCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: organizationAutocompleteProps } = useAutocomplete({
    resource: "organizations",

    onSearch: (value) => {
      const filters: CrudFilters = [];
      filters.push({
        field: "q",
        operator: "eq",
        value: value.length > 0 ? value : undefined,
      });
      return filters;
    },

    sorters: [{ field: "id", order: "asc" }],
  });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: t('required.field'),
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={t("organizations.fields.id")}
                    name="id"
                />
                <TextField
                    {...register("nom_unp",{
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.nom_unp}
                    helperText={(errors as any)?.nom_unp?.message}
                    margin="normal"
                    //fullWidth
                    //InputLabelProps={{ shrink: true }}
                    type="number"
                    label={t("organizations.fields.nom_unp")}
                    name="nom_unp"
                                        
                /> 
                <TextField
                    {...register("title", {
                        required: t('required.field'),
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t("organizations.fields.title")}
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
                    label={t("organizations.fields.fullname")}
                    name="fullname"
                />
                {/* <Controller
                    control={control}
                    name="head_organization_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...organizationAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                //field.onChange(value?.id ?? value);
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return `${
                                    organizationAutocompleteProps?.options?.find(
                                        (p) => p.id === item.id
                                        // (p) =>
                                        //     p?.id?.toString() ===
                                        //     (item?.id ?? item)?.toString(),
                                    )?.title ?? ""
                                } (${item.id})`;
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t(
                                        "organizations.fields.head_organization_id"
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.head_organization_id}
                                    helperText={
                                        (errors as any)?.head_organization_id
                                            ?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                /> */}
                <Controller
                    control={control}
                    name="is_active"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={t("organizations.fields.is_active")}
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
        </Create>
    );
};
