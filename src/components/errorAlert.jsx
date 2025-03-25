import { Alert } from '@mui/material'
import React from 'react'

export function ErrorAlert({ errorResponse }) {
	return (
		<Alert severity="error">{errorResponse}</Alert>
	)
}
