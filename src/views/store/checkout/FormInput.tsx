import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

type TProps = {
  name: string,
  label: string,
  required: boolean
}

const FormInput: React.FC<TProps> = (props: TProps) => {
  const { name, label, required } = props
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
}

export default FormInput;