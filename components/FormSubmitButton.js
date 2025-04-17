import * as React from "react";
import { useFormStatus } from "react-dom";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FormSubmitButton() {
    const { pending } = useFormStatus();
    return (
        <LoadingButton
            type="submit"
            size="large"
            variant="outlined"
            endIcon={<SendIcon />}
            loading={pending}
            sx={{mt: 2}}
        >
            {pending ? "Submitting..." : "Submit"}
        </LoadingButton>
    )
}