import React from "react";
import { Alert, Stack } from "reactstrap";


const Flashback = (props) => {
    const {error,severity} = props;
    return <Stack style={{width:"100%"}} spacing={2}>
    <Alert severity={severity}>
      {message}
    </Alert>
  </Stack>
}