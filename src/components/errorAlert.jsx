import React from 'react'
import { Alert} from '@mui/material';

export function ErrorAlert({errorResponse}) {
	return (
		<Alert severity="error">{errorResponse}</Alert>
	)
}
