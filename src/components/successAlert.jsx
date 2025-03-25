import { Check } from '@mui/icons-material'
import { Alert } from '@mui/material'
import React from 'react'


export function SuccessAlert({ success }) {
	return (
		<Alert icon={<Check fontSize="inherit" />} severity="success">
			{success}
		</Alert>
	)
}
