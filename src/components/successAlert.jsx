import React from 'react'
import { Alert} from '@mui/material';
import { Check } from '@mui/icons-material'


export function SuccessAlert({success}) {
	return (
		<Alert icon={<Check fontSize="inherit" />} severity="success">
			{success}
		</Alert>
	)
}
