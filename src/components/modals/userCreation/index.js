import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Divider,
} from "@mui/material";
import {LoadingButton} from '@mui/lab'
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import ErrorMessage from "src/utils/errorMessage";
import SelectStyling from "src/utils/selectStyling";
import { ORGANIZATIONS, ROLES, STATUS, STATES, LGAs } from "src/constants";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {useUserAuth} from 'src/context'
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";
import { getFunctions, httpsCallable } from "firebase/functions";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: "10px 40px",
  //   px: 4,
  //   pb: 3,
};
const CreateUser = (props) => {
  const { open, handleClose, isEditing={}, isUserCreated } = props;
  const {user, signUp, db, createUser} = useUserAuth();
  const { setLoading, loading, users, updateUser, setNotify } = useStore(
    (state) => ({
      setLoading: state?.setLoading,
      loading: state?.loading,
      users: state?.users,
      updateUser: state?.updateUser,
      setNotify: state?.setNotify,
    }),
    shallow
  );
  const functions = getFunctions()
  const updateUserByUid = httpsCallable(functions, 'updateUser')
  const data = users?.find(item => item?._id === isEditing?._id)
  useEffect(() => {
    if(isEditing?._id){
      setValues({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        organization: data?.organization,
        postalCode: data?.postalCode,
        role: data?.role,
        status: data?.status,
        state: data?.state,
        lga: data?.lga,
        address: data?.address,
      })
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: null,
      organization: "",
      role: "",
      status: "",
      state: "",
      lga: "",
      postalCode: "",
      address: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string(),
      email: yup.string(),
      password: yup.string(),
      organization: yup.string(),
      role: yup.string(),
      status: yup.string(),
      state: yup.string(),
      lga: yup.string(),
      address: yup.string(),
      postalCode: yup.string(),
    }),
    onSubmit: (values) => {
      const {firstName, lastName, email, password, organization, role, status, state, lga, postalCode, address} = values
      if(email){
        if(isEditing?._id){
          // update user
          const userData = {email, password}
          try {
            const payload = {
              uid: isEditing?.uid,
              userData,
            }
            setLoading(true)
            updateUserByUid(payload).then(data => {
              const payload = {
                uid: isEditing?.uid,
                firstName,
                lastName,
                email,
                organization,
                role,
                status,
                state,
                lga,
                postalCode,
                address
              }
              updateUser(db, isEditing?._id, payload).then(data => {
                isUserCreated()
                setNotify({ open: true, message: 'User updated successfully!', type: 'success' })
                handleClose()
                setLoading(false)
              }).catch(() => setLoading(false))
            })
          } catch (error) {
            console.log('-------udpating user error-----: ', error)
            setNotify({ open: true, message: error?.message, type: 'error' })
            setLoading(false)
          }
        }else{
          // create new user
            try {
              signUp(email, password).then(data => {
                // setLoading(false)
                console.log('-----------user created: ', data)  
                const payload = {
                  uid: data?.user?.uid,
                  firstName,
                  lastName,
                  email,
                  organization,
                  role,
                  status,
                  state,
                  lga,
                  postalCode,
                  address
                }
                createUser(payload).then(() => {
                  setLoading(false)
                  setNotify({ open: true, message: 'User created successfully!', type: 'success' })
                  isUserCreated()
                  handleClose()
                  // console.log('------------------user response: ', response)
                })
              })
            } catch (error) {
              setLoading(false)
              setNotify({ open: true, message: error?.message, type: 'error' })
            }
        }
      }
    },
  });

  const { values, errors, touched, setFieldValue, handleSubmit, handleBlur, setValues } =
    formik;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Add User</h2>
          <CancelOutlinedIcon
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Box>
            <h3>User Information</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="firstName" className="label">
                    First Name
                  </p>
                  <input
                    id="firstName"
                    placeholder="First Name"
                    className="styled-input"
                    value={values?.firstName}
                    onChange={e => setFieldValue('firstName', e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="lastName" className="label">
                    Last Name
                  </p>
                  <input
                    id="lastName"
                    placeholder="Last Name"
                    className="styled-input"
                    value={values?.lastName}
                    onChange={e => setFieldValue('lastName', e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="email" className="label">
                    Email address
                  </p>
                  <input
                    id="email"
                    placeholder="Email Address"
                    className="styled-input"
                    type='email'
                    required
                    value={values?.email}
                    onChange={e => setFieldValue('email', e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="password" className="label">
                    Password
                  </p>
                  <input
                    id="password"
                    placeholder="Password"
                    className="styled-input"
                    type='password'
                    required
                    value={values?.password}
                    onChange={e => setFieldValue('password', e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p className="label">
                    Organization
                  </p>
                  <Select
                    name="organization"
                    placeholder="Select"
                    isClearable
                    options={ORGANIZATIONS?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    styles={SelectStyling}
                    // components={{
                    //   IndicatorSeparator: () => null,
                    // }}
                    value={
                      values?.organization
                        ? ORGANIZATIONS?.find(
                            (item) => item?.value === values?.organization
                          )
                        : null
                    }
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("organization", e?.value);
                    }}
                  />
                  <ErrorMessage
                    touched={touched}
                    errors={errors}
                    name="organization"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h3>Permission</h3>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p className="label">
                    Role
                  </p>
                  <Select
                    name="role"
                    placeholder="Select"
                    isClearable
                    options={ROLES?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    styles={SelectStyling}
                    // components={{
                    //   IndicatorSeparator: () => null,
                    // }}
                    value={
                      values?.role
                        ? ROLES?.find((item) => item?.value === values?.role)
                        : null
                    }
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("role", e?.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: "100%" }}>
                  <p className="label">
                    Status
                  </p>
                  <Select
                    name="role"
                    placeholder="Select"
                    isClearable
                    options={STATUS?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    styles={SelectStyling}
                    // components={{
                    //   IndicatorSeparator: () => null,
                    // }}
                    value={
                      values?.status
                        ? STATUS?.find((item) => item?.value === values?.status)
                        : null
                    }
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("status", e?.value);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h3>Contact Information</h3>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="address" className="label">
                    Address
                  </p>
                  <input
                    id="address"
                    placeholder="Address"
                    className="styled-input"
                    value={values?.address}
                    onChange={e => setFieldValue('address', e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ width: "100%" }}>
                  <p className="label">
                    State
                  </p>
                  <Select
                    name="state"
                    placeholder="Select"
                    isClearable
                    options={STATES?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    styles={SelectStyling}
                    // components={{
                    //   IndicatorSeparator: () => null,
                    // }}
                    value={
                      values?.state
                        ? STATES?.find((item) => item?.value === values?.state)
                        : null
                    }
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("state", e?.value);
                      setFieldValue("lga", null);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ width: "100%" }}>
                  <p className="label">
                    LGA
                  </p>
                  <Select
                    name="lga"
                    placeholder="Select"
                    isClearable
                    options={LGAs[`${values?.state}`]}
                    styles={SelectStyling}
                    // components={{
                    //   IndicatorSeparator: () => null,
                    // }}
                    value={
                      values?.lga
                        ? LGAs[`${values?.state}`]?.find((item) => item?.value === values?.lga)
                        : null
                    }
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("lga", e?.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ width: "100%" }}>
                  <p htmlFor="postalCode" className="label">
                    Postal Code
                  </p>
                  <input
                    id="postalCode"
                    placeholder="Postal Code"
                    className="styled-input"
                    value = {values?.postalCode}
                    onChange={(e) => {
                      setFieldValue('postalCode', e?.target?.value)
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{margin: '40px 0px', display: 'flex', gap: 2, justifyContent:'flex-end'}}>
            <LoadingButton onClick={handleClose} variant='outlined' color='error' sx={{width: 150}}>Discard</LoadingButton>
            <LoadingButton type="submit" variant='outlined' sx={{width: 200}} loading={loading}>{isEditing?._id ? 'Update' : 'Create'}</LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateUser;
