const new_users = {
    form: {
        label: {
            code: "Code",
            first_name: "First Name",
            middle_name: "Middle Name",
            last_name: "Last Name",
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password",
        },
        buttons: {
            save: "Save",
            edit: "Edit",
            delete: "Delete",
            update: "Update",
            cancel: "Cancel"
        },
        validation: {
            required: "(This field is required.)",
            info: "Info",
            delete_account: "You cannot delete your own account",
            delete_confirmation: "Are you sure you want to delete ",
            deleted: "User has been deleted.",
            saved: "New user account has been created.",
            updated: "User information has been updated.",
            success: "Success",
            error: "Error: ",
            ok: "Okay"
        }
    }
}

export default new_users
