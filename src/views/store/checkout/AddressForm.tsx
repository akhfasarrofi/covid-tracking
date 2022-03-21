import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../../lib/comerce';
import CustomFormInput from './FormInput';

type TProps = {
  checkoutToken: any,
  test: any
  nextStep: any
  setShippingData: any
}

const AddressForm: React.FC<TProps> = ({ checkoutToken, test, nextStep, setShippingData }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState<any>('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries }: any = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions }: any = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId: string, country: string, stateProvince = null) => {
    const options: any =
      await commerce.checkout.getShippingOptions(
        checkoutTokenId, {
        country,
        // region: stateProvince
      });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivision);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption
            }))}
        >
          <Grid container spacing={3}>
            <CustomFormInput required name="firstName" label="First name" />
            <CustomFormInput required name="lastName" label="Last name" />
            <CustomFormInput required name="address1" label="Address line 1" />
            <CustomFormInput required name="email" label="Email" />
            <CustomFormInput required name="city" label="City" />
            <CustomFormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e: any) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e: any) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e: any) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((sO: any) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
